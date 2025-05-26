<?php
header("Access-Control-Allow-Origin: https://ideal-acorn-vj94vv9gr4pfwxvw-5173.app.github.dev");
header("Access-Control-Allow-Method: POST, GET, METHODS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if($_SERVER["REQUEST_MTHOD"] === "OPTIONS"){
    http_response_code(200);
    exit;
};

$data = json_decode(file_get_contents("php://input"), true);

if($data === null){
    http_response_code(400);
    echo json_encode(["error" => ["server","All input is required"]]);
    exit;
};

if(
    !isset($data['title']) ||
    !isset($data['description']) ||
    !isset($data['location']) ||
    !isset($data['reward']) ||
    !isset($data['notes'])
){
    http_response_code(400);
    echo json_encode(["error" => ["server","All input is required"]]);
    exit;
}

//unique errand number generator
function generateOrderId($prefix = 'ERD'){
    $timestamp = time(); //current time
    $randomPart = strtoupper(bin2hex(random_bytes(2)));
    return $prefix .'-' . $timestamp . '-' . $randomPart; 

}


$title = htmlspecialchars(trim($data['title']));
$description = htmlspecialchars(trim($data['description']));
$location = htmlspecialchars(trim($data['location']));
$reward = htmlspecialchars(trim($data['reward']));
$notes = htmlspecialchars(trim($data['notes']));
$date = date("d-m-y");
$time = time("h:i A");
$errandID = generateOrderId();

//file path
$file = "errands.json";

//load existing errands
$errands = [];
//let check if file exist
if(file_exists($file)){
    $json = file_get_contents($file);
    $errands = json_decode($json, true) ?? [];
}else{
    http_response_code(400);
    echo json_encode(["error" => ["server","Errand database cant be found"]]);
    exit;
};

//prepare to save data
$userErrands =[
    'errandId' => $errandID,
    "date" => $date,
    'time' => $time,
    'title' => $title,
    'description' => $description,
    'location' => $location,
    'reward' => $reward,
    'notes' => $notes
];

//append errand data
$errands = $userErrands;

//save to file
if(file_put_contents($file, json_encode($errands, JSON_PRETTY_PRINT))){
    http_response_code(200);
}else{
    http_response_code(500);
    echo json_encode(["errors" => ['server' =>"Failed to save data"]]);
    exit;
}







