<?php
require 'library.php';

$name = htmlspecialchars(addslashes(trim($_GET['name'])));
$mail = htmlspecialchars(addslashes(trim($_GET['mail'])));
$time = $_GET['time']*1;
$clicks = $_GET['clicks']*1;

$sql = 'INSERT INTO `top` (`name`, `email`, `time`, `clicks`) 
		VALUES (\''.$name.'\', \''.$mail.'\', \''.$time.'\', \''.$clicks.'\');';
mysql_query($sql);

viewTop();
