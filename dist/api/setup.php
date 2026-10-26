<?php
/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — INSTALADOR Y MIGRACIÓN AUTOMÁTICA RELACIONAL
 * ==============================================================================
 * Abre esta URL en tu navegador:
 * https://tudominio.com/api/setup.php?key=TU_SETUP_KEY
 * para crear todas las tablas relacionales normalizadas (SIN columnas data_json).
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

$isJson = (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) 
       || (isset($_GET['format']) && $_GET['format'] === 'json');

// 0. VERIFICACIÓN DE SEGURIDAD ESTRICTA CON SETUP_KEY
$providedKey = isset($_GET['key']) ? trim($_GET['key']) : '';
$requiredKey = defined('SETUP_KEY') ? SETUP_KEY : 'cga_install_2026_hostinger';

if (empty($providedKey) || $providedKey !== $requiredKey) {
    http_response_code(403);
    if ($isJson) {
        echo json_encode([
            'success' => false,
            'error' => 'Acceso denegado: Se requiere una clave de seguridad válida (?key=...). Consulta tu archivo .env.',
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo "<!DOCTYPE html><html lang='es'><head><meta charset='utf-8'><title>Instalador Protegido · CGA</title><style>body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;}.card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:36px;max-width:540px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);}h2{color:#f87171;margin-top:0;font-size:1.5rem;}p{color:#94a3b8;line-height:1.6;font-size:0.95rem;}code{background:#0f172a;border:1px solid #334155;padding:6px 12px;border-radius:8px;color:#38bdf8;font-family:monospace;display:inline-block;margin:8px 0;word-break:break-all;}.footer{margin-top:20px;font-size:0.8rem;color:#64748b;}</style></head><body><div class='card'><h2>🔒 Instalador Protegido por Seguridad</h2><p>Por motivos de seguridad institucional, para inicializar o verificar la base de datos debes proveer el parámetro <strong>?key=</strong> configurado en tu archivo <code>.env</code>.</p><p>Ejemplo de URL autorizada:</p><p><code>https://tudominio.com/api/setup.php?key={$requiredKey}</code></p><div class='footer'>Consejo Global Ambiental · Infraestructura Segura</div></div></body></html>";
    }
    exit;
}

$pdo = getDb();
$results = [];
$errors = [];

try {
    // 1. EJECUTAR SCHEMA RELACIONAL SQL (SIN JSONs)
    $schemaSql = file_get_contents(__DIR__ . '/schema.sql');
    if (!$schemaSql) {
        throw new Exception("No se pudo leer el archivo schema.sql");
    }

    $pdo->exec($schemaSql);
    $results[] = "Estructura relacional verificada y creada correctamente (11 tablas normalizadas sin data_json).";

    // 2. SEMBRAR DATOS INICIALES RELACIONALES

    // A) Site Settings
    $stmt = $pdo->query("SELECT COUNT(*) FROM `cga_site_settings`");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("
            INSERT INTO `cga_site_settings` (
                `id`, `banner_enabled`, `banner_style`, `banner_message`, `banner_show_cta`,
                `banner_cta_text`, `banner_cta_link`, `banner_theme`, `banner_bg_color`, `banner_text_color`,
                `banner_gradient_enabled`, `banner_gradient_direction`, `banner_gradient_from`, `banner_gradient_to`,
                `banner_marquee_speed`, `banner_image_height`
            ) VALUES (
                1, 1, 'static', 'Consejo Global Ambiental · Plataforma Institucional de Custodia Biocultural y Diplomacia Ambiental.', 1,
                'Conocer más', '/contacto', 'moss', '#4a5a22', '#f5efe3',
                0, 'to-r', '#4a5a22', '#2d3813',
                28, 72
            )
        ");

        $pdo->exec("
            INSERT INTO `cga_marquee_texts` (`text_content`, `sort_order`) VALUES
            ('Consejo Global Ambiental · Plataforma Institucional', 0),
            ('Monitoreo satelital activo en 47 corredores bioculturales', 1),
            ('Asamblea Global Ambiental · Ginebra', 2),
            ('Custodia biocultural y gobernanza territorial', 3)
        ");

        $pdo->exec("
            INSERT INTO `cga_marquee_images` (`image_url`, `link_url`, `sort_order`) VALUES
            ('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=80&fit=crop', '/conocimiento', 0),
            ('https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=500&q=80&fit=crop', '/proyectos', 1),
            ('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=500&q=80&fit=crop', '/lineas-estrategicas', 2),
            ('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80&fit=crop', '/nosotros', 3),
            ('https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80&fit=crop', '/agenda-2030', 4)
        ");

        $results[] = "Configuración institucional sembrada en tablas relacionales cga_site_settings y marquees.";
    }

    // B) Alianzas Institucionales
    $stmt = $pdo->query("SELECT COUNT(*) FROM `cga_alliances`");
    if ($stmt->fetchColumn() == 0) {
        $insAll = $pdo->prepare("
            INSERT INTO `cga_alliances` (
                `id`, `name`, `short_name`, `acronym`, `type`, `scope_es`, `scope_en`,
                `role_es`, `role_en`, `tag`, `logo`, `website`, `sort_order`
            ) VALUES (
                :id, :name, :short_name, :acronym, :type, :scope_es, :scope_en,
                :role_es, :role_en, :tag, :logo, :website, :sort
            )
        ");

        $alliances = [
            ['wess', 'World Environmental Sustainability Summit (WESS)', 'WESS Geneva', 'WESS', 'multilateral', 'Global · Ginebra', 'Global · Geneva', 'Socio de gobernanza global y premiación de iniciativas de biocultura.', 'Global governance partner and bioculture initiatives awarding body.', 'Ginebra 2026', '/imports/Logos/wess.png', 'https://mexicoporelclima.com/', 0],
            ['rirb', 'Decenio de las Naciones Unidas sobre la Restauración de los ecosistemas', 'Restauración de los ecosistemas', 'DNUSRE', 'multilateral', 'Global · ONU', 'Global · UN', 'Prevención, detención y reversión de la degradación de ecosistemas en todo el mundo.', 'Preventing, halting and reversing the degradation of ecosystems worldwide.', 'Restauración Global', '/imports/Logos/rirb.png', 'https://www.unesco.org/es/ecosystems-restoration-decade', 1],
            ['iies', 'Instituto de Investigaciones en Ecosistemas y Sustentabilidad', 'IIES UNAM', 'IIES', 'academic', 'América Latina', 'Latin America', 'Monitoreo satelital conjunto, modelación climática y validación científica.', 'Joint satellite monitoring, climate modeling and scientific validation.', 'Investigación Aplicada', '/imports/Logos/iies.png', 'https://www.cbd.int/', 2],
            ['cecgb', 'Centro de Estudios del Cambio Global y la Biosfera', 'CECG Biosfera', 'CECG', 'academic', 'Internacional', 'International', 'Publicaciones arbitradas y capacitación de cuadros directivos ambientales.', 'Peer-reviewed publications and environmental leadership training.', 'Docencia & Ciencia', '/imports/Logos/cecgb.jpg', 'https://earthcharter.org/', 3],
            ['uceps', 'Unión de Comunidades y Ejidos Protectores de la Selva', 'UCEPS Selva', 'UCEPS', 'territorial', 'Territorial · Corredor Biológico', 'Territorial · Biological Corridor', 'Custodia territorial de 450,000 hectáreas de bosque de niebla y selva alta.', 'Territorial custody of 450,000 hectares of cloud and tropical rainforest.', 'Custodia Territorial', '/imports/Logos/uceps.jpg', 'https://www.earthhour.org/', 4],
            ['fgpb', 'Alas Metropolitanas', 'Alas Metropolitanas', 'ALAS', 'territorial', 'Territorial · Biodiversidad Urbana', 'Territorial · Urban Biodiversity', 'Conservación de fauna aviar, protección de corredores biológicos y biodiversidad metropolitana.', 'Avian wildlife conservation, biological corridor protection and metropolitan biodiversity.', 'Biodiversidad Urbana', '/imports/Logos/alasmetropolitanas.jpg', 'https://mexicoporelclima.com/', 5]
        ];

        foreach ($alliances as $a) {
            $insAll->execute([
                ':id'         => $a[0], ':name' => $a[1], ':short_name' => $a[2], ':acronym' => $a[3],
                ':type'       => $a[4], ':scope_es' => $a[5], ':scope_en' => $a[6], ':role_es' => $a[7],
                ':role_en'    => $a[8], ':tag' => $a[9], ':logo' => $a[10], ':website' => $a[11], ':sort' => $a[12]
            ]);
        }
        $results[] = "6 Alianzas internacionales sembradas con columnas estructuradas.";
    }

    // C) Gobernanza y Miembros
    $stmt = $pdo->query("SELECT COUNT(*) FROM `cga_governance`");
    if ($stmt->fetchColumn() == 0) {
        $insGov = $pdo->prepare("
            INSERT INTO `cga_governance` (
                `id`, `name`, `role_es`, `role_en`, `display_role_es`, `display_role_en`,
                `category`, `tag_es`, `tag_en`, `country_es`, `country_en`, `img`,
                `bio_es`, `bio_en`, `email`, `linkedin`, `whatsapp`, `phone_mx`, `phone_ca`, `sort_order`
            ) VALUES (
                :id, :name, :role_es, :role_en, :display_role_es, :display_role_en,
                :category, :tag_es, :tag_en, :country_es, :country_en, :img,
                :bio_es, :bio_en, :email, :linkedin, :whatsapp, :phone_mx, :phone_ca, :sort
            )
        ");

        $insGov->execute([
            ':id' => 'luis-garcia', ':name' => 'Mtro. Luis García',
            ':role_es' => 'Presidente del Consejo Directivo', ':role_en' => 'President of the Board',
            ':display_role_es' => 'Presidente del Consejo Directivo', ':display_role_en' => 'President of the Board',
            ':category' => 'directorio', ':tag_es' => 'Presidencia', ':tag_en' => 'Presidency',
            ':country_es' => 'México / Canadá', ':country_en' => 'Mexico / Canada',
            ':img' => '/imports/Perfiles/LuisGarcia.png',
            ':bio_es' => 'Especialista en gobernanza socioambiental y derecho ecológico con más de 18 años de trayectoria en organismos multilaterales y proyectos de conservación de biomas.',
            ':bio_en' => 'Specialist in socio-environmental governance and ecological law with over 18 years of experience in multilateral organizations and biome conservation.',
            ':email' => 'presidencia@consejocga.org', ':linkedin' => 'https://www.linkedin.com',
            ':whatsapp' => '+52 55 3083 1032', ':phone_mx' => '+52 55 3083 1032', ':phone_ca' => '+1 437 290 8820',
            ':sort' => 0
        ]);

        $insGov->execute([
            ':id' => 'francisco-solorio', ':name' => 'Mtro. Francisco Solorio',
            ':role_es' => 'Secretario Ejecutivo y Fundador', ':role_en' => 'Executive Secretary & Founder',
            ':display_role_es' => 'Secretario Ejecutivo y Fundador', ':display_role_en' => 'Executive Secretary & Founder',
            ':category' => 'gobierno', ':tag_es' => 'Secretaría Ejecutiva', ':tag_en' => 'Executive Secretariat',
            ':country_es' => 'México', ':country_en' => 'Mexico',
            ':img' => '/imports/Perfiles/FranciscoSolorio.png',
            ':bio_es' => 'Investigador en gestión territorial, sustentabilidad y vinculación comunitaria. Impulsor del modelo de gobernanza territorial participativa.',
            ':bio_en' => 'Researcher in territorial management, sustainability and community engagement. Driver of the participatory territorial governance model.',
            ':email' => 'secretaria@consejocga.org', ':linkedin' => 'https://www.linkedin.com',
            ':whatsapp' => '+52 55 3083 1032', ':phone_mx' => '+52 55 3083 1032', ':phone_ca' => '',
            ':sort' => 1
        ]);

        $pdo->exec("
            INSERT INTO `cga_governance_responsibilities` (`governance_id`, `responsibility_es`, `responsibility_en`, `sort_order`) VALUES
            ('luis-garcia', 'Representación institucional global del Consejo', 'Global institutional representation of the Council', 0),
            ('luis-garcia', 'Conducción estratégica de tratados y alianzas', 'Strategic leadership of treaties and alliances', 1),
            ('luis-garcia', 'Presidencia de la Asamblea General Anual', 'Presidency of the Annual General Assembly', 2),
            ('francisco-solorio', 'Articulación ejecutiva de programas y proyectos WESS', 'Executive coordination of WESS programs and projects', 0),
            ('francisco-solorio', 'Coordinación del cuerpo colegiado de especialistas', 'Coordination of the collegial body of specialists', 1)
        ");

        $results[] = "Miembros fundadores y responsabilidades institucionales sembrados en cga_governance.";
    }

    // D) Pop-ups
    $stmt = $pdo->query("SELECT COUNT(*) FROM `cga_popups`");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("
            INSERT INTO `cga_popups` (
                `id`, `name`, `enabled`, `design_type`, `target_route`, `trigger_type`,
                `trigger_delay_seconds`, `trigger_scroll_percent`, `has_cta_button`,
                `title`, `subtitle`, `message`, `image`, `png_element`, `highlight_badge`,
                `cta_text`, `cta_link`, `secondary_cta_text`, `secondary_cta_link`,
                `corner_position`, `once_per_session`
            ) VALUES (
                'popup-home-welcome', 'Pop-up de Bienvenida Institucional (Exclusivo Home)', 1, 'split-modal', '/', 'time',
                2, 25, 1,
                'Bienvenido al Consejo Global Ambiental', 'Preservación Biocultural, Gobernanza & Ciencia Aplicada',
                'Conoce nuestras iniciativas internacionales de custodia biocultural, diplomacia ambiental y formación de liderazgos territoriales.',
                'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop&auto=format',
                '/imagenes/Rama 2.svg', 'Mensaje Institucional',
                'Conocer Iniciativas', '/proyectos', 'Sobre el Consejo', '/nosotros',
                'bottom-right', 0
            )
        ");
        $results[] = "Pop-up de bienvenida sembrado en tabla relacional cga_popups.";
    }

    // E) Sección Organizaciones
    $stmt = $pdo->query("SELECT COUNT(*) FROM `cga_training_org_section`");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("
            INSERT INTO `cga_training_org_section` (
                `id`, `subtitle_es`, `subtitle_en`, `title_es`, `title_en`,
                `description_es`, `description_en`, `cta_text_es`, `cta_text_en`
            ) VALUES (
                1, 'Soluciones Institucionales a Medida', 'Tailored Institutional Solutions',
                'Programas para Organizaciones, Gobiernos y Empresas', 'Custom Programs for Organizations, Governments & Corporations',
                'Diseñamos diagnósticos integrales de madurez ecológica y capacitamos a gabinetes ministeriales, equipos corporativos y operadores territoriales bajo solicitud formal.',
                'We design comprehensive ecological maturity assessments and train institutional teams under formal request.',
                'Solicitar Propuesta Institucional', 'Request Institutional Proposal'
            )
        ");
        $results[] = "Sección de soluciones corporativas sembrada en cga_training_org_section.";
    }

    // F) Administrador Inicial
    $stmt = $pdo->query("SELECT COUNT(*) FROM `cga_admins`");
    if ($stmt->fetchColumn() == 0) {
        $adminPass = password_hash('admin2026!', PASSWORD_BCRYPT);
        $insert = $pdo->prepare("INSERT INTO `cga_admins` (`username`, `password_hash`, `email`, `role`) VALUES ('admin', :pass, 'admin@consejocga.org', 'superadmin')");
        $insert->execute([':pass' => $adminPass]);
        $results[] = "Usuario administrador 'admin' creado con hash bcrypt.";
    }

} catch (Exception $e) {
    $errors[] = $e->getMessage();
}

// 3. RESPUESTA VISUAL O JSON
if ($isJson) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => empty($errors),
        'results' => $results,
        'errors'  => $errors,
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instalador Relacional de Base de Datos · CGA</title>
  <style>
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --primary: #22c55e;
      --error: #ef4444;
      --accent: #38bdf8;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      max-width: 680px;
      width: 100%;
      padding: 36px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    h1 {
      font-size: 1.5rem;
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--accent);
    }
    .badge {
      background: rgba(34, 197, 94, 0.15);
      color: var(--primary);
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.8rem;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }
    p {
      color: var(--text-muted);
      line-height: 1.6;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 24px 0;
    }
    li {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.95rem;
    }
    li.success {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.2);
      color: #86efac;
    }
    li.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #fca5a5;
    }
    .info-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      margin-top: 24px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .info-card strong {
      color: var(--text);
    }
    .btn {
      display: inline-block;
      background: var(--primary);
      color: #0f172a;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      margin-top: 24px;
      transition: opacity 0.2s;
    }
    .btn:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>
      <span>🌱</span> Consejo Global Ambiental
      <span class="badge">MySQL Relacional Puro</span>
    </h1>
    <p>
      El esquema relacional ha sido verificado. Cada campo se almacena en columnas tipadas nativas (VARCHAR, TEXT, INT, TINYINT), sin campos <code>data_json</code>.
    </p>

    <ul>
      <?php foreach ($results as $res): ?>
        <li class="success">
          <span>✓</span> <?= htmlspecialchars($res) ?>
        </li>
      <?php endforeach; ?>

      <?php foreach ($errors as $err): ?>
        <li class="error">
          <span>✗</span> Error: <?= htmlspecialchars($err) ?>
        </li>
      <?php endforeach; ?>
    </ul>

    <div class="info-card">
      <div><strong>Base de Datos:</strong> <?= htmlspecialchars(DB_NAME) ?></div>
      <div><strong>Host:</strong> <?= htmlspecialchars(DB_HOST) ?>:<?= htmlspecialchars(DB_PORT) ?></div>
      <div><strong>Tablas:</strong> 11 tablas normalizadas con claves primarias y foráneas</div>
      <div><strong>Seguridad:</strong> Passwords con hash Bcrypt, variables de entorno (.env) activas</div>
    </div>

    <a href="/" class="btn">Ir al Sitio Web →</a>
  </div>
</body>
</html>
