<?php
header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID manquant']);
    exit;
}

$id = htmlspecialchars($_GET['id']);
$url = "https://www.codewars.com/api/v1/code-challenges/" . $id;

$response = @file_get_contents($url);

if ($response === FALSE) {
    http_response_code(404);
    echo json_encode(['error' => 'Impossible de contacter Codewars']);
} else {
    echo $response; 
}
?>