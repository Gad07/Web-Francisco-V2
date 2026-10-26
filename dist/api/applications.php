<?php
/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — RECEPCIÓN DE SOLICITUDES DE ADMISIÓN
 * ==============================================================================
 * Recibe registros y solicitudes del formulario público de Capacitación / Academia
 * y los guarda directamente en la tabla relacional `cga_applications` de MySQL.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Método no permitido. Usa POST.'], 405);
}

$input = getJsonInput();

$applicantName = isset($input['applicantName']) ? trim($input['applicantName']) : (isset($input['name']) ? trim($input['name']) : '');
$email = isset($input['email']) ? trim($input['email']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$programId = isset($input['programId']) ? trim($input['programId']) : '';
$programName = isset($input['programName']) ? trim($input['programName']) : 'Programa General CGA';
$organization = isset($input['organization']) ? trim($input['organization']) : '';
$country = isset($input['country']) ? trim($input['country']) : '';
$motivation = isset($input['motivation']) ? trim($input['motivation']) : '';
$notes = isset($input['notes']) ? trim($input['notes']) : '';

if (empty($applicantName) || empty($email)) {
    jsonResponse(['success' => false, 'error' => 'Nombre y correo electrónico son campos obligatorios.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['success' => false, 'error' => 'El formato del correo electrónico es inválido.'], 400);
}

// Sanitizar entradas y limitar longitud para prevenir sobrecargas
$applicantName = mb_substr(htmlspecialchars($applicantName, ENT_QUOTES, 'UTF-8'), 0, 150);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = mb_substr(htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'), 0, 50);
$organization = mb_substr(htmlspecialchars($organization, ENT_QUOTES, 'UTF-8'), 0, 150);
$country = mb_substr(htmlspecialchars($country, ENT_QUOTES, 'UTF-8'), 0, 80);
$motivation = mb_substr(htmlspecialchars($motivation, ENT_QUOTES, 'UTF-8'), 0, 2000);
$notes = mb_substr(htmlspecialchars($notes, ENT_QUOTES, 'UTF-8'), 0, 1000);

$pdo = getDb();
$appId = 'app-' . time() . '-' . rand(100, 999);

try {
    $stmt = $pdo->prepare("
        INSERT INTO `cga_applications` (
            `id`, `program_id`, `program_name`, `applicant_name`, `email`,
            `phone`, `organization`, `country`, `motivation`, `status`, `notes`
        ) VALUES (
            :id, :program_id, :program_name, :name, :email,
            :phone, :org, :country, :motivation, 'pending', :notes
        )
    ");
    
    $stmt->execute([
        ':id'           => $appId,
        ':program_id'   => $programId ?: null,
        ':program_name' => $programName,
        ':name'         => $applicantName,
        ':email'        => $email,
        ':phone'        => $phone,
        ':org'          => $organization,
        ':country'      => $country,
        ':motivation'   => $motivation,
        ':notes'        => $notes
    ]);

    jsonResponse([
        'success' => true,
        'id'      => $appId,
        'message' => 'Solicitud recibida y registrada en la base de datos con éxito.',
    ], 201);
} catch (Exception $e) {
    jsonResponse([
        'success' => false,
        'error'   => 'Error al registrar solicitud: ' . $e->getMessage()
    ], 500);
}
