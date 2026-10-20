-- ==============================================================================
-- CONSEJO GLOBAL AMBIENTAL (CGA) — BASE DE DATOS RELACIONAL MYSQL PURA
-- ==============================================================================
-- Base de Datos: u711292148_cgadb
-- Usuario:       u711292148_cgaus
-- Estructura:    100% Relacional (Columnas tipadas, sin campos data_json)
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. TABLA: cga_site_settings (Configuración General del Sitio)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_marquee_images`;
DROP TABLE IF EXISTS `cga_marquee_texts`;
DROP TABLE IF EXISTS `cga_site_settings`;
DROP TABLE IF EXISTS `cga_settings`;

CREATE TABLE `cga_site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `banner_enabled` TINYINT(1) DEFAULT 1,
  `banner_style` VARCHAR(50) DEFAULT 'static',
  `banner_message` VARCHAR(500) DEFAULT 'Consejo Global Ambiental · Plataforma Institucional de Custodia Biocultural y Diplomacia Ambiental.',
  `banner_show_cta` TINYINT(1) DEFAULT 1,
  `banner_cta_text` VARCHAR(100) DEFAULT 'Conocer más',
  `banner_cta_link` VARCHAR(255) DEFAULT '/contacto',
  `banner_theme` VARCHAR(50) DEFAULT 'moss',
  `banner_bg_color` VARCHAR(20) DEFAULT '#4a5a22',
  `banner_text_color` VARCHAR(20) DEFAULT '#f5efe3',
  `banner_gradient_enabled` TINYINT(1) DEFAULT 0,
  `banner_gradient_direction` VARCHAR(20) DEFAULT 'to-r',
  `banner_gradient_from` VARCHAR(20) DEFAULT '#4a5a22',
  `banner_gradient_to` VARCHAR(20) DEFAULT '#2d3813',
  `banner_marquee_speed` INT DEFAULT 28,
  `banner_image_height` INT DEFAULT 72,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
);

-- Textos dinámicos del marquee
CREATE TABLE `cga_marquee_texts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `text_content` VARCHAR(255) NOT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cga_marquee_texts` (`text_content`, `sort_order`) VALUES
('Consejo Global Ambiental · Plataforma Institucional', 0),
('Monitoreo satelital activo en 47 corredores bioculturales', 1),
('Asamblea Global Ambiental · Ginebra', 2),
('Custodia biocultural y gobernanza territorial', 3);

-- Imágenes del marquee
CREATE TABLE `cga_marquee_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `image_url` VARCHAR(500) NOT NULL,
  `link_url` VARCHAR(255) DEFAULT '',
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cga_marquee_images` (`image_url`, `link_url`, `sort_order`) VALUES
('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=80&fit=crop', '/conocimiento', 0),
('https://images.unsplash.com/photo-1623880132570-ab1b4297c8c2?w=500&q=80&fit=crop', '/proyectos', 1),
('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=500&q=80&fit=crop', '/lineas-estrategicas', 2),
('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80&fit=crop', '/nosotros', 3),
('https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80&fit=crop', '/agenda-2030', 4);

