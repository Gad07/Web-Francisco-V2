<?php
/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — ENDPOINT RELACIONAL DE LECTURA (MYSQL)
 * ==============================================================================
 * Realiza consultas SELECT directas a las tablas relacionales normalizadas
 * (SIN campos data_json) y entrega los datos estructurados al frontend.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

$collection = isset($_GET['collection']) ? trim($_GET['collection']) : 'all';
$pdo = getDb();

function getSiteSettingsRelational($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM `cga_site_settings` LIMIT 1");
        $row = $stmt->fetch();
        if (!$row) return null;

        // Textos del marquee
        $textStmt = $pdo->query("SELECT `text_content` FROM `cga_marquee_texts` ORDER BY `sort_order` ASC, `id` ASC");
        $marqueeTexts = $textStmt->fetchAll(PDO::FETCH_COLUMN) ?: [];

        // Imágenes del marquee
        $imgStmt = $pdo->query("SELECT `id`, `image_url` as `url`, `link_url` as `link` FROM `cga_marquee_images` ORDER BY `sort_order` ASC, `id` ASC");
        $marqueeImages = $imgStmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

        return [
            'banner' => [
                'enabled'           => (bool)$row['banner_enabled'],
                'bannerStyle'       => $row['banner_style'],
                'message'           => $row['banner_message'],
                'showCta'           => (bool)$row['banner_show_cta'],
                'ctaText'           => $row['banner_cta_text'],
                'ctaLink'           => $row['banner_cta_link'],
                'theme'             => $row['banner_theme'],
                'bgColor'           => $row['banner_bg_color'],
                'textColor'         => $row['banner_text_color'],
                'gradientEnabled'   => (bool)$row['banner_gradient_enabled'],
                'gradientDirection' => $row['banner_gradient_direction'],
                'gradientFrom'      => $row['banner_gradient_from'],
                'gradientTo'        => $row['banner_gradient_to'],
                'marqueeTexts'      => $marqueeTexts,
                'marqueeSpeed'      => (int)$row['banner_marquee_speed'],
                'marqueeImages'     => $marqueeImages,
                'imageHeight'       => (int)$row['banner_image_height']
            ]
        ];
    } catch (Exception $e) {
        return null;
    }
}

function getAlliancesRelational($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM `cga_alliances` ORDER BY `sort_order` ASC, `id` ASC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $alliances = [];
        foreach ($rows as $r) {
            $alliances[] = [
                'id'        => $r['id'],
                'name'      => $r['name'],
                'shortName' => $r['short_name'],
                'acronym'   => $r['acronym'],
                'type'      => $r['type'],
                'scope'     => ['es' => $r['scope_es'], 'en' => $r['scope_en']],
                'role'      => ['es' => $r['role_es'], 'en' => $r['role_en']],
                'tag'       => $r['tag'],
                'logo'      => $r['logo'],
                'website'   => $r['website']
            ];
        }
        return $alliances;
    } catch (Exception $e) {
        return [];
    }
}

function getGovernanceRelational($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM `cga_governance` ORDER BY `sort_order` ASC, `id` ASC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Responsabilidades indexadas por governance_id
        $respStmt = $pdo->query("SELECT `governance_id`, `responsibility_es`, `responsibility_en` FROM `cga_governance_responsibilities` ORDER BY `sort_order` ASC, `id` ASC");
        $allResp = $respStmt->fetchAll(PDO::FETCH_ASSOC);
        $respByMember = [];
        foreach ($allResp as $rp) {
            $respByMember[$rp['governance_id']][] = [
                'es' => $rp['responsibility_es'],
                'en' => $rp['responsibility_en']
            ];
        }

        $members = [];
        foreach ($rows as $r) {
            $id = $r['id'];
            $members[] = [
                'id'               => $id,
                'name'             => $r['name'],
                'role'             => ['es' => $r['role_es'], 'en' => $r['role_en']],
                'displayRole'      => ['es' => $r['display_role_es'], 'en' => $r['display_role_en']],
                'category'         => $r['category'],
                'tag'              => ['es' => $r['tag_es'], 'en' => $r['tag_en']],
                'country'          => ['es' => $r['country_es'], 'en' => $r['country_en']],
                'img'              => $r['img'],
                'bio'              => ['es' => $r['bio_es'], 'en' => $r['bio_en']],
                'responsibilities' => isset($respByMember[$id]) ? $respByMember[$id] : [],
                'social'           => [
                    'email'    => $r['email'],
                    'linkedin' => $r['linkedin'],
                    'whatsapp' => $r['whatsapp'],
                    'phoneMx'  => $r['phone_mx'],
                    'phoneCa'  => $r['phone_ca']
                ]
            ];
        }
        return $members;
    } catch (Exception $e) {
        return [];
    }
}

