<?php 
header("Access-control-Allow-Origin: *");
header("Acess-Control-Allow-Method: GET, POST, OPTIONS ");
header("Access-Control-Allow:Headers: content-type");
header("content-Type: application/json");

if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if($data === null){
    http_response_code(400);
    echo json_encode(["error" => ["server" => 'All input is required']]);
    exit;
}

if(!isset($data['name']) || 
!isset($data['username']) || 
!isset($data['email']) ||
!isset($data['password']) ||
!isset($data['confirmPassword'])
){
    http_response_code(400);
    echo json_encode(["error" => ["server" => "All input is required"]]);
    exit;
}

$name = htmlspecialchars(trim($data['name']));
$username = htmlspecialchars(trim($data['username']));
$email = htmlspecialchars(trim($data['email']));
$password = htmlspecialchars(trim($data['password']));
$confirmpassword = htmlspecialchars(trim($data['confirmPasword']));


if($password !== $confirmpassword){
    http_response_code(400);
    echo json_encode(["error" => ["confirmPassword" => "Password doenst match"]]);
}

//file path
$file = 'user.json';

//load existing data
$users = [];

// check if file exist
if(file_exists($file)){
    $json = file_get_contents($file);
    $users =json_decode($json, true) ?? [];
};

$errors = [];

foreach($users as $user){
    if($user['email'] === $email){
        $errors["email"] = "user already exist";
    }
    if($user['username'] === $username){
        $errors["username"] = "Username already exist";
    }
}

//if error is  found
if(!empty($errors)){
    http_response_code(409);
    echo json_encode(["errors" => $errors]);
    exit;
}

//prepare to save data
$userData =[
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
    echo json_encode(["error" => ['server' => "save data successfully"]]);
} else{
    http_response_code(500);
    echo json_encode(["error" => ['server' => "Failed to save data"]]);
};
