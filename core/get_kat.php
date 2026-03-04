<?php
header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Paramètre id manquant']);
    exit;
}

$id = htmlspecialchars($_GET['id']);
$url = "https://www.codewars.com/api/v1/code-challenges/" . $id;

$response = @file_get_contents($url);

if ($response === false) {
    http_response_code(404);
    echo json_encode(['error' => 'Impossible de contacter Codewars']);
    exit;
}

echo $response;
?>