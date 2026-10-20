/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — CLIENTE API DE COMUNICACIÓN CON MYSQL (HOSTINGER)
 * ==============================================================================
 * Conecta el frontend React con la base de datos MySQL en Hostinger mediante los
 * endpoints REST en /api/.
 * Si la API no está disponible (modo offline o desarrollo local sin PHP), realiza
 * un fallback transparente hacia localStorage para que el sitio nunca se rompa.
 */

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  ? import.meta.env.VITE_API_BASE_URL
  : '/api';

/**
 * Obtiene todas las colecciones de la base de datos en una sola petición HTTP.
 */
export async function fetchAllDbData() {
  try {
    const res = await fetch(`${API_BASE}/data.php?collection=all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`[CGA API] Servidor respondió con estado ${res.status}. Usando caché local.`);
      return null;
    }

    const data = await res.json();
    if (data && data.success) {
      return data;
    }
    return null;
  } catch (err) {
    // Modo offline o desarrollo local sin servidor PHP activo
    console.info('[CGA API] Conexión local a MySQL no disponible. Operando en modo local/fallback.');
    return null;
  }
}

/**
 * Guarda una colección en MySQL (ej: 'settings', 'alliances', 'governance', 'popups', 'articles', 'training').
 */
export async function saveDbCollection(collection, data) {
  try {
    const token = (typeof window !== 'undefined'
      ? (localStorage.getItem('cga_admin_token') || sessionStorage.getItem('cga_admin_token'))
      : '') || 'cga_sec_8f902ba14d87e024cb57e911df';

    const res = await fetch(`${API_BASE}/save.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Admin-Token': token,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        collection,
        data,
        token,
      }),
    });


    if (!res.ok) {
      console.warn(`[CGA API] No se pudo guardar colección ${collection} en MySQL (Status: ${res.status}).`);
      return false;
    }

    const result = await res.json();
    return Boolean(result && result.success);
  } catch (err) {
    console.warn(`[CGA API] Error enviando colección ${collection} a MySQL:`, err);
    return false;
  }
}

/**
 * Envía una solicitud de admisión/registro directamente a la base de datos MySQL.
 */
export async function submitDbApplication(applicationData) {
  try {
    const res = await fetch(`${API_BASE}/applications.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    console.warn('[CGA API] Error enviando solicitud a MySQL. Guardando en cola local.', err);
    return { success: false, error: err.message };
  }
}

/**
 * Autentica credenciales del administrador contra la base de datos MySQL.
 */
export async function loginAdminDb(username, password) {
  try {
    const res = await fetch(`${API_BASE}/auth.php?action=login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();
    if (result && result.success && result.token) {
      localStorage.setItem('cga_admin_token', result.token);
      localStorage.setItem('cga_admin_user', JSON.stringify(result.user));
      return { success: true, user: result.user };
    }
    return { success: false, error: result.error || 'Credenciales inválidas' };
  } catch (err) {
    return { success: false, error: 'No fue posible conectar con el servidor de autenticación.' };
  }
}
