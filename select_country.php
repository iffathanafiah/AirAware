<?php
#Checkin availabilty POST data
if(!empty($_POST)){

    #Taking POST data
    $country=$_POST['Country'];
    
    switch($country){
        case "Malaysia";
        include("MalaysiaAQI.php");
        break;
    }
}
?>