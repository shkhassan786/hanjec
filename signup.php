<?php
include 'database.php';
$email = $_POST['email'];
$password = $_POST['password'];
$sql = "INSERT INTO users (email,password) VALUES ('$email','$password')";
if(mysqli_query($conn,$sql)){echo "Signup successful";} 
else {echo "Error: ".mysqli_error($conn);}
?>
