<?php
if(isset($_GET['cookies'])){
    // echo "connected";
    echo json_encode($_COOKIE);
}

require('../felabs_PHP/crud.php');
header('Content-Type: application/json; charset=UTF-8');

$crud = new Crud("localhost", "root", "", "item_recovery");

if(isset($_GET['allrecovery'])){
    $fetch = $crud->fetch_data("SELECT * FROM recovered_items");
    echo json_encode($fetch);
}

if(isset($_GET['alllost'])){
    $fetch = $crud->fetch_data("SELECT * FROM lost_items");
    echo json_encode($fetch);
}

if(isset($_GET['recoveryrequest'])){
    $fetch = $crud->fetch_data("SELECT * FROM recovery_request");
    echo json_encode($fetch);
}

?>