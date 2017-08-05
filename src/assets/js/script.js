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
        $('.footer__menu--title').off().on('click', function(){
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

    //Слайдер товаров
    $('#product__panel2, #product__panel1').slick({
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            vertical: true,
            arrows: false
          }
        }
      ]
    });
    //Слайдер карточки товара
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav',
      responsive: [
        {
          breakpoint: 640,
          settings: {
            dots: true
          }
        }
      ]
    });
    $('.slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      focusOnSelect: true,
      vertical: true,
      focusOnSelect: true
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
      jQuery('input#maxCost, input#minCost').keypress(function(event){
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
    $('.leftMenu > ul > li > a').off().on('click', 'span', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass('active').closest('a').next('ul').slideToggle(speed);
    });

    //Раскрытие тела одной категории фильтра
    $('.filter__name').off().on('click', function() {
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

    $('.filter__switch').off().on('click', function() {
      $(this).next('.filter').slideToggle(speed);
    });

    $('.info__category--item').off().on('click', function() {
      $(this).closest('.info__category').find('.mainButtons').removeClass('mainButtons');
      $(this).addClass('mainButtons');
    });

  });

  //Изменяем количество в карточке товара
  function quantity() {
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max'),
        price = $(this).closest('.cardWrap').find('.priceCount'),
        priceVal = price.text(),
        fullPrice = 0;

        priceVal = priceVal.replace(' ','');
        function calcPrice() {
            $('.order__wrap').find('.priceCount').each(function() {
            var i = $(this).text(),
                iVal = i.replace(' ','');
            fullPrice = fullPrice + +iVal;
          });
        }

        calcPrice();

      if($(this).closest('.order__wrap').length > 0) {
        var sel = $(this).closest('.order__wrap').find('#finishPrice');
        sel.text(fullPrice);
      }

      btnUp.click(function() {
        var oldValue = parseFloat(input.val()),
            newPriceVal;
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
        newPriceVal =  newVal * priceVal;
        price.text(newPriceVal);
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val()),
            newPriceVal;
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
        newPriceVal =  newVal * priceVal;
        price.text(newPriceVal);
      });

    });
  }
  quantity();

  function tabsInAccord() {
	var w = window.innerWidth ? window.innerWidth : $(window).width(), //ширина экрана
			widthVal = 1024, //ширина, меньше которой табы становятся аккордионами
			speed = 250, //скорость раскрытия аккордионов
			tab = $('.tab__item > span.active'); //отдельная вкладка
	
	
	//Высчитываем высоту контейнера
		function calcHeight() {
			var tabHeight = 0;
			$('.tab__item > span.active').next('.tab__content').each(function(){
				if ($(this).innerHeight() > tabHeight ) {
					 tabHeight = $(this).innerHeight()
				 }
			});
			$('.tab').height(tabHeight);
		}
	
	function tabsSwitch() {
		$('.tab__item').off().on('click', 'span', function() {
			$(this).closest('.tab').find($('.tab__item')).find('.tab__content').removeAttr("style");
			$(this).addClass('active').next('.tab__content').show().closest('.tab').find($('.tab__item > span.active').not($(this))).removeClass('active');
			calcHeight();
		});
	}
	
	function accordOpen() {
		$('.tab').removeAttr("style");
		$('.tab__item').off().on('click', 'span', function() {
				$(this).toggleClass('active').next('.tab__content').slideToggle(speed);
			});
	}
	
	if (w < widthVal) {
		if(tab.length > 0) {
			tab.closest('.tab').find($('.tab__item > span').not(tab).next('.tab__content')).css({'display':'none'});
			tab.next('.tab__content').slideDown(speed);
		}
		accordOpen();
  } else {
      if(tab.length === 0 || tab.length > 1) {
        tab.removeClass('active').next('.tab__content').css({'display':'block'});
          $('.tab__item:first > span').addClass('active');
        } else {
          $('.tab').find('.tab__content').css({'display':'block'});
        }
        calcHeight();
        tabsSwitch();	
      }
    } 

  tabsInAccord();

  $(window).resize(function () {
    tabsInAccord();
  });

  //Удаление товара из корзины при нажатии на крест
  $('.product__del').off().on('click', function() {
    $(this).closest('.result__item').detach();
  });

  //Навигация по табам в корзине
  $('.order__next').off().on('click', function(e) {
    e.preventDefault();
    var attr = $(this).attr('href');
    $('.tabs-panel').each(function() {
      $(this).removeClass('is-active');
      var str = '#' + $(this).attr('id');
      if(str == attr) {
        $(this).addClass('is-active');
      }
    });

    $('.tabs-title').each(function() {
      $(this).removeClass('is-active');
      $(this).find('a').attr('aria-selected', false);
      if($(this).find('a').attr('href') == attr) {
        $(this).addClass('is-active');
        $(this).find('a').attr('aria-selected', true);
      }
    });
  });

  //Удаление товара из сравнения
  $('.product__delete').on('click', function() {
    $(this).closest('.product__item').remove();
  });

  //Forms
  $(function() {

    $(".js-formShow").click(function(e) {
            e.preventDefault();
            var elementClick = $(this).attr("href");
            showForm(elementClick);
        });

        function showForm(elementClick) {
            $(elementClick+" .callback-bgrd").show("slow");
            var main_h = $(window).height();
            var h = $(" .callback-form").height();
            if (main_h > h) {
                $(elementClick+" .callback-form").css("margin-top", (-(h / 2)) + "px");
            } else {
                $(elementClick+" .callback-form").css("margin-top", 0).css("top", 0);
            }
            $(elementClick+" .callback-form").show("slow");
        };


    $(".callback-bgrd, .callback-form .x").click(function(){
      $(".callback-bgrd").hide("slow");
      $(".callback-form").hide("slow");
    });

    allResize();

  });

  function allResize() {
    var main_h = $(window).height();
    var h = $(".callback-form").height();
    if (main_h > h) {
      $(".callback-form").css("margin-top", (-(h/2)) + "px");
    }
  }

  $(window).resize(function () {
    allResize();
  });

  window.addEventListener( 'orientationchange', function () {
    allResize();
  }, false );

}());