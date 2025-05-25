<?php 
session_start();
header("Access-Control-Allow-Origin: https://ideal-acorn-vj94vv9gr4pfwxvw-5173.app.github.dev");
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
    echo json_encode(["errors" => ["server" => "All input is required"]]);
    exit;
}

if(
!isset($data['name']) || 
!isset($data['username']) || 
!isset($data['email']) ||
!isset($data['password']) ||
!isset($data['confirmPassword'])
){
    http_response_code(400);echo json_encode(["errors" => ["server" => "All input is required"]]);
    exit;
}

$name = htmlspecialchars(trim($data['name']));
$username = htmlspecialchars(trim($data['username']));
$email = htmlspecialchars(trim($data['email']));
$password = htmlspecialchars(trim($data['password']));
$confirmpassword = htmlspecialchars(trim($data['confirmPassword']));


if($password !== $confirmpassword){
    http_response_code(400);
    echo json_encode(["errors" => ["confirmPassword" => "Password doesn't match"]]);
    exit;
}

//file path
$file = 'users.json';

//load existing data
$users = [];

// check if file exist
if(file_exists($file)){
    $json = file_get_contents($file);
    $users =json_decode($json, true) ?? [];
}else{
    http_response_code(500);
    echo json_encode(["errors" => ["server" => "User database cant be found"]]);
    exit;
};

// At the top, define all error fields
$errors = [];

foreach($users as $user){
    if($user['email'] === $email){
        $errors["email"] = "Email already exists"; 
    }
    if($user['username'] === $username){
        $errors['username'] = "Username already exists";
    }
}

//if error is  found
if(!empty($errors)) { // if any error message is not empty
    http_response_code(409);
    echo json_encode(["errors" => $errors]);
    exit;
}

//prepare to save data
$userData = [
    "name" => $name,
    "username" => $username,
    "email" => $email,
    "password" => password_hash($password, PASSWORD_DEFAULT)
];

//APPEND NEW USER DATA
$users[] = $userData;

//save to file

if(file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT))){
    http_response_code(200);
    echo json_encode(["success" => "User successfully registered"]);
} else{
    http_response_code(500);
    echo json_encode(["errors" => ['server' => "Failed to save data"]]);
    exit;
};