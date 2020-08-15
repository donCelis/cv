/*
 * Author: Alexander Celis (donCelis)
 * Template Name: vCard
 * Version: 1.0.3
*/

$(document).ready(function () {

  'use strict';

  /*-----------------------------------------------------------------
    Detect device mobile
  -------------------------------------------------------------------*/

  let isMobile = false;
  if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('touch');
    isMobile = true;
  }
  else {
    $('html').addClass('no-touch');
    isMobile = false;
  }


  /*-----------------------------------------------------------------
    Loaded
  -------------------------------------------------------------------*/

  anime({
    targets: 'body',
    opacity: 1,
    delay: 400,
    complete: function (anim) {
      progressBar(); //Init progress bar
    }
  });

  $('body, .js-img-load').imagesLoaded({ background: !0 }).always(function (instance) {
    preloader(); //Init preloader
  });

  function preloader() {
    let tl = anime.timeline({});
    tl
      .add({
        targets: '.preloader',
        duration: 1,
        opacity: 1
      })
      .add({
        targets: '.circle-pulse',
        duration: 300,
        //delay: 500,
        opacity: 1,
        zIndex: '-1',
        easing: 'easeInOutQuart'
      }, '+=500')
      .add({
        targets: '.preloader__progress span',
        duration: 500,
        width: '100%',
        easing: 'easeInOutQuart'
      }, '-=500')
      .add({
        targets: '.preloader',
        duration: 500,
        opacity: 0,
        zIndex: '-1',
        easing: 'easeInOutQuart'
      });
  };


  /*-----------------------------------------------------------------
    Hamburger
  -------------------------------------------------------------------*/

  $('.hamburger').on('click', function (e) {
    $(this).toggleClass('is-active');
    $('.inner-menu').toggleClass('is-active');
    $('body').toggleClass('open-menu');
  });


  /*-----------------------------------------------------------------
    Nav
  -------------------------------------------------------------------*/

  let sideNavOpen = $('.hamburger');
  let sideNavTl = anime.timeline({ autoplay: false });

  if (window.matchMedia("(max-width: 580px)").matches) {
    $('.js-menu').each(function (i) {
      sideNavTl
        .add({
          targets: '.nav',
          duration: 1000,
          width: ['0', '100%'],
          opacity: [0, 1],
          easing: 'easeInOutBack'
        })
        .add({
          targets: '.nav__item',
          duration: 200,
          delay: anime.stagger(50),
          opacity: [0, 1],
          translateX: [70, 0],
          easing: 'easeInOutBack'
        }, '-=500');
    });
  } else {
    $('.js-menu').each(function (i) {
      sideNavTl
        .add({
          targets: '.nav',
          duration: 1000,
          width: ['0', '100%'],
          easing: 'easeInOutBack'
        })
        .add({
          targets: '.nav__item',
          duration: 200,
          delay: anime.stagger(50),
          opacity: [0, 1],
          translateX: [70, 0],
          easing: 'easeInOutBack'
        }, '-=500');
    });
  }

  $(sideNavOpen).on('click', function (e) {
    e.preventDefault();
    if (sideNavTl.began) {
      sideNavTl.reverse()
      sideNavTl.completed = false;
    }
    if (sideNavTl.paused) {
      sideNavTl.play()
    }
  });


  /*-----------------------------------------------------------------
    Carousel
  -------------------------------------------------------------------*/

  // Testimonials
  $('.js-carousel-review').each(function () {
    let carousel = new Swiper('.js-carousel-review', {
      slidesPerView: 2,
      spaceBetween: 30,
      speed: 300,
      grabCursor: true,
      watchOverflow: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        580: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        991: {
          slidesPerView: 1
        }
      }
    });
  });

  // Clients
  $('.js-carousel-clients').each(function () {
    let carousel = new Swiper('.js-carousel-clients', {
      slidesPerView: 4,
      spaceBetween: 30,
      //loop: true,
      grabCursor: true,
      watchOverflow: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        580: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        991: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  });


  /*-----------------------------------------------------------------
    Sticky sidebar
  -------------------------------------------------------------------*/

  function activeStickyKit() {
    $('.sticky-column').stick_in_parent({
      parent: '.sticky-parent'
    });

    // bootstrap col position
    $('.sticky-column')
      .on('sticky_kit:bottom', function (e) {
        $(this).parent().css('position', 'static');
      })
      .on('sticky_kit:unbottom', function (e) {
        $(this).parent().css('position', 'relative');
      });
  };
  activeStickyKit();

  function detachStickyKit() {
    $('.sticky-column').trigger("sticky_kit:detach");
  };

  //  stop sticky kit
  //  based on your window width

  let screen = 1200;

  let windowHeight, windowWidth;
  windowWidth = $(window).width();
  if ((windowWidth < screen)) {
    detachStickyKit();
  } else {
    activeStickyKit();
  }

  // windowSize
  // window resize
  function windowSize() {
    windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
    windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
  }
  windowSize();

  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this, args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  $(window).resize(debounce(function () {
    windowSize();
    $(document.body).trigger("sticky_kit:recalc");
    if (windowWidth < screen) {
      detachStickyKit();
    } else {
      activeStickyKit();
    }
  }, 250));


  /*-----------------------------------------------------------------
    Progress bar
  -------------------------------------------------------------------*/

  function progressBar() {
    $('.progress').each(function () {
      let ctrl = new ScrollMagic.Controller();
      new ScrollMagic.Scene({
        triggerElement: '.progress',
        triggerHook: 'onEnter',
        duration: 300
      })
        .addTo(ctrl)
        .on("enter", function (e) {
          let progressBar = $('.progress-bar');
          progressBar.each(function (indx) {
            $(this).css({ 'width': $(this).attr('aria-valuenow') + '%', 'z-index': '2' });
          });
        });
    });
  }


  /*-----------------------------------------------------------------
    Scroll indicator
  -------------------------------------------------------------------*/

  function scrollIndicator() {
    $(window).on('scroll', function () {
      let wintop = $(window).scrollTop(), docheight =
        $(document).height(), winheight = $(window).height();
      let scrolled = (wintop / (docheight - winheight)) * 100;
      $('.scroll-line').css('width', (scrolled + '%'));
    });
  }

  scrollIndicator(); //Init


  /*-----------------------------------------------------------------
    ScrollTo
  -------------------------------------------------------------------*/

  function scrollToTop() {
    let $backToTop = $('.back-to-top'),
      $showBackTotop = $(window).height();

    $backToTop.hide();


    $(window).scroll(function () {
      let windowScrollTop = $(window).scrollTop();
      if (windowScrollTop > $showBackTotop) {
        $backToTop.fadeIn();
      } else {
        $backToTop.fadeOut();
      }
    });

    $backToTop.on('click', function (e) {
      e.preventDefault();
      $(' body, html ').animate({ scrollTop: 0 }, 'slow');
    });
  }

  scrollToTop(); //Init


  /*-----------------------------------------------------------------
    Style background image
  -------------------------------------------------------------------*/

  $('.js-image').each(function () {
    let dataImage = $(this).attr('data-image');
    $(this).css('background-image', 'url(' + dataImage + ')');
  });


  /*-----------------------------------------------------------------
    Autoresize textarea
  -------------------------------------------------------------------*/

  $('textarea').each(function () {
    autosize(this);
  });


  /*-----------------------------------------------------------------
  Tabs
  -------------------------------------------------------------------*/

  $('.js-tabs').each(function () {
    $('.content .tabcontent').hide();
    $('.content .tabcontent:first').show();
    $('.nav .nav__item a').on('click', function () {
      $('.nav .nav__item a').removeClass('active');
      $(this).addClass('active');
      let currentTab = $(this).attr('href');
      $('.content .tabcontent').hide();
      $(currentTab).show();
      $portfolioMasonry.isotope({
        columnWidth: '.gallery-grid__item',
        gutter: '.gutter-sizer',
        isAnimated: true
      });
      $('.js-scroll').getNiceScroll().resize()
      return false;
    });

    // Mobile close menu
    let screenMobile = 580;

    windowWidth = $(window).width();
    if ((windowWidth < screenMobile)) {
      $('.nav .nav__item a').on('click', function (e) {
        e.preventDefault();
        $('.hamburger').removeClass('is-active');
        $('.inner-menu').removeClass('is-active');
        $('body').removeClass('open-menu');

        if (sideNavTl.began) {
          sideNavTl.reverse()
          sideNavTl.completed = false;
        }
        if (sideNavTl.paused) {
          sideNavTl.play()
        }
      });
    } else {

    }
  });


  /*-----------------------------------------------------------------
    Tooltip
  -------------------------------------------------------------------*/

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });


  /*-----------------------------------------------------------------
    Switch categories & Filter mobile
  -------------------------------------------------------------------*/

  $('.select').on('click', '.placeholder', function () {
    let parent = $(this).closest('.select');
    if (!parent.hasClass('is-open')) {
      parent.addClass('is-open');
      $('.select.is-open').not(parent).removeClass('is-open');
    } else {
      parent.removeClass('is-open');
    }
  }).on('click', 'ul>li', function () {
    let parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.placeholder').text($(this).text());
    parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));

    $('.filter__item').removeClass('active');
    $(this).addClass('active');
    let selector = $(this).attr('data-filter');

    $('.js-filter-container').isotope({
      filter: selector
    });
    return false;
  });


  /*-----------------------------------------------------------------
    Masonry
  -------------------------------------------------------------------*/

  // Portfolio
  let $portfolioMasonry = $('.js-masonry').isotope({
    itemSelector: '.gallery-grid__item',
    layoutMode: 'fitRows',
    percentPosition: true,
    transitionDuration: '0.5s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    },
    fitRows: {
      gutter: '.gutter-sizer'
    },
    masonry: {
      columnWidth: '.gallery-grid__item',
      gutter: '.gutter-sizer',
      isAnimated: true
    }
  });

  $portfolioMasonry.imagesLoaded().progress(function () {
    $portfolioMasonry.isotope({
      columnWidth: '.gallery-grid__item',
      gutter: '.gutter-sizer',
      isAnimated: true,
      layoutMode: 'fitRows',
      fitRows: {
        gutter: '.gutter-sizer'
      }
    });
  });


  /*-----------------------------------------------------------------
    niceScroll
  -------------------------------------------------------------------*/

  $('textarea').niceScroll({
    horizrailenabled: false
  });


  /*-----------------------------------------------------------------
    emoji add in textarea
  -------------------------------------------------------------------*/

  $(function () {
    $('.emoji-wrap img').on('click', function () {
      let emoji = $(this).attr('title');
      $('#commentForm').val($('#commentForm').val() + " " + emoji + " ");
    });
  });


  /*-----------------------------------------------------------------
  mediumZoom
  -------------------------------------------------------------------*/

  mediumZoom('[data-zoom]', {
    margin: 30
  });


  /*-----------------------------------------------------------------
    Lazyload
  -------------------------------------------------------------------*/

  lazySizes.init();


  /*-----------------------------------------------------------------
    Polyfill object-fit
  -------------------------------------------------------------------*/

  let $someImages = $('img.cover');
  objectFitImages($someImages);


  /*-----------------------------------------------------------------
    Contacts form
  -------------------------------------------------------------------*/

  $("#contact-form").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
      formError();
      submitMSG(false, "Please fill in the form...");
    } else {
      event.preventDefault();
      submitForm();
    }
  });

  function submitForm() {
    let name = $("#nameContact").val(),
      email = $("#emailContact").val(),
      message = $("#messageContact").val();

    let url = "assets/php/form-contact.php";

    $.ajax({
      type: "POST",
      url: url,
      data: "name=" + name + "&email=" + email + "&message=" + message,
      success: function (text) {
        if (text == "success") {
          formSuccess();
        } else {
          formError();
          submitMSG(false, text);
        }
      }
    });
  }

  function formSuccess() {
    $("#contact-form")[0].reset();
    submitMSG(true, "Thanks! Your message has been sent.");
  }

  function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function submitMSG(valid, msg) {
    let msgClasses;
    if (valid) {
      msgClasses = "validation-success";
    } else {
      msgClasses = "validation-danger";
    }
    $("#validator-contact").removeClass().addClass(msgClasses).text(msg);
  }
});