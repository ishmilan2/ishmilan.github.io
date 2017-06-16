window.addEventListener("load",function(){
    document.addEventListener("scroll",function() {
        document.getElementById("scroll-top").style.display = "block";
    });
    document.getElementById("scroll-top").addEventListener("click",function myFunction() {
        setTimeout(function() {document.getElementById("scroll-top").style.display = "none";},200);
    });
});
