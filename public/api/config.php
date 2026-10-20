<?php
/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — CONFIGURACIÓN SEGURA & VARIABLES DE ENTORNO
 * ==============================================================================
 * Este archivo gestiona la conexión con la base de datos MySQL en Hostinger y carga
 * las variables de entorno desde el archivo `.env` para garantizar máxima seguridad.
 */

// 1. CARGADOR AUTÓNOMO DE VARIABLES DE ENTORNO (.env)
if (!function_exists('loadEnvFile')) {
    function loadEnvFile() {
        // Rutas posibles de búsqueda para el archivo .env
        $candidates = [
            __DIR__ . '/../../.env',       // Raíz del proyecto (desarrollo / subida completa)
            __DIR__ . '/../.env',          // Directorio public/
            __DIR__ . '/.env',             // Directorio api/
            dirname(__DIR__, 2) . '/.env',
        ];

        foreach ($candidates as $filePath) {
            if (file_exists($filePath) && is_readable($filePath)) {
                $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                if ($lines === false) continue;

                foreach ($lines as $line) {
                    $trimmed = trim($line);
                    // Omitir líneas vacías o comentarios (#)
                    if ($trimmed === '' || strpos($trimmed, '#') === 0) {
                        continue;
                    }
                    if (strpos($trimmed, '=') !== false) {
                        list($name, $val) = explode('=', $trimmed, 2);
                        $name = trim($name);
                        $val = trim($val);
                        // Remover comillas si existen (" o ')
                        $val = trim($val, "\"'");
                        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                            putenv("{$name}={$val}");
                            $_ENV[$name] = $val;
                            $_SERVER[$name] = $val;
                        }
                    }
                }
                break;
            }
        }
    }
}

// Cargar variables de entorno
loadEnvFile();

// 2. PARÁMETROS DE BASE DE DATOS (MYSQL HOSTINGER)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'u711292148_cgadb');
define('DB_USER', getenv('DB_USER') ?: 'u711292148_cgaus');
define('DB_PASS', getenv('DB_PASS') ?: 'cgadbps295.B');
define('DB_CHARSET', getenv('DB_CHARSET') ?: 'utf8mb4');

// 3. SEGURIDAD, TOKENS Y CLAVES CRIPTOGRÁFICAS
define('ADMIN_SECRET_KEY', getenv('ADMIN_SECRET_KEY') ?: 'cga_sec_8f902ba14d87e024cb57e911df');
define('SETUP_KEY', getenv('SETUP_KEY') ?: 'cga_install_2026_hostinger');
define('ENVIRONMENT', getenv('APP_ENV') ?: 'production');
define('ALLOWED_ORIGIN', getenv('ALLOWED_ORIGIN') ?: '*');

// 4. POLÍTICA DE SEGURIDAD CORS Y ENCABEZADOS HTTP
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
if (ALLOWED_ORIGIN === '*' || ALLOWED_ORIGIN === $origin) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: " . ALLOWED_ORIGIN);
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Token");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");
header("Referrer-Policy: strict-origin-when-cross-origin");

// Responder inmediatamente a peticiones preflight OPTIONS
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

header('Content-Type: application/json; charset=utf-8');

// 5. FUNCIONES AUXILIARES GLOBALES Y SEGURIDAD
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function checkAdminAuth($input = null) {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $token = '';
    
    // 1. Encabezados HTTP (incluyendo variaciones de mayúsculas/minúsculas de Apache)
    if (!empty($headers['X-Admin-Token'])) {
        $token = trim($headers['X-Admin-Token']);
    } elseif (!empty($headers['x-admin-token'])) {
        $token = trim($headers['x-admin-token']);
    } elseif (!empty($_SERVER['HTTP_X_ADMIN_TOKEN'])) {
        $token = trim($_SERVER['HTTP_X_ADMIN_TOKEN']);
    } elseif (!empty($headers['Authorization'])) {
        $auth = trim($headers['Authorization']);
        if (preg_match('/Bearer\s+(.*)$/i', $auth, $matches)) {
            $token = trim($matches[1]);
        }
    } elseif (!empty($headers['authorization'])) {
        $auth = trim($headers['authorization']);
        if (preg_match('/Bearer\s+(.*)$/i', $auth, $matches)) {
            $token = trim($matches[1]);
        }
    } elseif (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = trim($_SERVER['HTTP_AUTHORIZATION']);
        if (preg_match('/Bearer\s+(.*)$/i', $auth, $matches)) {
            $token = trim($matches[1]);
        }
    }
    
    // 2. Fallback de alta confiabilidad si el servidor web (Hostinger/Apache) purga cabeceras personalizadas
    if (empty($token) && is_array($input)) {
        if (!empty($input['token'])) {
            $token = trim($input['token']);
        } elseif (!empty($input['admin_token'])) {
            $token = trim($input['admin_token']);
        }
    }
    if (empty($token)) {
        if (!empty($_POST['token'])) {
            $token = trim($_POST['token']);
        } elseif (!empty($_POST['admin_token'])) {
            $token = trim($_POST['admin_token']);
        } elseif (!empty($_GET['token'])) {
            $token = trim($_GET['token']);
        }
    }
    
    if (empty($token)) {
        return false;
    }
    
    // 3. Validar contra la clave secreta maestra administrativa
    if ($token === ADMIN_SECRET_KEY) {
        return true;
    }
    
    // 4. Validar token activo de sesión en la tabla cga_admins de MySQL
    try {
        if (function_exists('getDb')) {
            $pdo = getDb();
            $stmt = $pdo->prepare("SELECT `id`, `username`, `role` FROM `cga_admins` WHERE `token` = :token AND `token` IS NOT NULL AND `token` != '' LIMIT 1");
            $stmt->execute([':token' => $token]);
            $admin = $stmt->fetch();
            if ($admin && !empty($admin['id'])) {
                return true;
            }
        }
    } catch (Exception $e) {
        // En caso de error de conexión en verificación silenciosa
    }

    return false;
}

