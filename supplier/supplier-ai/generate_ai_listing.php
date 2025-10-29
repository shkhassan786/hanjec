<?php
// Dev only: show errors (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow CORS for testing (restrict in production)
header('Access-Control-Allow-Origin: *');
header('Vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // handle preflight
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

// only allow POST for this endpoint
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed', 'method' => $_SERVER['REQUEST_METHOD']]);
    exit;
}

// Accept either multipart/form-data file upload or JSON payload
if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    // file upload handling
    $file = $_FILES['image'];
    $maxBytes = 5 * 1024 * 1024;
    if ($file['size'] > $maxBytes) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large (max 5MB)']);
        exit;
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime  = $finfo->file($file['tmp_name']);
    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
    if (!array_key_exists($mime, $allowed)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type', 'detected' => $mime]);
        exit;
    }

    $uploadsDirName = 'uploads';
    $uploadsDir = __DIR__ . DIRECTORY_SEPARATOR . $uploadsDirName;
    if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create uploads directory']);
        exit;
    }

    $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
    $safeBase = preg_replace('/[^A-Za-z0-9_-]/', '_', $originalName);
    $ext = $allowed[$mime];
    $safeName = time() . '_' . ($safeBase ?: 'product') . '.' . $ext;
    $targetPath = $uploadsDir . DIRECTORY_SEPARATOR . $safeName;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save uploaded file']);
        exit;
    }

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    $imageUrl = $scheme . '://' . $host . $scriptDir . '/' . $uploadsDirName . '/' . $safeName;

    // stub AI response
    $title = ucwords(str_replace(['_', '-'], ' ', $safeBase)) . ' — AI Suggestion';
    $description = "Auto-generated description for uploaded image '{$safeName}'. Replace with real AI when configured.";
    $price = number_format(rand(5000,150000)/100, 2, '.', '');
    $warranty = '6 months manufacturer warranty';
    $offer = rand(5,30) . '% off';

    echo json_encode([
        'ok' => true,
        'title' => $title,
        'description' => $description,
        'price' => $price,
        'warranty' => $warranty,
        'offer' => $offer,
        'image_url' => $imageUrl
    ]);
    exit;
}

// If no file, try JSON body (optional)
$body = file_get_contents('php://input');
if ($body) {
    $data = json_decode($body, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        // return a simple JSON echo for tests
        echo json_encode(['ok' => true, 'received' => $data]);
        exit;
    }
}

http_response_code(400);
echo json_encode(['error' => 'No image uploaded and invalid request']);
exit;
?>