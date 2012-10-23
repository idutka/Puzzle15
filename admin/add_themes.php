<?php
require '../library.php';

$title = addslashes($_POST['title']);
$img = json_decode($_POST['img']);

$a = '';

$sql = "INSERT INTO `themes_name` (`id`, `theme_name`) VALUES (NULL, '".$title."');\n";
mysql_query($sql);
foreach ($img as $key => $value) {
	$sql = "INSERT INTO `themes` (`id`, `id_themes`, `numer`, `img`) VALUES (NULL, (SELECT `id` FROM `themes_name` WHERE `theme_name`= '".$title."'), '".($key+1)."', '".$value."');\n";
	mysql_query($sql);
}

echo "Тему додано";