function getPopupsRelational($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM `cga_popups` ORDER BY `id` ASC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $popups = [];
        foreach ($rows as $r) {
            $popups[] = [
                'id'                   => $r['id'],
                'name'                 => $r['name'],
                'enabled'              => (bool)$r['enabled'],
                'designType'           => $r['design_type'],
                'targetRoute'          => $r['target_route'],
                'triggerType'          => $r['trigger_type'],
                'triggerDelaySeconds'  => (int)$r['trigger_delay_seconds'],
                'triggerScrollPercent' => (int)$r['trigger_scroll_percent'],
                'hasCtaButton'         => (bool)$r['has_cta_button'],
                'title'                => $r['title'],
                'subtitle'             => $r['subtitle'],
                'message'              => $r['message'],
                'image'                => $r['image'],
                'pngElement'           => $r['png_element'],
                'highlightBadge'       => $r['highlight_badge'],
                'ctaText'              => $r['cta_text'],
                'ctaLink'              => $r['cta_link'],
                'secondaryCtaText'     => $r['secondary_cta_text'],
                'secondaryCtaLink'     => $r['secondary_cta_link'],
                'cornerPosition'       => $r['corner_position'],
                'oncePerSession'       => (bool)$r['once_per_session']
            ];
        }
        return $popups;
    } catch (Exception $e) {
        return [];
    }
}

function getArticlesRelational($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM `cga_articles` ORDER BY `published_at` DESC, `created_at` DESC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $articles = [];
        foreach ($rows as $r) {
            $excerpt = ['es' => $r['excerpt_es'], 'en' => $r['excerpt_en']];
            $content = ['es' => $r['content_es'], 'en' => $r['content_en']];
            
            // Reconstruir lista de párrafos para el editor y los lectores
            $paragraphs = [];
            if (!empty($r['content_es']) || !empty($r['content_en'])) {
                $esList = !empty($r['content_es']) ? explode("\n\n", $r['content_es']) : [''];
                $enList = !empty($r['content_en']) ? explode("\n\n", $r['content_en']) : [''];
                $maxP = max(count($esList), count($enList));
                for ($pi = 0; $pi < $maxP; $pi++) {
                    $paragraphs[] = [
                        'es' => $esList[$pi] ?? '',
                        'en' => $enList[$pi] ?? ''
                    ];
                }
            }
            if (empty($paragraphs)) {
                $paragraphs = [['es' => '', 'en' => '']];
            }

            $img = !empty($r['hero_img']) ? $r['hero_img'] : '';
            $readTimeMin = (int)$r['read_time_minutes'] ?: 5;

            $articles[] = [
                'id'          => $r['id'],
                'aliasId'     => $r['alias_id'],
                'slug'        => $r['slug'],
                'title'       => ['es' => $r['title_es'], 'en' => $r['title_en']],
                'excerpt'     => $excerpt,
                'summary'     => $excerpt,
                'content'     => $content,
                'paragraphs'  => $paragraphs,
                'category'    => ['es' => $r['category'], 'en' => $r['category']],
                'type'        => $r['category'],
                'author'      => $r['author_name'],
                'authorName'  => $r['author_name'],
                'authorRole'  => ['es' => $r['author_role'], 'en' => $r['author_role']],
                'authorImg'   => $r['author_img'],
                'image'       => $img,
                'heroImg'     => $img,
                'heroBgImage' => $img,
                'heroPng'     => $r['hero_png'],
                'readTime'    => $readTimeMin . ' min de lectura',
                'tags'        => !empty($r['tags']) ? explode(',', $r['tags']) : [],
                'status'      => $r['status'],
                'date'        => $r['published_at'],
                'publishedAt' => $r['published_at'],
                'createdAt'   => $r['created_at'],
                'updatedAt'   => $r['updated_at']
            ];
        }
        return $articles;
    } catch (Exception $e) {
        return [];
    }
}

