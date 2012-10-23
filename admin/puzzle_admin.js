function change_thems(f) {
        	xmlhttp = new ajax();

        var id = f.themes.value;

        xmlhttp.onreadystatechange = (function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != 0) {
                alert(xmlhttp.responseText);
                
            } else {
                xmlhttp = null;
            }
        }
    });

    xmlhttp.open("GET", "update_themes.php?id=" + id, true);
    xmlhttp.send();
        }


      function add_thems(f){
        xmlhttp = new ajax();
        

        var img = document.getElementsByName('i[]');
        var images = new Array();
        for (i = 0; i < img.length; i++) {
          images[i]=img[i].value;
        }

        xmlhttp.onreadystatechange = (function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != 0) {
                alert(xmlhttp.responseText);
                
            } else {
                xmlhttp = null;
            }
        }
    });
          
    xmlhttp.open("POST", "add_themes.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xmlhttp.send("title="+f.title.value+"&img="+JSON.stringify(images));
          }

          function dell(id) {
        xmlhttp = new ajax();


        xmlhttp.onreadystatechange = (function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != 0) {
                alert(xmlhttp.responseText);
                
            } else {
                xmlhttp = null;
            }
        }
    });

    xmlhttp.open("GET", "dell_top.php?id=" + id, true);
    xmlhttp.send();
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