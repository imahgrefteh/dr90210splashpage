<?php
$errorMSG = "";
// EMAIL
if (empty($_POST["emailsign"])) {
    $errorMSG .= "Email is required ";
} else {
    $emailsign = $_POST["emailsign"];
}

$EmailTo = "youremail@domain.com";
$Subject = "New Email SignUp From Nixo";
// prepare email body text
$Body = "";
$Body .= "Email: ";
$Body .= $emailsign;
$Body .= "\n";
// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$emailsign);
// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
?>