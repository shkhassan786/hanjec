<?php
<?php
// Dev only: show errors (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow CORS for testing (restrict in production)
header('Access-Control-Allow-Origin: *');
header('Vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // preflight
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No image uploaded or upload error', 'file_info' => $_FILES['image'] ?? null]);
    exit;
}

// size limit (5 MB)
$maxBytes = 5 * 1024 * 1024;
if ($_FILES['image']['size'] > $maxBytes) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large (max 5MB)']);
    exit;
}

// mime check
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime  = $finfo->file($_FILES['image']['tmp_name']);
$allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
if (!array_key_exists($mime, $allowed)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type', 'detected' => $mime]);
    exit;
}

// create uploads directory
$uploadsDirName = 'uploads';
$uploadsDir = __DIR__ . DIRECTORY_SEPARATOR . $uploadsDirName;
if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create uploads directory']);
    exit;
}

// save file
$originalName = pathinfo($_FILES['image']['name'], PATHINFO_FILENAME);
$safeBase = preg_replace('/[^A-Za-z0-9_-]/', '_', $originalName);
$ext = $allowed[$mime];
$safeName = time() . '_' . ($safeBase ?: 'product') . '.' . $ext;
$targetPath = $uploadsDir . DIRECTORY_SEPARATOR . $safeName;

if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
    exit;
}

// build accessible URL (works with php -S or typical web server)
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
$imageUrl = $scheme . '://' . $host . $scriptDir . '/' . $uploadsDirName . '/' . $safeName;

// Local stub response (replace with OpenAI call if you implement and set OPENAI_API_KEY)
$title = ucwords(str_replace(['_', '-'], ' ', $safeBase)) . ' — AI Suggestion';
$description = "Auto-generated description for uploaded image '{$safeName}'. Replace with real AI when configured.";
$price = number_format(rand(5000,150000)/100, 2, '.', '');
$warranty = '6 months manufacturer warranty';
$offer = rand(5,30) . '% off';

echo json_encode([
    'title' => $title,
    'description' => $description,
    'price' => $price,
    'warranty' => $warranty,
    'offer' => $offer,
    'image_url' => $imageUrl
]);
exit;