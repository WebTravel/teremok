;(function() {


  $('document').ready(function() {
    
    $(document).foundation();

    var w = window.innerWidth ? window.innerWidth : $(window).width(),
        smallWidth = 640,
        speed = 250;


    //Скрипты для десктопной версии
    function desktop() {
      if(w > 1023) {
        $('.menu > li > ul > li > ul > li').each(function() {
          if($(this).find('ul').length > 0) {
            $(this).find('a').addClass('parent');
          }
        });
      }
    }
    desktop(); 


    //Скрипты для мобильной версии
    function mobile() {
      if(w < smallWidth) {
        $('.footer__menu--title').on('click', function(){
          $(this).toggleClass('active').next().slideToggle(speed);
        });
      }
    }
    mobile();

    //Мобильное меню
    $('.menu__wrapper').mobileMenu();

    //Слайдер
    $('.slider').slick({
      speed: 300,
      dots: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: true
          }
        }
      ]
    });

    //Слайдер брендов
    $('.brandSlider__list').slick({
      dots: true,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });

    $('#product__panel2, #product__panel1').slick({
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });


  });

}());