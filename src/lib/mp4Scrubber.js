import * as MP4Box from 'mp4box';

/**
 * Mp4Scrubber — scrubbing frame-accurate sobre WebCodecs VideoDecoder.
 * PlayheadSmoother — resorte críticamente amortiguado para el playhead.
 */
export class Mp4Scrubber {
  constructor(src, opts = {}) {
    if (typeof src !== 'string') {
      throw new Error(
        `Mp4Scrubber: el constructor espera la URL del video (string). ` +
        `Recibí ${src === null ? 'null' : typeof src}.`
      );
    }

    this.src = src;

    this.state = 'idle';
    this.error = null;

    this.fps = opts.fps ?? 60;
    this.gopSize = opts.gopSize ?? 10;
    this.debug = opts.debug ?? false;

    this.samples = [];
    this.syncIndices = [];
    this.description = null;
    this.codec = null;
    this.timescale = 90000;
    this.width = 0;
    this.height = 0;

    this.decoder = null;

    this._gopStart = -1;
    this._head = 0;
    this._targetIndex = -1;
    this._decoding = false;
    this._gen = 0;
    this.lookahead = opts.lookahead ?? 24;

    this._timestampToIndex = new Map();

    this._outW = 0;
    this._outH = 0;

    this.cache = new Map();
    this._cacheLimitUser = opts.cacheLimit ?? 0;
    this.cacheLimit = opts.cacheLimit ?? 32;

    this._latestBitmap = null;
    this._latestIndex = -1;

    this._drawParams = null;

    this.onError = opts.onError ?? ((e) => console.error('[Mp4Scrubber]', e));
    this.onReady = opts.onReady ?? (() => {});
  }

  // ---------------------------------------------------------------
  // SOPORTE
  // ---------------------------------------------------------------

  static isSupported() {
    return (
      typeof window !== 'undefined' &&
      typeof window.VideoDecoder === 'function' &&
      typeof window.EncodedVideoChunk === 'function' &&
      typeof window.createImageBitmap === 'function'
    );
  }

  static async isCodecSupported(codec, width, height) {
    if (!Mp4Scrubber.isSupported()) return false;
    try {
      const support = await VideoDecoder.isConfigSupported({
        codec,
        codedWidth: width,
        codedHeight: height,
        hardwareAcceleration: 'prefer-hardware',
      });
      return !!support.supported;
    } catch (_) {
      return false;
    }
  }

  _log(...args) {
    if (this.debug) console.log('[Mp4Scrubber]', ...args);
  }

  // ---------------------------------------------------------------
  // CARGA
  // ---------------------------------------------------------------

  async load() {
    if (this.state === 'ready') return true;
    this.state = 'loading';

    try {
      if (!Mp4Scrubber.isSupported()) {
        throw new Error('WebCodecs no soportado en este navegador');
      }

      this._log('load() → fetch', this.src);
      const t0 = performance.now();
      const res = await fetch(this.src);
      this._log('load() → respuesta', {
        status: res.status,
        ok: res.ok,
        contentType: res.headers.get('content-type'),
        contentLength: res.headers.get('content-length'),
      });

      if (!res.ok) throw new Error(`fetch ${this.src}: ${res.status}`);

      const buf = await res.arrayBuffer();
      buf.fileStart = 0;

      this._log('load() → buffer', {
        bytes: buf.byteLength,
        fileStart: buf.fileStart,
        ms: Math.round(performance.now() - t0),
      });

      if (buf.byteLength < 1000) {
        this._log('⚠ buffer sospechosamente chico');
      }

      await this._parseMp4(buf);
      this._log('load() → parseMp4 OK', {
        samples: this.samples.length,
        keyframes: this.syncIndices.length,
      });

      this._extractDescription();
      this._log('load() → description', {
        bytes: this.description?.byteLength,
        codec: this.codec,
      });

      this._detectGopSize();
      if (!this._cacheLimitUser) {
        this.cacheLimit = Math.min(48, Math.max(32, this.gopSize * 4));
      }
      this._configureDecoder();
      this._log('load() → decoder configurado');

      this._head = 0;
      this._gopStart = -1;

      this.state = 'ready';
      this._log('load() → READY ✓', {
        frames: this.samples.length,
        gopSize: this.gopSize,
        dims: [this.width, this.height],
      });

      this.onReady({
        sampleCount: this.samples.length,
        gopSize: this.gopSize,
      });
      return true;
    } catch (e) {
      this.state = 'error';
      this.error = e;
      this._log('load() → ERROR', e);
      this.onError(e);
      return false;
    }
  }