-- ------------------------------------------------------------------------------
-- 2. TABLA: cga_alliances (Alianzas Institucionales Internacionales)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_alliances`;
CREATE TABLE `cga_alliances` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `short_name` VARCHAR(100) DEFAULT '',
  `acronym` VARCHAR(50) DEFAULT '',
  `type` VARCHAR(50) DEFAULT 'multilateral',
  `scope_es` VARCHAR(255) DEFAULT '',
  `scope_en` VARCHAR(255) DEFAULT '',
  `role_es` TEXT,
  `role_en` TEXT,
  `tag` VARCHAR(100) DEFAULT '',
  `logo` VARCHAR(255) DEFAULT '',
  `website` VARCHAR(255) DEFAULT '',
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_type` (`type`),
  KEY `idx_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cga_alliances` (
  `id`, `name`, `short_name`, `acronym`, `type`, `scope_es`, `scope_en`,
  `role_es`, `role_en`, `tag`, `logo`, `website`, `sort_order`
) VALUES
('wess', 'World Environmental Sustainability Summit (WESS)', 'WESS Geneva', 'WESS', 'multilateral', 'Global · Ginebra', 'Global · Geneva', 'Socio de gobernanza global y premiación de iniciativas de biocultura.', 'Global governance partner and bioculture initiatives awarding body.', 'Ginebra 2026', '/imports/Logos/wess.png', 'https://mexicoporelclima.com/', 0),
('rirb', 'Decenio de las Naciones Unidas sobre la Restauración de los ecosistemas', 'Restauración de los ecosistemas', 'DNUSRE', 'multilateral', 'Global · ONU', 'Global · UN', 'Prevención, detención y reversión de la degradación de ecosistemas en todo el mundo.', 'Preventing, halting and reversing the degradation of ecosystems worldwide.', 'Restauración Global', '/imports/Logos/rirb.png', 'https://www.unesco.org/es/ecosystems-restoration-decade', 1),
('iies', 'Instituto de Investigaciones en Ecosistemas y Sustentabilidad', 'IIES UNAM', 'IIES', 'academic', 'América Latina', 'Latin America', 'Monitoreo satelital conjunto, modelación climática y validación científica.', 'Joint satellite monitoring, climate modeling and scientific validation.', 'Investigación Aplicada', '/imports/Logos/iies.png', 'https://www.cbd.int/', 2),
('cecgb', 'Centro de Estudios del Cambio Global y la Biosfera', 'CECG Biosfera', 'CECG', 'academic', 'Internacional', 'International', 'Publicaciones arbitradas y capacitación de cuadros directivos ambientales.', 'Peer-reviewed publications and environmental leadership training.', 'Docencia & Ciencia', '/imports/Logos/cecgb.jpg', 'https://earthcharter.org/', 3),
('uceps', 'Unión de Comunidades y Ejidos Protectores de la Selva', 'UCEPS Selva', 'UCEPS', 'territorial', 'Territorial · Corredor Biológico', 'Territorial · Biological Corridor', 'Custodia territorial de 450,000 hectáreas de bosque de niebla y selva alta.', 'Territorial custody of 450,000 hectares of cloud and tropical rainforest.', 'Custodia Territorial', '/imports/Logos/uceps.jpg', 'https://www.earthhour.org/', 4),
('fgpb', 'Alas Metropolitanas', 'Alas Metropolitanas', 'ALAS', 'territorial', 'Territorial · Biodiversidad Urbana', 'Territorial · Urban Biodiversity', 'Conservación de fauna aviar, protección de corredores biológicos y biodiversidad metropolitana.', 'Avian wildlife conservation, biological corridor protection and metropolitan biodiversity.', 'Biodiversidad Urbana', '/imports/Logos/alasmetropolitanas.jpg', 'https://mexicoporelclima.com/', 5);

-- ------------------------------------------------------------------------------
-- 3. TABLA: cga_governance (Miembros del Directorio y Gobernanza)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_governance_responsibilities`;
DROP TABLE IF EXISTS `cga_governance`;

CREATE TABLE `cga_governance` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role_es` VARCHAR(255) DEFAULT '',
  `role_en` VARCHAR(255) DEFAULT '',
  `display_role_es` VARCHAR(255) DEFAULT '',
  `display_role_en` VARCHAR(255) DEFAULT '',
  `category` VARCHAR(50) DEFAULT 'directorio',
  `tag_es` VARCHAR(100) DEFAULT '',
  `tag_en` VARCHAR(100) DEFAULT '',
  `country_es` VARCHAR(100) DEFAULT '',
  `country_en` VARCHAR(100) DEFAULT '',
  `img` VARCHAR(255) DEFAULT '',
  `bio_es` TEXT,
  `bio_en` TEXT,
  `email` VARCHAR(191) DEFAULT '',
  `linkedin` VARCHAR(255) DEFAULT '',
  `whatsapp` VARCHAR(100) DEFAULT '',
  `phone_mx` VARCHAR(100) DEFAULT '',
  `phone_ca` VARCHAR(100) DEFAULT '',
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_cat` (`category`),
  KEY `idx_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cga_governance` (
  `id`, `name`, `role_es`, `role_en`, `display_role_es`, `display_role_en`,
  `category`, `tag_es`, `tag_en`, `country_es`, `country_en`, `img`,
  `bio_es`, `bio_en`, `email`, `linkedin`, `whatsapp`, `phone_mx`, `phone_ca`, `sort_order`
) VALUES
('luis-garcia', 'Mtro. Luis García', 'Presidente del Consejo Directivo', 'President of the Board', 'Presidente del Consejo Directivo', 'President of the Board', 'directorio', 'Presidencia', 'Presidency', 'México / Canadá', 'Mexico / Canada', '/imports/Perfiles/LuisGarcia.png', 'Especialista en gobernanza socioambiental y derecho ecológico con más de 18 años de trayectoria en organismos multilaterales y proyectos de conservación de biomas.', 'Specialist in socio-environmental governance and ecological law with over 18 years of experience in multilateral organizations and biome conservation.', 'presidencia@consejocga.org', 'https://www.linkedin.com', '+52 55 4569 1548', '+52 55 4569 1548', '+1 437 290 8820', 0),
('francisco-solorio', 'Mtro. Francisco Solorio', 'Secretario Ejecutivo y Fundador', 'Executive Secretary & Founder', 'Secretario Ejecutivo y Fundador', 'Executive Secretary & Founder', 'gobierno', 'Secretaría Ejecutiva', 'Executive Secretariat', 'México', 'Mexico', '/imports/Perfiles/FranciscoSolorio.png', 'Investigador en gestión territorial, sustentabilidad y vinculación comunitaria. Impulsor del modelo de gobernanza territorial participativa.', 'Researcher in territorial management, sustainability and community engagement. Driver of the participatory territorial governance model.', 'secretaria@consejocga.org', 'https://www.linkedin.com', '+52 55 4569 1548', '+52 55 4569 1548', '', 1);

-- Responsabilidades de cada miembro
CREATE TABLE `cga_governance_responsibilities` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `governance_id` VARCHAR(100) NOT NULL,
  `responsibility_es` TEXT NOT NULL,
  `responsibility_en` TEXT NOT NULL,
  `sort_order` INT DEFAULT 0,
  KEY `idx_gov_id` (`governance_id`),
  CONSTRAINT `fk_gov_resp` FOREIGN KEY (`governance_id`) REFERENCES `cga_governance` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cga_governance_responsibilities` (`governance_id`, `responsibility_es`, `responsibility_en`, `sort_order`) VALUES
