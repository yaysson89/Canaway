(function ($) {
  "use strict";

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  $(".input-group.date").datepicker({ format: "dd.mm.yyyy" });

  $(".filters ul li").click(function () {
    $(".filters ul li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: true,
    masonry: {
      columnWidth: ".all",
    },
  });

  $(".Modern-Slider").slick({
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    dots: true,
    pauseOnDotsHover: true,
    cssEase: "linear",
    // fade:true,
    draggable: false,
    prevArrow: '<button class="PrevArrow"></button>',
    nextArrow: '<button class="NextArrow"></button>',
  });

  $(".search-icon a").on("click", function (event) {
    event.preventDefault();
    $("#search").addClass("open");
    $('#search > form > input[type="search"]').focus();
  });

  $("#search, #search button.close").on("click keyup", function (event) {
    if (
      event.target == this ||
      event.target.className == "close" ||
      event.keyCode == 27
    ) {
      $(this).removeClass("open");
    }
  });

  $("#search-box").submit(function (event) {
    event.preventDefault();
    return false;
  });

  $(function () {
    $("#tabs").tabs();
  });

  $(".owl-menu-item").owlCarousel({
    items: 5,
    loop: true,
    dots: true,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  });

  // Window Resize Mobile Menu Fix
  mobileNav();

  // Scroll animation init
  window.sr = new scrollReveal();

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Menu elevator animation
  $(".scroll-to-section a[href*=\\#]:not([href=\\#])").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $(".scroll-to-section a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 79,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".nav ul li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  // Page loading animation
  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $("#preloader").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });

  // Window Resize Mobile Menu Fix
  $(window).on("resize", function () {
    mobileNav();
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $(".submenu").on("click", function () {
      if (width < 767) {
        $(".submenu ul").removeClass("active");
        $(this).find("ul").toggleClass("active");
      }
    });
  }
  

  
  function zoomout() {
    var div = document.getElementById('s-block');
    var scale = 1 - window.pageYOffset / 5000; // Cambia el divisor para ajustar la velocidad de reducción de escala
    div.style.transform = 'scale(' + scale + ')';
  };


  //function onVisible(element, callback) {
  //  new IntersectionObserver((entries, observer) => {
  //    entries.forEach(entry => {
  //      if(entry.intersectionRatio > 0) {
  //        callback(element);
  //        observer.disconnect();
  //      }
  //    });
  //  }).observe(element);
  //}
//
  //onVisible(document.querySelector('#reservation'), () => window.addEventListener('scroll', zoomout));

  

})(window.jQuery);

/* Slider (work in progress)
 * 03/09/2015 by Andrew Errico
 */
$(function () {
  // slider type
  $t = "slide"; // opitions are fade and slide

  //variables
  ($f = 1000), // fade in/out speed
    ($s = 1000), // slide transition speed (for sliding carousel)
    ($d = 10000); // duration per slide

  $n = $(".slide").length; //number of slides
  $w = $(".slide").width(); // slide width
  $c = $(".slide-container").width(); // container width
  $ss = $n * $w; // slideshow width

  function timer() {
    $(".timer").animate({ width: $w }, $d);
    $(".timer").animate({ width: 0 }, 0);
  }

  // fading function
  function fadeInOut() {
    timer();
    $i = 0;
    var setCSS = {
      position: "absolute",
      top: "0",
      left: "0"
    };

    $(".slide").css(setCSS);

    //show first item
    $(".slide").eq($i).show();

    setInterval(function () {
      timer();
      $(".slide").eq($i).fadeOut($f);
      if ($i == $n - 1) {
        $i = 0;
      } else {
        $i++;
      }
      $(".slide")
        .eq($i)
        .fadeIn($f, function () {
          $(".timer").css({ width: "0" });
        });
    }, $d);
  }

  function slide() {
    timer();
    var setSlideCSS = {
      float: "left",
      display: "inline-block",
      width: $c
    };
    var setSlideShowCSS = {
      width: $ss // set width of slideshow container
    };
    $(".slide").css(setSlideCSS);
    $(".slideshow").css(setSlideShowCSS);

    setInterval(function () {
      timer();
      $(".slideshow").animate({ left: -$w }, $s, function () {
        // to create infinite loop
        $(".slideshow").css("left", 0).append($(".slide:first"));
      });
    }, $d);
  }

  if ($t == "fade") {
    fadeInOut();
  }
  if ($t == "slide") {
    slide();
  } else {
  }
});
