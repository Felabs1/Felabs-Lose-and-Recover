<?php

if(isset($_GET['cookies'])){
    // echo "connected";
    echo json_encode($_COOKIE);
}

require('../felabs_PHP/crud.php');
header('Content-Type: application/json; charset=UTF-8');

$crud = new Crud("localhost", "root", "", "item_recovery");

if(isset($_POST['staffData'])){
    $obj = json_decode($_POST['staffData']);
    $pass_hash = password_hash($obj->password, PASSWORD_DEFAULT);
    $insert = $crud->insert_data("staff", ["staff_name" => $obj->staffName, "username" => $obj->userName, "password" => $pass_hash]);
    if($insert){
        echo "success";
    }else{
        echo $crud->conn->error;
    }
}

if(isset($_GET['staffdata'])){
    $myrow = $crud->fetch_data("SELECT * FROM staff");
    echo json_encode($myrow);
}




?>