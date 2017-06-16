window.addEventListener("load",function(){
    var btn = document.createElement("a");
    btn.id="scroll-top";
    btn.href="#start";
    var t= document.createTextNode("➜");
    btn.appendChild(t);
    document.body.appendChild(btn);
    document.addEventListener("scroll",function() {
        document.getElementById("scroll-top").style.display = "block";
    });
    document.getElementById("scroll-top").addEventListener("click",function myFunction() {
        setTimeout(function() {document.getElementById("scroll-top").style.display = "none";},200);
    });
});
