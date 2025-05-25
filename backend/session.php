<?php
session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true,
]);
session_start();
header("Access-Control-Allow-Origin: https://ideal-acorn-vj94vv9gr4pfwxvw-5173.app.github.dev");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
if (isset($_SESSION['USER'])){
    echo json_encode([
        'loggedIn' => true,
        'user' => $_SESSION['USER']
    ]);

}else{
    echo json_encode([
        'loggedIn' => false,
        'user' => null
    ]);
}