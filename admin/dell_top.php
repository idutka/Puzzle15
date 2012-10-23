<?php
require '../library.php';

$id = $_GET['id']*1;
$sql = "DELETE FROM `top` WHERE `id` = ".$id.";";
mysql_query($sql);

echo "Рейтингова таблиця змінена";