  async _parseMp4(buf) {
    const file = MP4Box.createFile();
    this._file = file;

    let resolveReady, rejectReady;
    const readyPromise = new Promise((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = reject;
    });

    let totalSamples = 0;
    let receivedSamples = 0;
    let resolveSamples;
    const samplesPromise = new Promise((resolve) => {
      resolveSamples = resolve;
    });

    file.onError = (e) => {
      const msg = 'MP4Box onError: ' + (e?.message || String(e));
      this._log('❌', msg);
      rejectReady(new Error(msg));
    };

    file.onMoovStart = () => {
      this._log('MP4Box onMoovStart');
    };

    file.onReady = (info) => {
      this._log('✅ MP4Box onReady', {
        videoTracks: info.videoTracks?.length || 0,
        tracks: info.tracks?.length || 0,
        duration: info.duration,
        timescale: info.timescale,
      });

      const track = info.videoTracks && info.videoTracks[0];
      if (!track) {
        rejectReady(new Error('El archivo no tiene pista de video'));
        return;
      }

      this._trackId = track.id;
      this.timescale = track.timescale || 90000;
      this.codec = track.codec;
      this.width = track.video?.width ?? track.track_width ?? 0;
      this.height = track.video?.height ?? track.track_height ?? 0;
      totalSamples = track.nb_samples || 0;

      this._log('🎬 track', {
        id: track.id,
        codec: track.codec,
        timescale: track.timescale,
        nb_samples: totalSamples,
        width: this.width,
        height: this.height,
      });

      file.setExtractionOptions(track.id, null, { nbSamples: Infinity });
      file.start();

      resolveReady(info);
    };

    file.onSamples = (_id, _user, list) => {
      for (let i = 0; i < list.length; i++) {
        const s = list[i];
        this.samples.push({
          cts: s.cts,
          isKey: s.is_sync,
          data: new Uint8Array(s.data),
        });
      }
      receivedSamples += list.length;

      if (receivedSamples % 100 === 0 || receivedSamples >= totalSamples) {
        this._log(`📦 samples: ${receivedSamples} / ${totalSamples}`);
      }

      if (list.length > 0) {
        const last = list[list.length - 1];
        try { file.releaseUsedSamples(this._trackId, last.number); } catch (_) {}
      }

      if (totalSamples > 0 && receivedSamples >= totalSamples) {
        resolveSamples();
      }
    };

    this._log('appendBuffer start, bytes:', buf.byteLength, 'fileStart:', buf.fileStart);
    try {
      file.appendBuffer(buf);
      this._log('appendBuffer end');
    } catch (e) {
      this._log('appendBuffer threw:', e);
      rejectReady(e);
      throw e;
    }

    this._log('flush start');
    try {
      file.flush();
      this._log('flush end');
    } catch (e) {
      this._log('flush threw:', e);
      rejectReady(e);
      throw e;
    }

    this._log('awaiting onReady...');
    await readyPromise;
    this._log('onReady resolved, awaiting samples...');

    await Promise.race([
      samplesPromise,
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error(
          `Timeout esperando samples: recibidos ${receivedSamples} de ${totalSamples}`
        )), 15000)
      ),
    ]);

    this._log('samples completos:', this.samples.length);

    this.samples.sort((a, b) => a.cts - b.cts);

    this.syncIndices = [];
    for (let i = 0; i < this.samples.length; i++) {
      if (this.samples[i].isKey) this.syncIndices.push(i);
    }
    this._log('samples listos:', this.samples.length, 'keyframes:', this.syncIndices.length);
  }

  _extractDescription() {
    const file = this._file;
    const trak = file.getTrackById(this._trackId);
    const entries = trak.mdia.minf.stbl.stsd.entries;
    for (const entry of entries) {
      const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
      if (!box) continue;
      const ds = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
      box.write(ds);
      this.description = new Uint8Array(ds.buffer, 8);
      break;
    }
    if (!this.description) {
      throw new Error('No se pudo extraer la description (avcC/hvcC)');
    }
  }

  _detectGopSize() {
    if (this.syncIndices.length < 2) return;
    const diffs = {};
    for (let i = 1; i < this.syncIndices.length; i++) {
      const d = this.syncIndices[i] - this.syncIndices[i - 1];
      diffs[d] = (diffs[d] || 0) + 1;
    }
    let best = 0, bestCount = 0;
    for (const d in diffs) {
      if (diffs[d] > bestCount) { bestCount = diffs[d]; best = +d; }
    }
    if (best > 0) this.gopSize = best;
  }

  // ---------------------------------------------------------------
  // DECODER
  // ---------------------------------------------------------------

  _configureDecoder() {
    if (this.decoder && this.decoder.state === 'configured') {
      return;
    }

    if (this.decoder && this.decoder.state !== 'closed') {
      try { this.decoder.close(); } catch (_) {}
    }

    this.decoder = new VideoDecoder({
      output: (frame) => this._onDecoded(frame),
      error: (e) => {
        this.state = 'error';
        this.error = e;
        this.onError(e);
      },
    });

    const cfg = {
      codec: this.codec,
      description: this.description,
      optimizeForLatency: true,
      latencyMode: 'realtime',
    };

    try {
      this.decoder.configure({ ...cfg, hardwareAcceleration: 'prefer-hardware' });
      this._log('decoder configurado con hardwareAcceleration: prefer-hardware');
    } catch (e) {
      this._log('fallo prefer-hardware, cayendo a no-preference:', e?.message);
      try {
        this.decoder.configure({ ...cfg, hardwareAcceleration: 'no-preference' });
      } catch (e2) {
        this._log('latencyMode no soportado, reintentando sin él:', e2?.message);
        const cfg2 = {
          codec: this.codec,
          description: this.description,
          optimizeForLatency: true,
        };
        try {
          this.decoder.configure({ ...cfg2, hardwareAcceleration: 'prefer-hardware' });
        } catch (_) {
          this.decoder.configure({ ...cfg2, hardwareAcceleration: 'no-preference' });
        }
      }
    }

    this._gopStart = -1;
  }

  async _onDecoded(frame) {
    const idx = this._timestampToIndex.get(frame.timestamp);

    if (idx === undefined) {
      frame.close();
      return;
    }

    if (this.debug && idx % 30 === 0) {
      this._log('OUTPUT', idx, 'target', this._targetIndex);
    }

    let bitmap;
    try {
      bitmap = await createImageBitmap(frame, this._resizeOpts());
    } catch (e) {
      frame.close();
      this.onError(e);
      return;
    }
    frame.close();

    this._putCache(idx, bitmap);
    if (idx > this._latestIndex) {
      this._latestIndex = idx;
      this._latestBitmap = bitmap;
    }
  }

  _resizeOpts() {
    if (!(this._outW > 0 && this._outH > 0 && this.width > 0 && this.height > 0)) {
      return undefined;
    }
    const scale = Math.max(this._outW / this.width, this._outH / this.height);
    return {
      resizeWidth: Math.max(1, Math.round(this.width * scale)),
      resizeHeight: Math.max(1, Math.round(this.height * scale)),
      resizeQuality: 'medium',
    };
  }

  _putCache(idx, bitmap) {
    const prev = this.cache.get(idx);
    if (prev && prev !== bitmap) prev.close();

    this.cache.set(idx, bitmap);

    // Evictar por distancia al target, NO por antigüedad. Borrar la clave
    // más baja tras un rebobinado dejaba dos grupos separados en el caché
    // (el nuevo y el viejo), y draw/_closestCached saltaba de grupo en grupo
    // → parpadeo sin control.
    const target = this._targetIndex >= 0 ? this._targetIndex : idx;
    while (this.cache.size > this.cacheLimit) {
      let farthestKey = -1;
      let farthestDist = -1;
      for (const k of this.cache.keys()) {
        if (k === idx) continue;
        // Preservar la ventana de interpolación (target ± 2)
        if (Math.abs(k - target) <= 2) continue;
        const d = Math.abs(k - target);
        if (d > farthestDist) { farthestDist = d; farthestKey = k; }
      }
      if (farthestKey < 0) break;
      const removed = this.cache.get(farthestKey);
      this.cache.delete(farthestKey);
      removed?.close();
    }
  }

  // ---------------------------------------------------------------
  // SEEK / DRAW
  // ---------------------------------------------------------------

  seek(index) {
    if (this.state !== 'ready' || this.samples.length === 0) return -1;

    const clamped = Math.max(0, Math.min(this.samples.length - 1, index | 0));
    this._targetIndex = clamped;
    this._kickDecode(clamped);

    return clamped;
  }

  hasFrame(i) {
    return this.cache.has(i);
  }

  _closestCached(index, maxRadius = 3) {
    if (this.cache.has(index)) return index;
    let best = -1;
    let bestDist = Infinity;
    for (const k of this.cache.keys()) {
      const d = Math.abs(k - index);
      if (d < bestDist) { bestDist = d; best = k; }
    }
    if (best < 0 || bestDist > maxRadius) return -1;
    return best;
  }

  /**
   * Dibuja el frame index o, si aún no está disponible, el más cercano del
   * caché (máx. `maxRadius`). Devuelve el índice realmente dibujado, o -1
   * sin tocar el lienzo (mantiene el frame anterior, sin parpadeo).
   */
  draw(ctx, index, w, h) {
    let target = index;
    if (!this.cache.has(target)) target = this._closestCached(target);
    const bmp = this.cache.get(target);
    if (!bmp) return -1;

    // Cachear el cálculo de cover-fit
    const p = this._drawParams;
    if (
      !p ||
      p.bw !== bmp.width ||
      p.bh !== bmp.height ||
      p.w !== w ||
      p.h !== h
    ) {
      const bw = bmp.width;
      const bh = bmp.height;
      const scale = Math.max(w / bw, h / bh);
      const dw = bw * scale;
      const dh = bh * scale;
      this._drawParams = {
        bw, bh, w, h,
        dx: (w - dw) / 2,
        dy: (h - dh) / 2,
        dw, dh,
      };
    }

    const dp = this._drawParams;
    try {
      ctx.drawImage(bmp, dp.dx, dp.dy, dp.dw, dp.dh);
      return target;
    } catch (e) {
      this.onError(e);
      return -1;
    }
  }

  /**
   * Interpolación sub-frame: si en el caché están tanto el frame base como
   * el siguiente, hace una mezcla suave entre ambos según la fracción del
   * playhead, consiguiendo un movimiento percibido mucho más fluido.
   *
   * @param {boolean} [blend=true] Si es false, NO mezcla dos frames: dibuja
   *   el frame entero más cercano (snap). En reposo, la doble exposición con
   *   globalAlpha es la causa del parpadeo (ghosting entre fotogramas).
   * @param {boolean} [exact=false] Si es true, no cae al frame más cercano
   *   del caché (máx. radio 3) cuando el frame exacto falta: devuelve -1 y
   *   conserva lo dibujado, evitando saltos visuales a un frame lejano.
   */
  drawInterpolated(ctx, position, w, h, blend = true, exact = false) {
    const count = this.samples.length;
    if (!count) return -1;

    const f = Math.max(0, Math.min(count - 1, position));

    // Modo reposo: jugar el frame entero (snap), nunca cross-fade.
    if (!blend) {
      const snap = Math.round(f);
      if (exact && !this.cache.has(snap)) return -1;
      return this.draw(ctx, snap, w, h);
    }

    const i0 = Math.floor(f);
    const frac = f - i0;

    const bmp0 = this.cache.get(i0);
    if (!bmp0) return this.draw(ctx, Math.round(f), w, h);

    const i1 = Math.min(count - 1, i0 + 1);
    const bmp1 = this.cache.get(i1);
    if (!bmp1 || frac < 0.02) return this.draw(ctx, i0, w, h);

    const p = this._drawParams;
    const need =
      !p ||
      p.bw !== bmp0.width ||
      p.bh !== bmp0.height ||
      p.w !== w ||
      p.h !== h;
    if (need) {
      const bw = bmp0.width;
      const bh = bmp0.height;
      const scale = Math.max(w / bw, h / bh);
      const dw = bw * scale;
      const dh = bh * scale;
      this._drawParams = {
        bw, bh, w, h,
        dx: (w - dw) / 2,
        dy: (h - dh) / 2,
        dw, dh,
      };
    }
    const dp = this._drawParams;
    try {
      ctx.globalAlpha = 1 - frac;
      ctx.drawImage(bmp0, dp.dx, dp.dy, dp.dw, dp.dh);
      ctx.globalAlpha = frac;
      ctx.drawImage(bmp1, dp.dx, dp.dy, dp.dw, dp.dh);
      ctx.globalAlpha = 1;
      return i1;
    } catch (e) {
      ctx.globalAlpha = 1;
      this.onError(e);
      return -1;
    }
  }

  // ---------------------------------------------------------------
  // DECODE LOOP: streaming secuencial con lookahead
  // ---------------------------------------------------------------

  setOutputSize(w, h) {
    this._outW = Math.max(0, Math.round(w || 0));
    this._outH = Math.max(0, Math.round(h || 0));
  }

  _kickDecode(target) {
    if (this._decoding) return;
    this._decoding = true;
    const gen = ++this._gen;

    this._decodeLoop(gen, target)
      .catch((e) => this.onError(e))
      .finally(() => {
        if (gen !== this._gen) return;
        this._decoding = false;
      });
  }

  async _decodeLoop(gen, initialTarget) {
    const total = this.samples.length;
    let guard = 0;

    while (gen === this._gen && guard++ < 2048) {
      const target = Math.max(0, Math.min(total - 1, this._targetIndex));

      // Solo re-anclar si el target salió MUCHO de la ventana decodificada
      // (margen = 2× lookahead). Con el margen anterior (`target + lookahead`)
      // el cursor quedaba en goal+1 tras un pase completo y se cumplía SIEMPRE,
      // causando un rebobino/re-decodificado constante y parpadeo.
      if (
        this._head > target + this.lookahead * 2 ||
        this._head + this.lookahead * 2 < target
      ) {
        const kf = this._keyframeAtOrBefore(target);
        if (this._gopStart !== kf) this._switchGop(kf);
        this._head = kf;
      }

      if (this._head < 0) this._head = 0;

      // Frente objetivo: siempre estar "lookahead" frames por delante del playhead.
      const goal = Math.min(total - 1, target + this.lookahead);

      // Decodificar secuencialmente desde el cursor hasta el frente.
      while (gen === this._gen && this._head <= goal) {
        if (this.cache.has(this._head)) {
          this._head++;
          continue;
        }
        const kf = this._keyframeAtOrBefore(this._head);
        if (this._gopStart !== kf) {
          this._switchGop(kf);
          if (!(await this._waitConfigured(100))) break;
        }
        if (!this._decodeSample(this._head)) break;
        this._head++;
        if ((this._head & 3) === 0) {
          await new Promise((r) => setTimeout(r, 4));
        }
      }
      if (gen !== this._gen) return;

      // Esperar a que el frame objetivo llegue si aún no está.
      if (!this.cache.has(target)) {
        const t0 = performance.now();
        while (gen === this._gen && performance.now() - t0 < 80) {
          await new Promise((r) => setTimeout(r, 1));
          if (this.cache.has(target)) break;
          if (this._targetIndex !== target) break;
        }
        if (gen !== this._gen) return;
        if (this._targetIndex !== target) continue;
      }

      // Frente ya cubierto y objetivo en caché: listo.
      if (this._head > goal && this.cache.has(target)) return;
    }
  }

  _switchGop(gopStart) {
    if (!this.decoder || this.decoder.state !== 'configured') {
      if (this.decoder && this.decoder.state !== 'closed') {
        try { this.decoder.close(); } catch (_) {}
      }
      this._configureDecoder();
    }
    this._gopStart = gopStart;
  }

  async _waitConfigured(timeoutMs = 120) {
    const t0 = performance.now();
    while (
      this.decoder &&
      this.decoder.state !== 'configured' &&
      performance.now() - t0 < timeoutMs
    ) {
      await new Promise((r) => setTimeout(r, 1));
    }
    return !!this.decoder && this.decoder.state === 'configured';
  }

  _decodeSample(i) {
    const s = this.samples[i];
    if (!s || !this.decoder || this.decoder.state !== 'configured') return false;
    try {
      const timestamp = Math.round((s.cts * 1e6) / this.timescale);
      this._timestampToIndex.set(timestamp, i);

      this.decoder.decode(
        new EncodedVideoChunk({
          type: s.isKey ? 'key' : 'delta',
          timestamp,
          data: s.data,
        })
      );
      return true;
    } catch (e) {
      this.onError(e);
      return false;
    }
  }

  _keyframeAtOrBefore(i) {
    const max = Math.min(i, this.samples.length - 1);
    for (let k = max; k >= 0; k--) {
      if (this.samples[k] && this.samples[k].isKey) return k;
    }
    return 0;
  }

  // ---------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------

  get frameCount() { return this.samples.length; }

  dispose() {
    this._gen++;
    this._decoding = false;

    for (const bmp of this.cache.values()) {
      try { bmp.close(); } catch (_) {}
    }
    this.cache.clear();
    this._drawParams = null;
    this._head = 0;
    this._gopStart = -1;
    this._latestIndex = -1;

    if (this._latestBitmap) {
      try { this._latestBitmap.close(); } catch (_) {}
      this._latestBitmap = null;
    }

    if (this.decoder && this.decoder.state !== 'closed') {
      try { this.decoder.close(); } catch (_) {}
    }
    this.decoder = null;
    this._file = null;
    this.samples = [];
    this.syncIndices = [];
    this.description = null;
    this._timestampToIndex.clear();
    this.state = 'idle';
  }

  close() { this.dispose(); }
}

// =================================================================
// PlayheadSmoother
// =================================================================
export class PlayheadSmoother {
  constructor(hz = 4) {
    this.omega = 2 * Math.PI * hz;
    this.value = 0;
    this.velocity = 0;
  }

  reset(value = 0) {
    this.value = value;
    this.velocity = 0;
  }

  step(target, dt) {
    if (typeof dt !== 'number' || !isFinite(dt)) dt = 0;
    if (dt > 0.1) dt = 0.1;
    if (dt <= 0) return this.value;

    const w = this.omega;
    const x = this.value - target;
    const v = this.velocity;

    const acc = -(2 * w * v) - (w * w) * x;

    this.velocity = v + acc * dt;
    this.value = this.value + this.velocity * dt;

    if (Math.abs(this.value - target) < 1e-4 && Math.abs(this.velocity) < 1e-4) {
      this.value = target;
      this.velocity = 0;
    }

    return this.value;
  }
}