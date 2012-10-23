<?php require 'library.php';?>
<html>
    <head>
        <meta http-equiv="Cache-control" content="no-cache">
        <meta charset="utf-8">
        <title>П'ятнашки</title>
        <script type="text/javascript" src="puzzle.js"></script>
        <link rel="STYLESHEET" href="style.css" type="text/css">
    </head>
    <body>
    <div class="main">
        <div class="nambers">
            <div class="f-r">Ходів:<span id='click'>0</span></div>
            <div class="f-l">Час:<span id='time'>0.0</span>сек.</div>
        </div>
    	<div class="canva">
       		<canvas id="puzzle15">Прийшов час щось змінити у Вашому житті!!!</canvas>
   		</div>
        <div class="records">
            <h2>Рекорди</h2>
    <table width="100%" cellspacing="0" >
    <thead>
        <tr>
            <th>№</th>
            <th style="width: 100%;">Нік</th>
            <th>Час</th>
            <th>Ходи</th>
        </tr>
    </thead>
    <tbody id="topuser">
        
<?php
    viewTop();
?>
        
    </tbody>
    </table>
        </div>
    </div>
    <div id="reg">
        <div>
        Ви склали пятнашки зробивши <b id="clicks_r">0</b> ходів за <b id="time_r">0</b> сек.<br />
        Щоб увійти в історію<br />
        заповніть поля нижче.<br /><br />
        <form name="myform" onsubmit="return false;" method="get" action="save_result.php">
            Ваш нік*:<br><input type="text" value="" name="name" id="name"> <br>
            Email:<br><input type="text" value="" name="mail" id="mail"> <br><br>
            <input type="submit" value="Зберегти" id="s_send" name="submit" class="f-l button">
            <input type="submit" value="Скасувати" id="s_hiden" name="submit" class="f-r button">
        </form>
        </div>
    </div>
    <div id="fonr"></div>
    <script>         
        var imgData = new Object;
        imgData = <?php getImg(); ?>
        
        window.onload = function()  {
            init(imgData);
        }
    </script>
    </body>
</html>