function getTrainingRelational($pdo) {
    try {
        $orgStmt = $pdo->query("SELECT * FROM `cga_training_org_section` LIMIT 1");
        $orgRow = $orgStmt->fetch(PDO::FETCH_ASSOC);
        $organizaciones = $orgRow ? [
            'subtitle'    => ['es' => $orgRow['subtitle_es'], 'en' => $orgRow['subtitle_en']],
            'title'       => ['es' => $orgRow['title_es'], 'en' => $orgRow['title_en']],
            'description' => ['es' => $orgRow['description_es'], 'en' => $orgRow['description_en']],
            'ctaText'     => ['es' => $orgRow['cta_text_es'], 'en' => $orgRow['cta_text_en']],
            'programs'    => [],
            'benefits'    => []
        ] : null;

        $coursesStmt = $pdo->query("SELECT * FROM `cga_training_courses` WHERE `is_active` = 1 ORDER BY `sort_order` ASC");
        $coursesRows = $coursesStmt->fetchAll(PDO::FETCH_ASSOC);
        
        $diplomados = [];
        $cursos = [];
        $webinars = [];
        $especialistas = [];

        foreach ($coursesRows as $c) {
            $formatted = [
                'id'              => $c['id'],
                'code'            => $c['code'],
                'title'           => ['es' => $c['title_es'], 'en' => $c['title_en']],
                'subtitle'        => ['es' => $c['subtitle_es'], 'en' => $c['subtitle_en']],
                'description'     => ['es' => $c['description_es'], 'en' => $c['description_en']],
                'durationHours'   => (int)$c['duration_hours'],
                'modality'        => $c['modality'],
                'startDate'       => $c['start_date'],
                'endDate'         => $c['end_date'],
                'instructorName'  => $c['instructor_name'],
                'instructorTitle' => $c['instructor_title'],
                'badge'           => $c['badge'],
                'price'           => (float)$c['price'],
                'currency'        => $c['currency'],
                'image'           => $c['image']
            ];

            if ($c['type'] === 'diplomado') {
                $diplomados[] = $formatted;
            } elseif ($c['type'] === 'curso') {
                $cursos[] = $formatted;
            } elseif ($c['type'] === 'webinar') {
                $webinars[] = $formatted;
            } elseif ($c['type'] === 'especialista') {
                $especialistas[] = [
                    'id'          => $c['id'],
                    'name'        => $c['title_es'],
                    'role'        => ['es' => $c['subtitle_es'], 'en' => $c['subtitle_en']],
                    'title'       => ['es' => $c['subtitle_es'], 'en' => $c['subtitle_en']],
                    'institution' => $c['instructor_name'],
                    'bio'         => ['es' => $c['description_es'], 'en' => $c['description_en']],
                    'image'       => $c['image'],
                    'img'         => $c['image']
                ];
            }
        }

        return [
            'organizaciones' => $organizaciones,
            'diplomados'     => $diplomados,
            'cursos'         => $cursos,
            'webinars'       => $webinars,
            'especialistas'  => $especialistas,
            'calendario'     => []
        ];
    } catch (Exception $e) {
        return [];
    }
}

function getApplicationsRelational($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM `cga_applications` ORDER BY `created_at` DESC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $apps = [];
        foreach ($rows as $r) {
            $apps[] = [
                'id'            => $r['id'],
                'programId'     => $r['program_id'],
                'programName'   => $r['program_name'],
                'applicantName' => $r['applicant_name'],
                'name'          => $r['applicant_name'],
                'email'         => $r['email'],
                'phone'         => $r['phone'],
                'organization'  => $r['organization'],
                'country'       => $r['country'],
                'motivation'    => $r['motivation'],
                'status'        => $r['status'],
                'notes'         => $r['notes'],
                'date'          => $r['created_at'],
                'createdAt'     => $r['created_at']
            ];
        }
        return $apps;
    } catch (Exception $e) {
        return [];
    }
}


try {
    if ($collection === 'all') {
        $response = [
            'success'           => true,
            'source'            => 'mysql_relational',
            'timestamp'         => time(),
            'siteSettings'      => getSiteSettingsRelational($pdo),
            'alliances'         => getAlliancesRelational($pdo),
            'governanceMembers' => getGovernanceRelational($pdo),
            'popups'            => getPopupsRelational($pdo),
            'articles'          => getArticlesRelational($pdo),
            'trainingData'      => getTrainingRelational($pdo),
            'applications'      => getApplicationsRelational($pdo)
        ];
        jsonResponse($response);
    }

    switch ($collection) {
        case 'settings':
            jsonResponse(['success' => true, 'data' => getSiteSettingsRelational($pdo)]);
        case 'alliances':
            jsonResponse(['success' => true, 'data' => getAlliancesRelational($pdo)]);
        case 'governance':
            jsonResponse(['success' => true, 'data' => getGovernanceRelational($pdo)]);
        case 'popups':
            jsonResponse(['success' => true, 'data' => getPopupsRelational($pdo)]);
        case 'articles':
            jsonResponse(['success' => true, 'data' => getArticlesRelational($pdo)]);
        case 'training':
            jsonResponse(['success' => true, 'data' => getTrainingRelational($pdo)]);
        case 'applications':
            jsonResponse(['success' => true, 'data' => getApplicationsRelational($pdo)]);
        default:
            jsonResponse(['success' => false, 'error' => "Colección '{$collection}' no reconocida"], 404);
    }
} catch (Exception $e) {
    jsonResponse([
        'success' => false,
        'error'   => 'Error en consulta relacional: ' . $e->getMessage()
    ], 500);
}
