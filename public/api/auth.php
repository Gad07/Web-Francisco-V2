<?php
/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — AUTENTICACIÓN DE ADMINISTRADORES
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

$action = isset($_GET['action']) ? trim($_GET['action']) : 'login';
$input = getJsonInput();
$pdo = getDb();

if ($action === 'login') {
    $username = isset($input['username']) ? trim($input['username']) : '';
    $password = isset($input['password']) ? trim($input['password']) : '';

    if (empty($username) || empty($password)) {
        jsonResponse(['success' => false, 'error' => 'Usuario y contraseña requeridos.'], 400);
    }

    try {
        $stmt = $pdo->prepare("SELECT `id`, `username`, `password_hash`, `email` FROM `cga_admins` WHERE `username` = :user LIMIT 1");
        $stmt->execute([':user' => $username]);
        $admin = $stmt->fetch();

        if (!$admin || !password_verify($password, $admin['password_hash'])) {
            jsonResponse(['success' => false, 'error' => 'Credenciales inválidas.'], 401);
        }

        // Generar token de sesión
        $token = bin2hex(random_bytes(32));
        $update = $pdo->prepare("UPDATE `cga_admins` SET `token` = :token, `last_login` = NOW() WHERE `id` = :id");
        $update->execute([':token' => $token, ':id' => $admin['id']]);

        jsonResponse([
            'success' => true,
            'token'   => $token,
            'user'    => [
                'id'       => $admin['id'],
                'username' => $admin['username'],
                'email'    => $admin['email']
            ]
        ]);
    } catch (Exception $e) {
        jsonResponse(['success' => false, 'error' => 'Error de autenticación: ' . $e->getMessage()], 500);
    }
} elseif ($action === 'verify') {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $token = $headers['X-Admin-Token'] ?? ($headers['x-admin-token'] ?? ($_SERVER['HTTP_X_ADMIN_TOKEN'] ?? ($input['token'] ?? ($_GET['token'] ?? ''))));

    if (empty($token)) {
        jsonResponse(['success' => false, 'error' => 'Token no proporcionado.'], 401);
    }

    if ($token === ADMIN_SECRET_KEY) {
        jsonResponse(['success' => true, 'user' => ['id' => 1, 'username' => 'admin', 'role' => 'superadmin']]);
    }

    $stmt = $pdo->prepare("SELECT `id`, `username`, `email` FROM `cga_admins` WHERE `token` = :token LIMIT 1");
    $stmt->execute([':token' => $token]);
    $admin = $stmt->fetch();

    if ($admin) {
        jsonResponse(['success' => true, 'user' => $admin]);
    } else {
        jsonResponse(['success' => false, 'error' => 'Token expirado o inválido.'], 401);
    }
}
 else {
    jsonResponse(['success' => false, 'error' => "Acción '$action' no soportada."], 400);
}
