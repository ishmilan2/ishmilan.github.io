window.addEventListener("load",function(){
/*BORDER BOTTOM ACTUAL NAVIGATION*/
document.querySelector('nav a[href="'+location.pathname+'"').style.borderBottom ="solid 3px #FF4D09"
/*SCROLL TOP*/
var btn = document.createElement("a");
btn.id="scroll-top";
btn.href="#start";
var t= document.createTextNode("➤");
btn.appendChild(t);
document.body.appendChild(btn);
document.addEventListener("scroll",function(){document.getElementById("scroll-top").style.bottom = "30px";});
document.getElementById("scroll-top").addEventListener("click",function myFunction(){setTimeout(function(){document.getElementById("scroll-top").style.bottom="-80px";},200);});
/*SHOW CONTACT FOOTER*/
if(document.getElementById("contact")){
document.getElementById("contact").addEventListener("click",function(e){
e.preventDefault();
var f=document.getElementById("footer");
if(f.style.bottom!="0px")f.style.bottom="0px";
else f.style.bottom="-80px";});
}
});
