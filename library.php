<?php

$db = mysql_connect('localhost','puzzle_root','password') or die('Немає з\'єднання з БД!!!');
mysql_select_db('puzzle',$db) or die('Не підключена БД!!!');
mysql_query("SET NAMES utf8");


function getTop()
{
		$result = mysql_query('SELECT `id`, `name`, `time`, `clicks`
                                FROM `top` 
                                ORDER BY time 
                                LIMIT 10;');
        $t = array();
        while ($myrow = mysql_fetch_array($result)){
            $t[] = array($myrow['name'], $myrow['time'], $myrow['clicks'], $myrow['id']);
        }

        return $t;
}

function viewTop()
{
	$top = getTop();
    $i = 1;
    foreach ($top as $v) {
            echo "<tr>
                    <td>".$i++."</td>
                    <td style=\"text-align: left;\">".$v['0']."</td>
                    <td>".sprintf("%.1f", $v['1'])."</td> 
                    <td>".$v['2']."</td>
                </tr>";
         //number_format( $myrow['time'], 1, '.', '' )
    }
}

function viewTopForAdmin()
{
    $top = getTop();
    $i = 1;
    foreach ($top as $v) {
            echo "<tr>
                    <td>".$i++."</td>
                    <td style=\"text-align: left;\">".$v['0']."</td>
                    <td>".sprintf("%.1f", $v['1'])."</td> 
                    <td>".$v['2']."</td>
                    <td><input type='button' value='X' title='видалити' onclick='dell(".$v['3'].")'/></td>
                </tr>";
    }
}

function getImg()
{
    $sql = "SELECT numer,img FROM `themes` WHERE `id_themes` = (SELECT id_themes FROM themes_uses);";
    $result = mysql_query($sql);

    $ar = array();
    while ($myrow = mysql_fetch_array($result)){
        $ar[$myrow['numer']] = $myrow['img'];
    }

    if(empty($ar)){
        echo  "imgData.img = false;";
    }else{
        $a = str_replace('\\', '', json_encode($ar));
        $a = str_replace(' ', '+', $a);
        echo $a; 
        echo  "\n"."imgData.img = true;";
    }

}