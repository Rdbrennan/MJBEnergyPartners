<?php
$email = $_POST['email'];
$fp = fopen("mydata.txt", "a");
$savestring = "\r\n" . $email;
fwrite($fp, $savestring);
fclose($fp);
// echo "<h1>Congrats You're In! Thanks for joining</h1>";
header('Location: /home');
?>