let t,btn=document.querySelector(".scroll"),up=()=>(Math.max(document.body.scrollTop,document.documentElement.scrollTop)>0?(window.scrollBy(0,-100),t=setTimeout("up()",20)):clearTimeout(t),!1);btn.onclick=up;let modal=document.querySelectorAll(".modal");var buttons=document.querySelectorAll(".read");Array.from(buttons).forEach(function(o,e,t){o.addEventListener("click",function(){modal[e].classList.remove("none")})});var close=document.querySelectorAll(".close");Array.from(close).forEach(function(o,e,t){o.addEventListener("click",function(){modal[e].classList.add("none")})});