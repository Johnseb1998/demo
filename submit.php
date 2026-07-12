<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = preg_replace("/[^a-zA-Z0-9]/", "_", $_POST['name']);
    $target_dir = "uploads/";
    
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $file_name = basename($_FILES["cv"]["name"]);
    $target_file = $target_dir . $name . "_" . $file_name;
    
    if (move_uploaded_file($_FILES["cv"]["tmp_name"], $target_file)) {
        echo "<h3>Application successful, " . htmlspecialchars($_POST['name']) . ".</h3>";
        echo "<a href='index.html'>Go Home</a>";
    } else {
        echo "Error uploading CV file.";
    }
}
?>