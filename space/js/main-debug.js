let t;
let btn = document.querySelector('.scroll');

let up = () => {

  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -100);
    t = setTimeout('up()', 20);
  } else clearTimeout(t);
  return false;
}

btn.onclick = up;


    let modal = document.querySelectorAll('.modal');
var buttons = document.querySelectorAll('.read');
Array.from(buttons).forEach(function(el,i,buttons){
  el.addEventListener('click', function(){

    modal[i].classList.remove('none');
  })
})

var close = document.querySelectorAll('.close');
Array.from(close).forEach(function(el,i,close){
  el.addEventListener('click', function(){
//    let modal = document.querySelectorAll('.modal');
    modal[i].classList.add('none');
  })
})