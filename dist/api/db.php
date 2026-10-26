<?php
/**
 * ==============================================================================
 * CONSEJO GLOBAL AMBIENTAL (CGA) — GESTOR DE CONEXIÓN PDO A MYSQL
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

function getDb() {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET . " COLLATE utf8mb4_unicode_ci",
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        $errorMsg = ENVIRONMENT === 'development'
            ? 'Error de conexión a la base de datos MySQL: ' . $e->getMessage()
            : 'No fue posible conectar con la base de datos en Hostinger. Verifica las credenciales en api/config.php.';
            
        jsonResponse([
            'success' => false,
            'error'   => $errorMsg,
            'code'    => 'DB_CONNECTION_ERROR',
            'hint'    => 'Asegúrate de haber creado la base de datos en Hostinger hPanel y correr https://tudominio.com/api/setup.php'
        ], 500);
    }
}
