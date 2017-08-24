let anim = () => {
  setTimeout(() => {
    document.body.classList.add('appear');
  }, 0)
}
anim();

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
let buttons = document.querySelectorAll('.read');
Array.from(buttons).forEach(function (el, i, buttons) {
  el.addEventListener('click', function () {

    modal[i].classList.remove('none');
  })
})

let close = document.querySelectorAll('.close');
Array.from(close).forEach(function (el, i, close) {
  el.addEventListener('click', function () {
    //    let modal = document.querySelectorAll('.modal');
    modal[i].classList.add('none');
  })
})



window.onscroll = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log(scrollTop);
  let image = document.querySelector('.image img');
  let square = document.querySelectorAll('.releases .date')
  if (scrollTop > 390) {
    let div = document.querySelectorAll('.margin');
    for (let i = 0; i < div.length; i++) {
      div[i].style.opacity = '1';
    }
    let div1 = document.querySelector('.marginL');
    div1.style.marginRight = '50%';

    let div2 = document.querySelector('.marginR');
    div2.style.marginLeft = '50%';
  }
  if (scrollTop > 1800) {
    let listItem = document.querySelectorAll('.list li');
    for (let i = 0; i < listItem.length; i++) {
      setTimeout(() => {
        listItem[0].classList.add('rotate');
      }, 500)
      setTimeout(() => {
        listItem[1].classList.add('rotate');
      }, 1000)
      setTimeout(() => {
        listItem[2].classList.add('rotate');
      }, 1500)
      setTimeout(() => {
        listItem[3].classList.add('rotate');
      }, 2000)
    }
  }
  if (scrollTop > 3000) {
    image.style.transform = 'scale(1.1)'
  } else {
    image.style.transform = 'scale(1)'
  }
  
  if (scrollTop > 3900) {
    for (let j = 0; j < square.length; j++) {
      square[j].style.transform = 'rotate(2turn)'
    }
  }
}
