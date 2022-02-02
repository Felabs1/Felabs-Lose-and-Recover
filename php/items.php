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

if(isset($_GET['imageUpload'])){
    $filename = $_FILES['file']['name'];
    $location = "../images/uploads/".$filename;
    if ( move_uploaded_file($_FILES['file']['tmp_name'], $location) ) { 
    echo $location; 
    } else { 
        echo "";
    }
}

if(isset($_POST['recoveredItemData'])){
    $obj = json_decode($_POST['recoveredItemData']);
    $insert = $crud->insert_data("recovered_items", ["item_name" => $obj->recoveredItem, "recoverer_name" => $obj->recovererName, "item_state" => $obj->stateOfItem, "image" => $obj->data, "recoverer_id_no"=> $obj->recovererIdNo, "location_recovered" => $obj->location]);
    if($insert){
        echo "success";
    }else{
        echo $crud->conn->error;
    }

}

if(isset($_GET['totalUsers'])){
    $myrow = $crud->fetch_data("SELECT * FROM students");
    echo count($myrow);
}

if(isset($_GET['lostItems'])){
    $myrow = $crud->fetch_data("SELECT * FROM lost_items");
    echo count($myrow);
}

if(isset($_GET['recoveredItems'])){
    $myrow = $crud->fetch_data("SELECT * FROM recovered_items");
    echo count($myrow);
}




?>