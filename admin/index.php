<?php
require_once '../library.php';

$result = mysql_query("SELECT id,theme_name FROM themes_name ORDER BY theme_name");
while ($myrow = mysql_fetch_array($result)) {
  $select[$myrow['id']] = $myrow['theme_name'];
};
?>

<html>
    <head>
        <meta http-equiv="Cache-control" content="no-cache">
        <meta charset="utf-8">
        <title>П'ятнашки</title>
        <script type="text/javascript" src="puzzle_admin.js"></script>
      <link rel="STYLESHEET" href="../style.css" type="text/css">
    </head>
    <body style="width:450px;margin:0 auto;">
      <div class="main_admin">
Змінити стиль.
<form action="update_thems.php" method="get" onSubmit="change_thems(this);return false">
	<select id='themes' name="themes">
		<?php 
		foreach($select as $index => $val){
			echo  "<option value=" . $index . ">" . $val . "</option>";
		}
		?>
	</select>
	<input type="submit" value="Зберегти"/>
</form>

  <div class="addthemes">
    Додати нову тему
  <form action="add_themes.php" method="POST" onSubmit="add_thems(this);return false">
    назва:<input type="text" value="" name="title"/><br />
    1: <input type="text" value="" name="i[]"/><br />
    2: <input type="text" value="" name="i[]"/><br />
    3: <input type="text" value="" name="i[]"/><br />
    4: <input type="text" value="" name="i[]"/><br />
    5: <input type="text" value="" name="i[]"/><br />
    6: <input type="text" value="" name="i[]"/><br />
    7: <input type="text" value="" name="i[]"/><br />
    8: <input type="text" value="" name="i[]"/><br />
    9: <input type="text" value="" name="i[]"/><br />
    10:<input type="text" value="" name="i[]"/><br />
    11:<input type="text" value="" name="i[]"/><br />
    12:<input type="text" value="" name="i[]"/><br />
    13:<input type="text" value="" name="i[]"/><br />
    14:<input type="text" value="" name="i[]"/><br />
    15:<input type="text" value="" name="i[]"/><br />
    0: <input type="text" value="" name="i[]"/><br />
  <input type="submit" value="Додати" style="float:right"/>
</form>
  </div>
<br />
  <div style="width:400px;">
    <h2>Редагувати TOP</h2>
      <table width="100%" cellspacing="0" >
    <thead>
        <tr>
            <th>№</th>
            <th style="width: 100%;">Нік</th>
            <th>Час</th>
            <th>Ходи</th>
            <th>х</th>
        </tr>
    </thead>
    <tbody id="topuser">
    <?php viewTopForAdmin();?>
       </tbody>
    </table>
  </div>
</div>
    </body>
</html>