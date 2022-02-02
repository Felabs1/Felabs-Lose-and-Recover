<?php

if(isset($_GET['cookies'])){
    // echo "connected";
    echo json_encode($_COOKIE);
}

require('../felabs_PHP/crud.php');
header('Content-Type: application/json; charset=UTF-8');
// $obj = json_decode($_POST['logindata'], false);
// echo $_POST['registerdata'];
// extract($obj);

// print_r($obj->username);
// print_r($obj->password);

$crud = new Crud("localhost", "root", "", "item_recovery");

if(isset($_POST['registerdata'])) {
    $obj = json_decode($_POST['registerdata']);
    $exist = $crud->fetch_data("SELECT * FROM students WHERE admission_no = '".$obj->admission."'");
    if(count($exist) < 1){
        $pass_hash = password_hash($obj->password, PASSWORD_DEFAULT);
        $insert = $crud->insert_data("students", ["student_name" => $obj->fullName, "admission_no" => $obj->admission, "password" => $pass_hash]);
        if($insert){
            echo "success";
        }else{
            echo $crud->conn->error;
        }
    }else{
        echo "admission_exist";



    }
}

if(isset($_POST['logindata'])){
    $obj = json_decode($_POST['logindata']);
    $exist = $crud->fetch_data("SELECT * FROM students WHERE admission_no = '".$obj->username."'");
    if(count($exist) > 0){
        foreach($exist as $row){
            if(password_verify($obj->password, $row['password'])){
                setcookie("username", $row['admission_no']);
                setcookie("student_name", $row['student_name']);
                echo "LOGIN_SUCCESS";
                echo $_COOKIE['username'];
                // setcookie("username", $row['admission_no']);
            }else{
                echo "INCORRECT_PASSWORD";
            }
        }
    }else{
        echo "UNREGISTERED_USER";
    }

}

?>