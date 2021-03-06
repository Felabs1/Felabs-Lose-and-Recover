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

if(isset($_POST['requestRecoveredData'])){
    $obj = json_decode($_POST['requestRecoveredData']);
    $insert = $crud->insert_data('recovery_request',['claimnant_name' => $obj->claimnantName, 'claimnant_id_no' => $obj->claimnantIdNo, 'claimnant_admission' => $obj->admissionNumber, 'claimnant_phone' => $obj->phoneNumber, 'recovered_item_id' => $obj->c]);
    if($insert){
        echo "success";
    }else{
        echo $crud->conn->error;
    }
}

if(isset($_POST['confirmReclaimed'])){
    $obj = json_decode($_POST['confirmReclaimed']);
    $fetch = count($crud->fetch_data("SELECT * FROM confirmed_recovery WHERE item_id = '".$obj->id."'"));
    if(fetch > 0){
        echo "item_out";
    }else{
        $insert = $crud->insert_data("confirmed_recovery", ["admission_number" => $obj->admission, "owner_name" => $obj->owner, "contact" => $obj->contact, "item_id" => $obj->id]);
        if($insert){
            // echo "success";
            $update = $crud->update_data("recovered_items", ["issued_out" => "yes"], ["id" => $obj->id]);
            if($update){
                echo "success";
            }else{
                echo $crud->conn->error;
            }
        }
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

if(isset($_GET['allRecoveredItems'])){
    $myrow = $crud->fetch_data("SELECT * FROM recovered_items WHERE issued_out = 'no'");
    echo json_encode($myrow);
}

if(isset($_GET['allLostItems'])){
    $myrow = $crud->fetch_data("SELECT * FROM lost_items");
    echo json_encode($myrow);
}

if(isset($_GET['countReclaimedItems'])){
    $myrow = $crud->fetch_data("SELECT * FROM recovered_items WHERE issued_out = 'yes'");
    echo count($myrow);
}

if(isset($_GET['reclaimRequests'])){
    $myrow = $crud->fetch_data("SELECT * FROM recovery_request");
    echo json_encode($myrow);
}

if(isset($_GET['reclaimedItems'])){
    $myrow = $crud->fetch_data("SELECT * FROM confirmed_recovery");
    echo json_encode($myrow);
}






?>