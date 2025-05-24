<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
if (isset($_SESSION['user'])){
    echo json_encode([
        'loggedIn' => true,
        'user' => $_SESSION['user']
    ]);

}else{
    echo json_encode([
        'loggedIn' => false,
        'user' => null
    ]);
}
