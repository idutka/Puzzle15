<?php
require '../library.php';

$id = $_GET['id']*1;
$sql = "UPDATE `themes_uses` SET `id_themes` = ".$id.";";
mysql_query($sql);

echo "Тему змінено";
