function init(img){

    var canvas = document.getElementById('puzzle15');
        canvas.width  = 400;
        canvas.height = 400;
    var cellSize = canvas.width / 4;
    var context = canvas.getContext('2d');

        // context.fillStyle = '#222';
        // context.fillRect(0,0,canvas.width,canvas.height);

    var puzzle15 = new puzzle();
        puzzle15.setContext(context);
        puzzle15.setSize(cellSize);
        puzzle15.setImg(img);
        puzzle15.create();


    canvas.onmouseup = function(e) {
        var x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
        var y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
        puzzle15.click(x,y); 
    };

    var fon = document.getElementById('fonr');
    var hid = document.getElementById('s_hiden');
    fon.onclick = hid.onclick = function (){
        puzzle15.create();
        hiden();
    }
    var send = document.getElementById('s_send');
    send.onclick = function (){
        puzzle15.send();
        puzzle15.create();
        hiden();
    }
}

function puzzle () {

    var context;
    var size;
    var arr  = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
    var clicks = 0;
    var time = 0;
    var timer = null;
    var tm = null;
    var l = 0;
    var way = null; // up/down/left/right
    var images = new Object;

    function getNull() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (arr[j][i] === 0) {
                    return {"x":i,"y":j};
                }
            }
        }
    };

    this.setContext = function(c){
        context = c;
    }

    this.setSize = function(s){
        size = s;
    }

    this.setImg = function(img){
        images.img = img.img;
        if(images.img){
        for (var i = 1; i <= 15; i++) {
            images[i] = new Image();
            var _this = this; 
            images[i].onload = function() {
             _this.view();
            }
            images[i].src = img[i];
        };
        }

    }

    this.shuffle = function (n){
        arr  = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
        var x = xn = 3;
        var y = yn = 3;

        for (var i = 0; i < n; i++) {
            if(rand()==1){
                x = randmove(xn);
            }else{
                y = randmove(yn);
            }
            arr[yn][xn] = arr[y][x];
            arr[y][x] = 0;
            xn = x;
            yn = y;
        }
    } 

    function randmove (k) {
        k = k+rand();
            if(k<0){k=1};
            if(k>3){k=2};
        return k;
    }
    function rand () {
        return 1-2*Math.floor(Math.random()*2);
    }

    this.near = function (i,j) {
        var nullX = getNull().x;
        var nullY = getNull().y;
        way = null;  

        if(nullX==i){
            if (nullY==(j+1))
                way = 'down';
            if (nullY==(j-1))
                way = 'up';
        }

        if(nullY==j){
            if (nullX==(i+1))
                way = 'right';
            if (nullX==(i-1))
                way = 'left';
        }
        
    }

    this.viewclicks = function () {
        document.getElementById('click').innerHTML = clicks;
    }

    this.viewtime = function () {
        document.getElementById('time').innerHTML = (time/10).toFixed(1);  
    }

    this.timetik = function () {
        this.viewtime();
        time++;
    }


    this.create = function (){
        clicks = 0;
        time = 0;
        this.viewclicks();
        this.viewtime();
        this.shuffle(250);
        this.view();
    }

    this.view = function (){
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this.draw(size*j,size*i,arr[i][j]);
            };
        };
    }

    this.click = function (x,y) {
        if(l == 0){
        this.near(x,y)

        if (way != null) {
            
            this.drawmove(x,y);
            clicks++;
            this.viewclicks();

            if(time == 0){
                time = 1;
                var _this = this; 
                timer = setInterval(function() { _this.timetik() },100);
            }
        }
        }
    }

    this.victory = function(){
            clearInterval(timer);
            document.getElementById('fonr').style.display = 'block';
            document.getElementById('reg').style.display = 'block';
            document.getElementById('clicks_r').innerHTML = clicks;
            document.getElementById('time_r').innerHTML = (--time/10).toFixed(1); 
    }

    this.checkvictory = function() {
        var e = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (e[i][j] != arr[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };

    this.send = function() {

        xmlhttp = new ajax();

        // var d = new Date();
        // var t = d.getTime()
        var n = document.getElementById('name').value;
        var m = document.getElementById('mail').value;

        xmlhttp.onreadystatechange = (function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != 0) {
                document.getElementById('topuser').innerHTML = xmlhttp.responseText;
                
            } else {
                xmlhttp = null;
            }
        }
    });

    xmlhttp.open("GET", "save_result.php?name=" + n + "&mail=" + m + "&time=" + (time/10) + "&clicks=" + clicks, true);
    xmlhttp.send();
    }


    this.draw = function (x,y,n) {
        if(n != 0){

            if(images.img){
                context.drawImage(images[n],x,y);
            }else{
                var gradient = context.createLinearGradient(x,y,size+x,size+y);
                gradient.addColorStop(0, '#555'); 
                gradient.addColorStop(1, '#222');

                context.fillStyle = gradient;
                context.fillRect(x,y,size,size);

                context.strokeStyle = '#111';
                context.lineWidth = 2;
                context.strokeRect(x,y,size,size);

                context.fillStyle = '#88F';
                context.font = 'bold '+size/2+'px Arial';
                context.textBaseline = 'middle';
                context.textAlign = 'center';
                context.fillText (n, size/2+x,size/2+y);
            }
        }else{
            context.clearRect(x,y,size,size);
            if(images.img){
            context.strokeStyle = '#FFF';
            }else{
            context.strokeStyle = '#111';
            }
            // context.fillStyle = '#888';
            // context.fillRect(x,y,size,size);
            context.lineWidth = 2;
            context.strokeRect(x,y,size,size);
        }        
    }

    this.drawmove = function(i,j) {
        if(l == 0){
        var _this = this; 
        l = 1;
        tm = setInterval(function() { _this.moveplus(i,j) },20);
        }
    }

    this.moveplus = function(i,j) {
        var x = size*i;
        var y = size*j;

        this.draw(x,y,0);

        l+=size/8;
        if(l>=size){
            l = size;
            clearInterval(tm);
        }

        if(way=='up'){
            y -= l;
        }
        if(way=='down'){
            y += l;
        }
        if(way=='left'){
            x -= l;
        }
        if(way=='right'){
            x += l;
        }

        this.draw(x,y,arr[j][i]);

        if(l == size){
            l = 0;
            var nullX = getNull().x;
            var nullY = getNull().y;
            arr[nullY][nullX] = arr[j][i];
            arr[j][i] = 0;

            if (this.checkvictory()) {
                this.victory();
            }
        }


    }
}

function hiden() {
    document.getElementById('fonr').style.display = 'none';
    document.getElementById('reg').style.display = 'none';
}


function ajax() {
      var xmlhttplocal;
      try {
        xmlhttplocal= new ActiveXObject("Msxml2.XMLHTTP")
     } catch (e) {
      try {
        xmlhttplocal= new ActiveXObject("Microsoft.XMLHTTP")
      } catch (E) {
        xmlhttplocal=false;
      }
     }

    if (!xmlhttplocal && typeof XMLHttpRequest!='undefined') {
     try {
      var xmlhttplocal = new XMLHttpRequest();
     } catch (e) {
      var xmlhttplocal=false;
      alert('couldn\'t create xmlhttp object');
     }
    }
    return(xmlhttplocal);
    
}
