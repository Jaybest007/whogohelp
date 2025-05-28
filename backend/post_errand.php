<?php
session_start();
// Handle preflight (OPTIONS) request early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    http_response_code(200);
    exit();
}

// CORS and content headers for actual requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if(!isset($_SESSION['USER'])){
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => ["server" => "Login is required!!..Kindly login to post"]]);
    exit;
};
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if($data === null){
    http_response_code(400);
    echo json_encode(["error" => ["server" => "All input is required"]]);
    exit;
};

if(
    !isset($data['title']) ||
    !isset($data['description']) ||
    !isset($data['location']) ||
    !isset($data['reward']) 
){
    http_response_code(400);
    echo json_encode(["error" => ["server" => "All input is required"]]);
    exit;
}

//unique errand number generator
function generateOrderId($prefix = 'ERD'){
    $timestamp = time(); //current time
    $randomPart = strtoupper(bin2hex(random_bytes(2)));
    return $prefix .'-' . $timestamp . '-' . $randomPart; 
}

$date = date("d-m-y");
$time = date("h:i A"); // Fixed double semicolon
$errandID = generateOrderId();
$title = htmlspecialchars(trim($data['title']));
$description = htmlspecialchars(trim($data['description']));
$location = htmlspecialchars(trim($data['location']));
$reward = htmlspecialchars(trim($data['reward']));
$notes = htmlspecialchars(trim($data['notes']));
$createdBy = $_SESSION['USER']['username'];



//let send data to databse
$sql = "INSERT INTO errands (errand_Id, date, time, title, description, location, reward, notes, created_by) VALUES (:errandId, :date, :time, :title, :description, :location, :reward, :notes, :created_by)";
$stmt = $pdo->prepare($sql);

try{
    $stmt->execute([
        'errandId' => $errandID,
        'date' => $date,
        'time' => $time,
        'title' => $title,
        'description' => $description,
        'location' => $location,
        'reward' => $reward,
        'notes' => $notes,
        'created_by' => $createdBy
    ]);

    http_response_code(201);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["errors" => ["server" => "Database error: " . $e->getMessage()]]);
}









