

document.getElementById("cambiar").addEventListener("click",cambiar);

function cambiar(){

    var xhr=new XMLHttpRequest();

    xhr.open("GET","http://ticosoftcr.website/WS_UCreativa/juegovida.php", true);
    xhr.send();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            document.getElementById("parrafoInfo").innerHTML = xhr.responseText;
            
            //no lo logro
            var objeto=xhr.responseText[7];
            
            console.log("...");
            console.info(objeto);
            console.log("...");
            console.info(xhr.responseText);
        }
    }
}