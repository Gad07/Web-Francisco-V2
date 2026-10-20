-- ==============================================================================
-- CONSEJO GLOBAL AMBIENTAL (CGA) — SCHEMA RELACIONAL PURO (SIN JSONs)
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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

CREATE TABLE `cga_marquee_texts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `text_content` VARCHAR(255) NOT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cga_marquee_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `image_url` VARCHAR(500) NOT NULL,
  `link_url` VARCHAR(255) DEFAULT '',
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE `cga_governance_responsibilities` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `governance_id` VARCHAR(100) NOT NULL,
  `responsibility_es` TEXT NOT NULL,
  `responsibility_en` TEXT NOT NULL,
  `sort_order` INT DEFAULT 0,
  KEY `idx_gov_id` (`governance_id`),
  CONSTRAINT `fk_gov_resp` FOREIGN KEY (`governance_id`) REFERENCES `cga_governance` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

DROP TABLE IF EXISTS `cga_training_courses`;
DROP TABLE IF EXISTS `cga_training_org_section`;
DROP TABLE IF EXISTS `cga_training`;

CREATE TABLE `cga_training_org_section` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subtitle_es` VARCHAR(255) DEFAULT '',
  `subtitle_en` VARCHAR(255) DEFAULT '',
  `title_es` VARCHAR(255) DEFAULT '',
  `title_en` VARCHAR(255) DEFAULT '',
  `description_es` TEXT,
  `description_en` TEXT,
  `cta_text_es` VARCHAR(100) DEFAULT '',
  `cta_text_en` VARCHAR(100) DEFAULT '',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

SET FOREIGN_KEY_CHECKS = 1;
