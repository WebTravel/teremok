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

    //touch-events for slider
    $('.ui-slider-handle ').draggable();

    //Инициализация слайдера
    function uiSlider() {
      jQuery("#slider").slider({
        min: 0,
        max: 1000,
        values: [0,1000],
        range: true,
        stop: function(event, ui) {
          jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
          jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
          
          },
          slide: function(event, ui){
          jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
          jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
          }
      });

      jQuery("input#minCost").change(function(){
        var value1=jQuery("input#minCost").val();
        var value2=jQuery("input#maxCost").val();
          if(parseInt(value1) > parseInt(value2)){
          value1 = value2;
          jQuery("input#minCost").val(value1);
        }
        jQuery("#slider").slider("values",0,value1);	
      });

        
      jQuery("input#maxCost").change(function(){
          
        var value1=jQuery("input#minCost").val();
        var value2=jQuery("input#maxCost").val();

        if(parseInt(value1) > parseInt(value2)){
          value2 = value1;
          jQuery("input#maxCost").val(value2);
        }
        jQuery("#slider").slider("values",1,value2);
      });

      // фильтрация ввода в поля
      jQuery('input').keypress(function(event){
        var key, keyChar;
        if(!event) var event = window.event;
        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;
        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key); 
        if(!/\d/.test(keyChar))	return false;
      });
    };
    uiSlider();

    //Раскрытие второго уровня меню в сайдбаре
    $('.leftMenu > ul > li > a').on('click', 'span', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass('active').closest('a').next('ul').slideToggle(speed);
    });

    //Раскрытие тела одной категории фильтра
    $('.filter__name').on('click', function() {
      $(this).toggleClass('no-active').next('.filter__body').slideToggle(speed);
    });

    //Скрываем часть фильтров при загрузке
    function filterItemHidden() {
      var count = 2;
      $('.filter').find(function() {
        if($(this).find('.filter__item').length > count) {
          $(this).find('.filter__item').eq(count - 1).nextAll().find('.filter__name').addClass('no-active').next('.filter__body').css({'display':'none'});
        }
      });
    };
    filterItemHidden()

    //Разворачивание инпутов в фильтре
    function filterCompany() {
      var count = 3,
          selector = '<div class="company__wrap" />',
          switchSel = $('.filter__toggle'),
          switchSelText = switchSel.text(),
          switchSelNewText = '- Свернуть';
      $('.filter__company').find(function() {
        if($(this).find('.filter__company--item').length > count) {
          $(this).find('.filter__company--item').eq(count - 1).nextAll().wrapAll(selector);
        }
      });
      switchSel.on('click', function() {
        $('.company__wrap').slideToggle(speed);
        if($(this).text() == switchSelNewText) {
          $(this).text(switchSelText);
        } else {
          $(this).text(switchSelNewText);
        }
      });
    };

    filterCompany();

  });

}());