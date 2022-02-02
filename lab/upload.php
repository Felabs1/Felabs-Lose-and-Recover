<?php

// header('Content-Type: application/json; charset=UTF-8');


/* Get the name of the uploaded file */
$filename = $_FILES['file']['name'];

/* Choose where to save the uploaded file */
$location = "upload/".$filename;
// $array = explode(",", $location);

/* Save the uploaded file to the local filesystem */
if ( move_uploaded_file($_FILES['file']['tmp_name'], $location) ) { 
  echo $location; 
  // echo json_encode($return);
} else { 
  echo 'Failure'; 
}

?>