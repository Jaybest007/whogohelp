<?php 
session_start();
header("Access-Control-Allow-Origin: https://ideal-acorn-vj94vv9gr4pfwxvw-5173.app.github.dev");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if($data === null){
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON data"]);
    exit;
}

if(!isset($data['email']) || !isset($data['password'])){
    http_response_code(400);
    echo json_encode(["error" => "All input is required"]);
    exit;
}

$username = htmlspecialchars(strtolower(trim($data['email'])));
$password = $data['password'];

//let load json file
$userFile = 'user.json';


if(!file_exists($userFile)){
    http_response_code(500);
    echo json_encode(["error" => "User database cant be found"]);
    exit;
};

$users = json_decode(file_get_contents($userFile), true);

foreach($users as $user ){
    if($user["email"] === $username && password_verify($password, $user['password'])){
        // Set session with user info
        $_SESSION['USER'] = [
            'name' => $user['name'],
            'username' => $user['username'],
            'email' => $user['email']
        ];
        http_response_code(200);
        echo json_encode(["success" => "Login successful"]);
        exit;
    };
    if($user["email"] === $username && !password_verify($password, $user['password'])){
        http_response_code(400);
        echo json_encode(["error" => "Incorrect password"]);
        exit;
    }
};
http_response_code(400);
echo json_encode(["error" => "Incorrect username or password"]);
exit;