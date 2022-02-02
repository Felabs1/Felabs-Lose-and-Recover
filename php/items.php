<?php
if(isset($_GET['cookies'])){
    // echo "connected";
    echo json_encode($_COOKIE);
}

require('../felabs_PHP/crud.php');
header('Content-Type: application/json; charset=UTF-8');

$crud = new Crud("localhost", "root", "", "item_recovery");

if(isset($_POST['lostItemData'])){
    $obj = json_decode($_POST['lostItemData']);
    // print_r($obj);
    if($_COOKIE['username'] !== $obj->admission){
        echo "insensitive";
    }else{
        $insert = $crud->insert_data("lost_items", ["admission" => $obj->admission, "id_no" => $obj->idNumber, "item_name" => $obj->itemName, "location" => $obj->location, "date_realised" => $obj->dateRealised, "description" => $obj->description]);
        if($insert){
            $update = $crud->update_data("students", ["id_no" => $obj->idNumber], ["admission_no" => $obj->admission]);
            if($update){
                echo "success";
            }
        }
    }
}

?>