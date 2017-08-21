! function (t) {
  var e = {
    init: function (n) {
      return this.each(function () {
        var n = t.extend({
          menu: t(this)
        }, n);
        t(document).on("scroll.changeActiveNav", {
          myOptions: n
        }, e.scroll), t("a").on("click.changeActiveNav", {
          myOptions: n
        }, e.click)
      })
    },
    destroy: function () {
      return this.each(function () {
        t(document).off(".changeActiveNav")
      })
    },
    scroll: function (e) {
      var n = e.data.myOptions.menu,
        o = t(document).scrollTop();
      n.find("a").each(function () {
        var e = t(this).attr("href"),
          i = t(e);
        i.position().top <= o && i.position().top + i.outerHeight() > o ? (n.find("a.active").removeClass("active"), t(this).addClass("active")) : t(this).removeClass("active")
      })
    },
    click: function (n) {
      n.preventDefault();
      var o = n.data.myOptions.menu;
      t(document).off("scroll.changeActiveNav"), o.find("a.active").removeClass("active"), t(this).addClass("active");
      var i = t(this).attr("href"),
        a = t(i);
      t("html, body").animate({
        scrollTop: a.offset().top
      }, 1000, function () {
        window.location.hash = i, t(document).on("scroll.changeActiveNav", {
          myOptions: n.data.myOptions
        }, e.scroll)
      })
    }
  };
  t.fn.changeActiveNav = function (n) {
    return e[n] ? e[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery.changeActiveNav") : e.init.apply(this, arguments)
  }
}(jQuery);
