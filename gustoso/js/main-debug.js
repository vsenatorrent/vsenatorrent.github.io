$(function () {
  $("#slider").slider({
    direction: 0, // 0=horizontal, 1=vertical
    size: 2, // how many items in one slide
    prev: "#prev", // prev button selector
    next: "#next", // next button selector
    prev_disable_class: "prev-disabled",
    next_disable_class: "next-disabled",
    pager: "#pager", // pager selector
    pager_event: 'click', // defaults tomouseover
    easing: 'easeOutBounce', // easing options
    mousewheel: true, // mouse wheel support
    drag: true, // drag and touch device support
    speed: 800, // slide speed
    autoplay: false, // autoplay on load
    interval: 5000,
    prev_callback: function (page) {
    },
    next_callback: function (page) {
    }
  });
});

  $(".rate").raty({
    starOff: '../img/star-off.png',
    starOn: '../img/star-on.png',
    score: 4
  });

  if($(window).width() < 767) {
    $('.sandwich .wrap .right').insertBefore('.sandwich .wrap .left')
    $('.footer .logo a').html('G')
  }

  
  $('.divider').click(() => {
    $('.navbar .list').slideToggle();
  })