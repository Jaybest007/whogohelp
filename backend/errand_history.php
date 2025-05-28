<?php 
session_start();
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//connect my database
include 'db_connect.php';

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit;
}

//check if user session is set
if(!isset($_SESSION['USER'])){
    http_response_code(401);
    echo json_encode((["error" => "User is not logged in"]));
    exit;
};

$postedBy = $_SESSION['USER']['username'];

try {
    $sql = "SELECT * FROM `errands` WHERE `posted_by` = :posted_by";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['posted_by' => $postedBy]);
    $errands = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($errands && count($errands) > 0) {
        http_response_code(200);
        echo json_encode($errands);
        exit;
    } else {
        http_response_code(404);
        echo json_encode(["error" => "No Errand History yet"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database query failed", "details" => $e->getMessage()]);
    exit;
}