('luis-garcia', 'Representación institucional global del Consejo', 'Global institutional representation of the Council', 0),
('luis-garcia', 'Conducción estratégica de tratados y alianzas', 'Strategic leadership of treaties and alliances', 1),
('luis-garcia', 'Presidencia de la Asamblea General Anual', 'Presidency of the Annual General Assembly', 2),
('francisco-solorio', 'Articulación ejecutiva de programas y proyectos WESS', 'Executive coordination of WESS programs and projects', 0),
('francisco-solorio', 'Coordinación del cuerpo colegiado de especialistas', 'Coordination of the collegial body of specialists', 1);

-- ------------------------------------------------------------------------------
-- 4. TABLA: cga_popups (Pop-ups y Banners Informativos)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_popups`;
CREATE TABLE `cga_popups` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `enabled` TINYINT(1) DEFAULT 1,
  `design_type` VARCHAR(50) DEFAULT 'split-modal',
  `target_route` VARCHAR(100) DEFAULT '/',
  `trigger_type` VARCHAR(50) DEFAULT 'time',
  `trigger_delay_seconds` INT DEFAULT 2,
  `trigger_scroll_percent` INT DEFAULT 25,
  `has_cta_button` TINYINT(1) DEFAULT 1,
  `title` VARCHAR(255) DEFAULT '',
  `subtitle` VARCHAR(255) DEFAULT '',
  `message` TEXT,
  `image` VARCHAR(500) DEFAULT '',
  `png_element` VARCHAR(255) DEFAULT '',
  `highlight_badge` VARCHAR(100) DEFAULT '',
  `cta_text` VARCHAR(100) DEFAULT '',
  `cta_link` VARCHAR(255) DEFAULT '',
  `secondary_cta_text` VARCHAR(100) DEFAULT '',
  `secondary_cta_link` VARCHAR(255) DEFAULT '',
  `corner_position` VARCHAR(50) DEFAULT 'bottom-right',
  `once_per_session` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_enabled` (`enabled`),
  KEY `idx_route` (`target_route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
);

-- ------------------------------------------------------------------------------
-- 5. TABLAS: Academia, Diplomados y Cursos
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_training_courses`;
DROP TABLE IF EXISTS `cga_training_org_section`;
DROP TABLE IF EXISTS `cga_training`;

CREATE TABLE `cga_training_org_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subtitle_es` VARCHAR(255) DEFAULT 'Soluciones Institucionales a Medida',
  `subtitle_en` VARCHAR(255) DEFAULT 'Tailored Institutional Solutions',
  `title_es` VARCHAR(255) DEFAULT 'Programas para Organizaciones, Gobiernos y Empresas',
  `title_en` VARCHAR(255) DEFAULT 'Custom Programs for Organizations, Governments & Corporations',
  `description_es` TEXT,
  `description_en` TEXT,
  `cta_text_es` VARCHAR(100) DEFAULT 'Solicitar Propuesta Institucional',
  `cta_text_en` VARCHAR(100) DEFAULT 'Request Institutional Proposal',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cga_training_org_section` (
  `id`, `subtitle_es`, `subtitle_en`, `title_es`, `title_en`,
  `description_es`, `description_en`, `cta_text_es`, `cta_text_en`
) VALUES (
  1, 'Soluciones Institucionales a Medida', 'Tailored Institutional Solutions',
  'Programas para Organizaciones, Gobiernos y Empresas', 'Custom Programs for Organizations, Governments & Corporations',
  'Diseñamos diagnósticos integrales de madurez ecológica y capacitamos a gabinetes ministeriales, equipos corporativos y operadores territoriales bajo solicitud formal.',
  'We design comprehensive ecological maturity assessments and train institutional teams under formal request.',
  'Solicitar Propuesta Institucional', 'Request Institutional Proposal'
);

CREATE TABLE `cga_training_courses` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `type` VARCHAR(50) DEFAULT 'diplomado',
  `code` VARCHAR(50) DEFAULT '',
  `title_es` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) DEFAULT '',
  `subtitle_es` VARCHAR(255) DEFAULT '',
  `subtitle_en` VARCHAR(255) DEFAULT '',
  `description_es` TEXT,
  `description_en` TEXT,
  `duration_hours` INT DEFAULT 0,
  `modality` VARCHAR(50) DEFAULT 'online',
  `start_date` DATE DEFAULT NULL,
  `end_date` DATE DEFAULT NULL,
  `instructor_name` VARCHAR(255) DEFAULT '',
  `instructor_title` VARCHAR(255) DEFAULT '',
  `badge` VARCHAR(100) DEFAULT '',
  `price` DECIMAL(10,2) DEFAULT 0.00,
  `currency` VARCHAR(10) DEFAULT 'MXN',
  `image` VARCHAR(500) DEFAULT '',
  `is_active` TINYINT(1) DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_type` (`type`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. TABLA: cga_articles (Artículos y Publicaciones Científicas)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_articles`;
CREATE TABLE `cga_articles` (
  `id` VARCHAR(191) NOT NULL PRIMARY KEY,
  `alias_id` VARCHAR(191) DEFAULT NULL,
  `slug` VARCHAR(191) DEFAULT '',
  `title_es` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) DEFAULT '',
  `excerpt_es` TEXT,
  `excerpt_en` TEXT,
  `content_es` LONGTEXT,
  `content_en` LONGTEXT,
  `category` VARCHAR(100) DEFAULT 'general',
  `author_name` VARCHAR(255) DEFAULT 'Consejo Global Ambiental',
  `author_role` VARCHAR(255) DEFAULT '',
  `author_img` VARCHAR(255) DEFAULT '',
  `hero_img` VARCHAR(500) DEFAULT '',
  `hero_png` VARCHAR(255) DEFAULT '',
  `read_time_minutes` INT DEFAULT 5,
  `tags` VARCHAR(255) DEFAULT '',
  `status` VARCHAR(50) DEFAULT 'published',
  `published_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_category` (`category`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. TABLA: cga_applications (Solicitudes de Inscripción y Admisión)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_applications`;
CREATE TABLE `cga_applications` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `program_id` VARCHAR(100) DEFAULT NULL,
  `program_name` VARCHAR(255) DEFAULT '',
  `applicant_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(100) DEFAULT '',
  `organization` VARCHAR(255) DEFAULT '',
  `country` VARCHAR(100) DEFAULT '',
  `motivation` TEXT,
  `status` VARCHAR(50) DEFAULT 'pending',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_status` (`status`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. TABLA: cga_admins (Credenciales de Acceso al Panel de Administración)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cga_admins`;
CREATE TABLE `cga_admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) DEFAULT '',
  `role` VARCHAR(50) DEFAULT 'superadmin',
  `token` VARCHAR(255) DEFAULT NULL,
  `last_login` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Usuario: admin / Contraseña inicial: admin2026!
INSERT INTO `cga_admins` (`username`, `password_hash`, `email`, `role`) VALUES
('admin', '$2y$10$wE9l1pA9wS1kP8aO8/K6E.7L1d3c0pZ8y1Q2w3E4r5T6y7U8i9O0a', 'admin@consejocga.org', 'superadmin');

SET FOREIGN_KEY_CHECKS = 1;
