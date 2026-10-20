<?php
/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — ENDPOINT RELACIONAL DE GUARDADO (MYSQL)
 * ==============================================================================
 * Persiste los datos desde el panel de administración en tablas relacionales puras
 * (100% columnas estructuradas, SIN almacenamiento de datos en JSONs).
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Método no permitido. Usa POST.'], 405);
}

$input = getJsonInput();
$collection = isset($input['collection']) ? trim($input['collection']) : '';
$data = isset($input['data']) ? $input['data'] : null;

if (empty($collection) || $data === null) {
    jsonResponse(['success' => false, 'error' => 'Faltan parámetros obligatorios: collection y data.'], 400);
}

$pdo = getDb();

try {
    $pdo->beginTransaction();

    switch ($collection) {
        case 'settings':
            $banner = isset($data['banner']) ? $data['banner'] : $data;
            
            // 1. Guardar en cga_site_settings
            $stmt = $pdo->prepare("
                INSERT INTO `cga_site_settings` (
                    `id`, `banner_enabled`, `banner_style`, `banner_message`, `banner_show_cta`,
                    `banner_cta_text`, `banner_cta_link`, `banner_theme`, `banner_bg_color`, `banner_text_color`,
                    `banner_gradient_enabled`, `banner_gradient_direction`, `banner_gradient_from`, `banner_gradient_to`,
                    `banner_marquee_speed`, `banner_image_height`
                ) VALUES (
                    1, :enabled, :style, :message, :show_cta,
                    :cta_text, :cta_link, :theme, :bg_color, :text_color,
                    :grad_enabled, :grad_dir, :grad_from, :grad_to,
                    :speed, :img_height
                ) ON DUPLICATE KEY UPDATE
                    `banner_enabled` = :enabled_u,
                    `banner_style` = :style_u,
                    `banner_message` = :message_u,
                    `banner_show_cta` = :show_cta_u,
                    `banner_cta_text` = :cta_text_u,
                    `banner_cta_link` = :cta_link_u,
                    `banner_theme` = :theme_u,
                    `banner_bg_color` = :bg_color_u,
                    `banner_text_color` = :text_color_u,
                    `banner_gradient_enabled` = :grad_enabled_u,
                    `banner_gradient_direction` = :grad_dir_u,
                    `banner_gradient_from` = :grad_from_u,
                    `banner_gradient_to` = :grad_to_u,
                    `banner_marquee_speed` = :speed_u,
                    `banner_image_height` = :img_height_u
            ");

            $enabled = !empty($banner['enabled']) ? 1 : 0;
            $style = $banner['bannerStyle'] ?? 'static';
            $message = $banner['message'] ?? '';
            $showCta = !empty($banner['showCta']) ? 1 : 0;
            $ctaText = $banner['ctaText'] ?? 'Conocer más';
            $ctaLink = $banner['ctaLink'] ?? '/contacto';
            $theme = $banner['theme'] ?? 'moss';
            $bgColor = $banner['bgColor'] ?? '#4a5a22';
            $textColor = $banner['textColor'] ?? '#f5efe3';
            $gradEnabled = !empty($banner['gradientEnabled']) ? 1 : 0;
            $gradDir = $banner['gradientDirection'] ?? 'to-r';
            $gradFrom = $banner['gradientFrom'] ?? '#4a5a22';
            $gradTo = $banner['gradientTo'] ?? '#2d3813';
            $speed = (int)($banner['marqueeSpeed'] ?? 28);
            $imgHeight = (int)($banner['imageHeight'] ?? 72);

            $stmt->execute([
                ':enabled' => $enabled, ':style' => $style, ':message' => $message, ':show_cta' => $showCta,
                ':cta_text' => $ctaText, ':cta_link' => $ctaLink, ':theme' => $theme, ':bg_color' => $bgColor, ':text_color' => $textColor,
                ':grad_enabled' => $gradEnabled, ':grad_dir' => $gradDir, ':grad_from' => $gradFrom, ':grad_to' => $gradTo,
                ':speed' => $speed, ':img_height' => $imgHeight,
                ':enabled_u' => $enabled, ':style_u' => $style, ':message_u' => $message, ':show_cta_u' => $showCta,
                ':cta_text_u' => $ctaText, ':cta_link_u' => $ctaLink, ':theme_u' => $theme, ':bg_color_u' => $bgColor, ':text_color_u' => $textColor,
                ':grad_enabled_u' => $gradEnabled, ':grad_dir_u' => $gradDir, ':grad_from_u' => $gradFrom, ':grad_to_u' => $gradTo,
                ':speed_u' => $speed, ':img_height_u' => $imgHeight
            ]);

            // 2. Guardar marqueeTexts
            if (isset($banner['marqueeTexts']) && is_array($banner['marqueeTexts'])) {
                $pdo->exec("DELETE FROM `cga_marquee_texts`");
                $textIns = $pdo->prepare("INSERT INTO `cga_marquee_texts` (`text_content`, `sort_order`) VALUES (:text, :sort)");
                foreach ($banner['marqueeTexts'] as $idx => $t) {
                    if (is_string($t) && trim($t) !== '') {
                        $textIns->execute([':text' => trim($t), ':sort' => $idx]);
                    }
                }
            }

            // 3. Guardar marqueeImages
            if (isset($banner['marqueeImages']) && is_array($banner['marqueeImages'])) {
                $pdo->exec("DELETE FROM `cga_marquee_images`");
                $imgIns = $pdo->prepare("INSERT INTO `cga_marquee_images` (`image_url`, `link_url`, `sort_order`) VALUES (:url, :link, :sort)");
                foreach ($banner['marqueeImages'] as $idx => $img) {
                    $url = is_array($img) ? ($img['url'] ?? '') : (is_string($img) ? $img : '');
                    $link = is_array($img) ? ($img['link'] ?? '') : '';
                    if (!empty($url)) {
                        $imgIns->execute([':url' => $url, ':link' => $link, ':sort' => $idx]);
                    }
                }
            }
            break;

        case 'alliances':
            if (is_array($data)) {
                $pdo->exec("DELETE FROM `cga_alliances`");
                $insert = $pdo->prepare("
                    INSERT INTO `cga_alliances` (
                        `id`, `name`, `short_name`, `acronym`, `type`, `scope_es`, `scope_en`,
                        `role_es`, `role_en`, `tag`, `logo`, `website`, `sort_order`
                    ) VALUES (
                        :id, :name, :short_name, :acronym, :type, :scope_es, :scope_en,
                        :role_es, :role_en, :tag, :logo, :website, :sort
                    )
                ");

                foreach ($data as $i => $item) {
                    $scopeEs = is_array($item['scope'] ?? null) ? ($item['scope']['es'] ?? '') : ($item['scope'] ?? '');
                    $scopeEn = is_array($item['scope'] ?? null) ? ($item['scope']['en'] ?? '') : '';
                    $roleEs = is_array($item['role'] ?? null) ? ($item['role']['es'] ?? '') : ($item['role'] ?? '');
                    $roleEn = is_array($item['role'] ?? null) ? ($item['role']['en'] ?? '') : '';

                    $insert->execute([
                        ':id'         => $item['id'] ?? ('alliance-' . ($i + 1)),
                        ':name'       => $item['name'] ?? '',
                        ':short_name' => $item['shortName'] ?? '',
                        ':acronym'    => $item['acronym'] ?? '',
                        ':type'       => $item['type'] ?? 'multilateral',
                        ':scope_es'   => $scopeEs,
                        ':scope_en'   => $scopeEn,
                        ':role_es'    => $roleEs,
                        ':role_en'    => $roleEn,
                        ':tag'        => $item['tag'] ?? '',
                        ':logo'       => $item['logo'] ?? '',
                        ':website'    => $item['website'] ?? '',
                        ':sort'       => $i
                    ]);
                }
            }
            break;

        case 'governance':
            if (is_array($data)) {
                $pdo->exec("DELETE FROM `cga_governance_responsibilities`");
                $pdo->exec("DELETE FROM `cga_governance`");

                $insertGov = $pdo->prepare("
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

                $insertResp = $pdo->prepare("
                    INSERT INTO `cga_governance_responsibilities` (
                        `governance_id`, `responsibility_es`, `responsibility_en`, `sort_order`
                    ) VALUES (:gov_id, :resp_es, :resp_en, :sort)
                ");

                foreach ($data as $i => $m) {
                    $mId = $m['id'] ?? ('member-' . ($i + 1));
                    $roleEs = is_array($m['role'] ?? null) ? ($m['role']['es'] ?? '') : ($m['role'] ?? '');
                    $roleEn = is_array($m['role'] ?? null) ? ($m['role']['en'] ?? '') : '';
                    $displayRoleEs = is_array($m['displayRole'] ?? null) ? ($m['displayRole']['es'] ?? '') : ($m['displayRole'] ?? $roleEs);
                    $displayRoleEn = is_array($m['displayRole'] ?? null) ? ($m['displayRole']['en'] ?? '') : $roleEn;
                    $tagEs = is_array($m['tag'] ?? null) ? ($m['tag']['es'] ?? '') : ($m['tag'] ?? '');
                    $tagEn = is_array($m['tag'] ?? null) ? ($m['tag']['en'] ?? '') : '';
                    $countryEs = is_array($m['country'] ?? null) ? ($m['country']['es'] ?? '') : ($m['country'] ?? '');
                    $countryEn = is_array($m['country'] ?? null) ? ($m['country']['en'] ?? '') : '';
                    $bioEs = is_array($m['bio'] ?? null) ? ($m['bio']['es'] ?? '') : ($m['bio'] ?? '');
                    $bioEn = is_array($m['bio'] ?? null) ? ($m['bio']['en'] ?? '') : '';
                    $social = $m['social'] ?? [];

                    $insertGov->execute([
                        ':id'              => $mId,
                        ':name'            => $m['name'] ?? '',
                        ':role_es'         => $roleEs,
                        ':role_en'         => $roleEn,
                        ':display_role_es' => $displayRoleEs,
                        ':display_role_en' => $displayRoleEn,
                        ':category'        => $m['category'] ?? 'directorio',
                        ':tag_es'          => $tagEs,
                        ':tag_en'          => $tagEn,
                        ':country_es'      => $countryEs,
                        ':country_en'      => $countryEn,
                        ':img'             => $m['img'] ?? '',
                        ':bio_es'          => $bioEs,
                        ':bio_en'          => $bioEn,
                        ':email'           => $social['email'] ?? ($m['email'] ?? ''),
                        ':linkedin'        => $social['linkedin'] ?? ($m['linkedin'] ?? ''),
                        ':whatsapp'        => $social['whatsapp'] ?? ($m['whatsapp'] ?? ''),
                        ':phone_mx'        => $social['phoneMx'] ?? ($m['phoneMx'] ?? ''),
                        ':phone_ca'        => $social['phoneCa'] ?? ($m['phoneCa'] ?? ''),
                        ':sort'            => $i
                    ]);

                    if (isset($m['responsibilities']) && is_array($m['responsibilities'])) {
                        foreach ($m['responsibilities'] as $rIdx => $rp) {
                            $rEs = is_array($rp) ? ($rp['es'] ?? '') : (is_string($rp) ? $rp : '');
                            $rEn = is_array($rp) ? ($rp['en'] ?? '') : '';
                            if (!empty($rEs)) {
                                $insertResp->execute([
                                    ':gov_id'  => $mId,
                                    ':resp_es' => $rEs,
                                    ':resp_en' => $rEn,
                                    ':sort'    => $rIdx
                                ]);
                            }
                        }
                    }
                }
            }
            break;

        case 'popups':
            if (is_array($data)) {
                $pdo->exec("DELETE FROM `cga_popups`");
                $insert = $pdo->prepare("
                    INSERT INTO `cga_popups` (
                        `id`, `name`, `enabled`, `design_type`, `target_route`, `trigger_type`,
                        `trigger_delay_seconds`, `trigger_scroll_percent`, `has_cta_button`,
                        `title`, `subtitle`, `message`, `image`, `png_element`, `highlight_badge`,
                        `cta_text`, `cta_link`, `secondary_cta_text`, `secondary_cta_link`,
                        `corner_position`, `once_per_session`
                    ) VALUES (
                        :id, :name, :enabled, :design_type, :target_route, :trigger_type,
                        :trigger_delay_seconds, :trigger_scroll_percent, :has_cta_button,
                        :title, :subtitle, :message, :image, :png_element, :highlight_badge,
                        :cta_text, :cta_link, :secondary_cta_text, :secondary_cta_link,
                        :corner_position, :once_per_session
                    )
                ");

                foreach ($data as $p) {
                    $insert->execute([
                        ':id'                     => $p['id'] ?? ('popup-' . uniqid()),
                        ':name'                   => $p['name'] ?? '',
                        ':enabled'                => !empty($p['enabled']) ? 1 : 0,
                        ':design_type'            => $p['designType'] ?? 'split-modal',
                        ':target_route'           => $p['targetRoute'] ?? '/',
                        ':trigger_type'           => $p['triggerType'] ?? 'time',
                        ':trigger_delay_seconds'  => (int)($p['triggerDelaySeconds'] ?? 2),
                        ':trigger_scroll_percent' => (int)($p['triggerScrollPercent'] ?? 25),
                        ':has_cta_button'         => !empty($p['hasCtaButton']) ? 1 : 0,
                        ':title'                  => $p['title'] ?? '',
                        ':subtitle'               => $p['subtitle'] ?? '',
                        ':message'                => $p['message'] ?? '',
                        ':image'                  => $p['image'] ?? '',
                        ':png_element'            => $p['pngElement'] ?? '',
                        ':highlight_badge'        => $p['highlightBadge'] ?? '',
                        ':cta_text'               => $p['ctaText'] ?? '',
                        ':cta_link'               => $p['ctaLink'] ?? '',
                        ':secondary_cta_text'     => $p['secondaryCtaText'] ?? '',
                        ':secondary_cta_link'     => $p['secondaryCtaLink'] ?? '',
                        ':corner_position'        => $p['cornerPosition'] ?? 'bottom-right',
                        ':once_per_session'       => !empty($p['oncePerSession']) ? 1 : 0
                    ]);
                }
            }
            break;

        case 'articles':
            if (is_array($data)) {
                $pdo->exec("DELETE FROM `cga_articles`");
                $insert = $pdo->prepare("
                    INSERT INTO `cga_articles` (
                        `id`, `alias_id`, `slug`, `title_es`, `title_en`, `excerpt_es`, `excerpt_en`,
                        `content_es`, `content_en`, `category`, `author_name`, `author_role`,
                        `author_img`, `hero_img`, `hero_png`, `read_time_minutes`, `tags`,
                        `status`, `published_at`
                    ) VALUES (
                        :id, :alias, :slug, :title_es, :title_en, :excerpt_es, :excerpt_en,
                        :content_es, :content_en, :category, :author_name, :author_role,
                        :author_img, :hero_img, :hero_png, :read_time, :tags,
                        :status, :published_at
                    )
                ");

                foreach ($data as $art) {
                    $author = $art['author'] ?? [];
                    $tags = isset($art['tags']) && is_array($art['tags']) ? implode(',', $art['tags']) : ($art['tags'] ?? '');
                    
                    $insert->execute([
                        ':id'           => $art['id'] ?? ('art-' . uniqid()),
                        ':alias'        => $art['aliasId'] ?? null,
                        ':slug'         => $art['slug'] ?? '',
                        ':title_es'     => is_array($art['title'] ?? null) ? ($art['title']['es'] ?? '') : ($art['title'] ?? ''),
                        ':title_en'     => is_array($art['title'] ?? null) ? ($art['title']['en'] ?? '') : '',
                        ':excerpt_es'   => is_array($art['excerpt'] ?? null) ? ($art['excerpt']['es'] ?? '') : ($art['excerpt'] ?? ''),
                        ':excerpt_en'   => is_array($art['excerpt'] ?? null) ? ($art['excerpt']['en'] ?? '') : '',
                        ':content_es'   => is_array($art['content'] ?? null) ? ($art['content']['es'] ?? '') : ($art['content'] ?? ''),
                        ':content_en'   => is_array($art['content'] ?? null) ? ($art['content']['en'] ?? '') : '',
                        ':category'     => $art['category'] ?? 'general',
                        ':author_name'  => $author['name'] ?? ($art['authorName'] ?? 'Consejo Global Ambiental'),
                        ':author_role'  => $author['role'] ?? '',
                        ':author_img'   => $author['img'] ?? '',
                        ':hero_img'     => $art['heroImg'] ?? '',
                        ':hero_png'     => $art['heroPng'] ?? '',
                        ':read_time'    => (int)($art['readTime'] ?? ($art['readTimeMinutes'] ?? 5)),
                        ':tags'         => $tags,
                        ':status'       => $art['status'] ?? 'published',
                        ':published_at' => $art['publishedAt'] ?? date('Y-m-d H:i:s')
                    ]);
                }
            }
            break;

        case 'training':
            if (is_array($data)) {
                // 1. Guardar sección organizaciones
                if (isset($data['organizaciones'])) {
                    $org = $data['organizaciones'];
                    $subEs = is_array($org['subtitle'] ?? null) ? ($org['subtitle']['es'] ?? '') : ($org['subtitle'] ?? '');
                    $subEn = is_array($org['subtitle'] ?? null) ? ($org['subtitle']['en'] ?? '') : '';
                    $titleEs = is_array($org['title'] ?? null) ? ($org['title']['es'] ?? '') : ($org['title'] ?? '');
                    $titleEn = is_array($org['title'] ?? null) ? ($org['title']['en'] ?? '') : '';
                    $descEs = is_array($org['description'] ?? null) ? ($org['description']['es'] ?? '') : ($org['description'] ?? '');
                    $descEn = is_array($org['description'] ?? null) ? ($org['description']['en'] ?? '') : '';
                    $ctaEs = is_array($org['ctaText'] ?? null) ? ($org['ctaText']['es'] ?? '') : ($org['ctaText'] ?? '');
                    $ctaEn = is_array($org['ctaText'] ?? null) ? ($org['ctaText']['en'] ?? '') : '';

                    $orgStmt = $pdo->prepare("
                        INSERT INTO `cga_training_org_section` (
                            `id`, `subtitle_es`, `subtitle_en`, `title_es`, `title_en`,
                            `description_es`, `description_en`, `cta_text_es`, `cta_text_en`
                        ) VALUES (
                            1, :sub_es, :sub_en, :title_es, :title_en,
                            :desc_es, :desc_en, :cta_es, :cta_en
                        ) ON DUPLICATE KEY UPDATE
                            `subtitle_es` = :sub_es_u, `subtitle_en` = :sub_en_u,
                            `title_es` = :title_es_u, `title_en` = :title_en_u,
                            `description_es` = :desc_es_u, `description_en` = :desc_en_u,
                            `cta_text_es` = :cta_es_u, `cta_text_en` = :cta_en_u
                    ");

                    $orgStmt->execute([
                        ':sub_es' => $subEs, ':sub_en' => $subEn, ':title_es' => $titleEs, ':title_en' => $titleEn,
                        ':desc_es' => $descEs, ':desc_en' => $descEn, ':cta_es' => $ctaEs, ':cta_en' => $ctaEn,
                        ':sub_es_u' => $subEs, ':sub_en_u' => $subEn, ':title_es_u' => $titleEs, ':title_en_u' => $titleEn,
                        ':desc_es_u' => $descEs, ':desc_en_u' => $descEn, ':cta_es_u' => $ctaEs, ':cta_en_u' => $ctaEn
                    ]);
                }

                // 2. Guardar cursos, diplomados, webinars
                $types = ['diplomados' => 'diplomado', 'cursos' => 'curso', 'webinars' => 'webinar'];
                foreach ($types as $key => $typeVal) {
                    if (isset($data[$key]) && is_array($data[$key])) {
                        $del = $pdo->prepare("DELETE FROM `cga_training_courses` WHERE `type` = :type");
                        $del->execute([':type' => $typeVal]);

                        $insCourse = $pdo->prepare("
                            INSERT INTO `cga_training_courses` (
                                `id`, `type`, `code`, `title_es`, `title_en`, `subtitle_es`, `subtitle_en`,
                                `description_es`, `description_en`, `duration_hours`, `modality`,
                                `start_date`, `end_date`, `instructor_name`, `instructor_title`,
                                `badge`, `price`, `currency`, `image`, `is_active`, `sort_order`
                            ) VALUES (
                                :id, :type, :code, :title_es, :title_en, :subtitle_es, :subtitle_en,
                                :description_es, :description_en, :duration_hours, :modality,
                                :start_date, :end_date, :instructor_name, :instructor_title,
                                :badge, :price, :currency, :image, 1, :sort
                            )
                        ");

                        foreach ($data[$key] as $idx => $c) {
                            $insCourse->execute([
                                ':id'               => $c['id'] ?? ($typeVal . '-' . ($idx + 1)),
                                ':type'             => $typeVal,
                                ':code'             => $c['code'] ?? '',
                                ':title_es'         => is_array($c['title'] ?? null) ? ($c['title']['es'] ?? '') : ($c['title'] ?? ''),
                                ':title_en'         => is_array($c['title'] ?? null) ? ($c['title']['en'] ?? '') : '',
                                ':subtitle_es'      => is_array($c['subtitle'] ?? null) ? ($c['subtitle']['es'] ?? '') : ($c['subtitle'] ?? ''),
                                ':subtitle_en'      => is_array($c['subtitle'] ?? null) ? ($c['subtitle']['en'] ?? '') : '',
                                ':description_es'   => is_array($c['description'] ?? null) ? ($c['description']['es'] ?? '') : ($c['description'] ?? ''),
                                ':description_en'   => is_array($c['description'] ?? null) ? ($c['description']['en'] ?? '') : '',
                                ':duration_hours'   => (int)($c['durationHours'] ?? 0),
                                ':modality'         => $c['modality'] ?? 'online',
                                ':start_date'       => !empty($c['startDate']) ? $c['startDate'] : null,
                                ':end_date'         => !empty($c['endDate']) ? $c['endDate'] : null,
                                ':instructor_name'  => $c['instructorName'] ?? '',
                                ':instructor_title' => $c['instructorTitle'] ?? '',
                                ':badge'            => $c['badge'] ?? '',
                                ':price'            => (float)($c['price'] ?? 0),
                                ':currency'         => $c['currency'] ?? 'MXN',
                                ':image'            => $c['image'] ?? '',
                                ':sort'             => $idx
                            ]);
                        }
                    }
                }
            }
            break;

        case 'applications':
            if (is_array($data)) {
                $pdo->exec("DELETE FROM `cga_applications`");
                $insert = $pdo->prepare("
                    INSERT INTO `cga_applications` (
                        `id`, `program_id`, `program_name`, `applicant_name`, `email`,
                        `phone`, `organization`, `country`, `motivation`, `status`, `notes`
                    ) VALUES (
                        :id, :program_id, :program_name, :name, :email,
                        :phone, :org, :country, :motivation, :status, :notes
                    )
                ");

                foreach ($data as $app) {
                    $insert->execute([
                        ':id'           => $app['id'] ?? ('app-' . uniqid()),
                        ':program_id'   => $app['programId'] ?? null,
                        ':program_name' => $app['programName'] ?? '',
                        ':name'         => $app['applicantName'] ?? ($app['name'] ?? ''),
                        ':email'        => $app['email'] ?? '',
                        ':phone'        => $app['phone'] ?? '',
                        ':org'          => $app['organization'] ?? '',
                        ':country'      => $app['country'] ?? '',
                        ':motivation'   => $app['motivation'] ?? '',
                        ':status'       => $app['status'] ?? 'pending',
                        ':notes'        => $app['notes'] ?? ''
                    ]);
                }
            }
            break;

        default:
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => "Colección '$collection' no soportada."], 400);
    }

    $pdo->commit();
    jsonResponse([
        'success'    => true,
        'collection' => $collection,
        'message'    => "Datos relacionales de '$collection' guardados con éxito en MySQL.",
        'timestamp'  => time()
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    jsonResponse([
        'success' => false,
        'error'   => 'Error al persistir datos relacionales: ' . $e->getMessage()
    ], 500);
}
