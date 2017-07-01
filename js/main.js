window.addEventListener("load",function(){
/*BUTTON SHOW NAV OPTIONS MOBILE*/
if(document.querySelector("#option-toggle")) document.querySelector("#option-toggle").addEventListener("click",function(){
    var so=document.querySelector('.site-options')
    if(so.style.display!="block")so.style.display="block";
    else so.style.display="";
})
/*BORDER CURRENT NAVIGATION*/
var thisPage=document.querySelector('.menunav a[href="'+location.pathname+'"');
if(thisPage){
    thisPage.style.borderBottom ="solid 3px #FF4D09";
    thisPage.setAttribute("class","disabled");
}
var tLinks=document.querySelectorAll(".translate nav a");
if(tLinks){
    if(location.pathname.substr(0,4)=="/en/"){
        tLinks[1].style.borderTop ="solid 3px #FF4D09";
        tLinks[1].setAttribute("class","disabled");
    }else{
        tLinks[0].style.borderTop ="solid 3px #FF4D09";
        tLinks[0].setAttribute("class","disabled");
    }
}
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
