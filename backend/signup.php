<?php 
header("Access-Control-Allow-Origin: https://ideal-acorn-vj94vv9gr4pfwxvw-5173.app.github.dev");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include "db_connect.php";

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
    http_response_code(400);
    echo json_encode(["errors" => ["server" => "All input is required"]]);
    exit;
}

$name = htmlspecialchars(trim($data['name']));
$username = htmlspecialchars(trim($data['username']));
$email = htmlspecialchars(trim($data['email']));
$password = htmlspecialchars(trim($data['password']));
$confirmpassword = trim($data['confirmPassword']);

$errors = [];

if($password !== $confirmpassword){
    http_response_code(400);
    echo json_encode(["errors" => ["confirmPassword" => "Password doesn't match"]]);
    exit;
}

//check if username or email already exists
$sql = "SELECT * FROM users WHERE username = :username OR email = :email";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username, 'emal' => $email]);
$existingUser= $stmt->fetch();

if($existingUser){
    if($existingUser['username'] === $username){
        $errors['username'] = "username already exists";
    }
    if($existingUser['email'] === $email){
        $errors['email'] === "Email already exists";
    }
}

//if error is  found
if(!empty($errors)) { // if any error message is not empty
    http_response_code(409);
    echo json_encode(["errors" => $errors]);
    exit;
}

//HASH THE PASSWORD
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (full_name, username, email, password) VALUES (:name, :username, :email, :password)";
$stmt = $pdo->prepare($sql);

try{
    $stmt->execute([
        'name' => $name,
        'username' => $username,
        'email' => $email,
        'password' => $hashedPassword
    ]);
    http_response_code(201);
    echo json_encode(['success' => true]);
} catch (PDOException $e){
    http_response_code(500);
    echo json_encode(["errors" => ["server" => "Database error:" . $e->getMessage()]]);
}
