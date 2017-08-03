'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;(function () {

  $('document').ready(function () {

    $(document).foundation();

    var w = window.innerWidth ? window.innerWidth : $(window).width(),
        smallWidth = 640,
        speed = 250;

    //Скрипты для десктопной версии
    function desktop() {
      if (w > 1023) {
        $('.menu > li > ul > li > ul > li').each(function () {
          if ($(this).find('ul').length > 0) {
            $(this).find('a').addClass('parent');
          }
        });
      }
    }
    desktop();

    //Скрипты для мобильной версии
    function mobile() {
      if (w < smallWidth) {
        $('.footer__menu--title').off().on('click', function () {
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
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }]
    });

    //Слайдер брендов
    $('.brandSlider__list').slick({
      dots: true,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }]
    });

    //Слайдер товаров
    $('#product__panel2, #product__panel1').slick({
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          vertical: true,
          arrows: false
        }
      }]
    });
    //Слайдер карточки товара
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav',
      responsive: [{
        breakpoint: 640,
        settings: {
          dots: true
        }
      }]
    });
    $('.slider-nav').slick(_defineProperty({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      focusOnSelect: true,
      vertical: true
    }, 'focusOnSelect', true));

    //touch-events for slider
    $('.ui-slider-handle ').draggable();

    //Инициализация слайдера
    function uiSlider() {
      jQuery("#slider").slider({
        min: 0,
        max: 1000,
        values: [0, 1000],
        range: true,
        stop: function stop(event, ui) {
          jQuery("input#minCost").val(jQuery("#slider").slider("values", 0));
          jQuery("input#maxCost").val(jQuery("#slider").slider("values", 1));
        },
        slide: function slide(event, ui) {
          jQuery("input#minCost").val(jQuery("#slider").slider("values", 0));
          jQuery("input#maxCost").val(jQuery("#slider").slider("values", 1));
        }
      });

      jQuery("input#minCost").change(function () {
        var value1 = jQuery("input#minCost").val();
        var value2 = jQuery("input#maxCost").val();
        if (parseInt(value1) > parseInt(value2)) {
          value1 = value2;
          jQuery("input#minCost").val(value1);
        }
        jQuery("#slider").slider("values", 0, value1);
      });

      jQuery("input#maxCost").change(function () {

        var value1 = jQuery("input#minCost").val();
        var value2 = jQuery("input#maxCost").val();

        if (parseInt(value1) > parseInt(value2)) {
          value2 = value1;
          jQuery("input#maxCost").val(value2);
        }
        jQuery("#slider").slider("values", 1, value2);
      });

      // фильтрация ввода в поля
      jQuery('input#maxCost, input#minCost').keypress(function (event) {
        var key, keyChar;
        if (!event) var event = window.event;
        if (event.keyCode) key = event.keyCode;else if (event.which) key = event.which;
        if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
        keyChar = String.fromCharCode(key);
        if (!/\d/.test(keyChar)) return false;
      });
    };
    uiSlider();

    //Раскрытие второго уровня меню в сайдбаре
    $('.leftMenu > ul > li > a').off().on('click', 'span', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass('active').closest('a').next('ul').slideToggle(speed);
    });

    //Раскрытие тела одной категории фильтра
    $('.filter__name').off().on('click', function () {
      $(this).toggleClass('no-active').next('.filter__body').slideToggle(speed);
    });

    //Скрываем часть фильтров при загрузке
    function filterItemHidden() {
      var count = 2;
      $('.filter').find(function () {
        if ($(this).find('.filter__item').length > count) {
          $(this).find('.filter__item').eq(count - 1).nextAll().find('.filter__name').addClass('no-active').next('.filter__body').css({ 'display': 'none' });
        }
      });
    };
    filterItemHidden

    //Разворачивание инпутов в фильтре
    ();function filterCompany() {
      var count = 3,
          selector = '<div class="company__wrap" />',
          switchSel = $('.filter__toggle'),
          switchSelText = switchSel.text(),
          switchSelNewText = '- Свернуть';
      $('.filter__company').find(function () {
        if ($(this).find('.filter__company--item').length > count) {
          $(this).find('.filter__company--item').eq(count - 1).nextAll().wrapAll(selector);
        }
      });
      switchSel.on('click', function () {
        $('.company__wrap').slideToggle(speed);
        if ($(this).text() == switchSelNewText) {
          $(this).text(switchSelText);
        } else {
          $(this).text(switchSelNewText);
        }
      });
    };

    filterCompany();

    $('.filter__switch').off().on('click', function () {
      $(this).next('.filter').slideToggle(speed);
    });

    $('.info__category--item').off().on('click', function () {
      $(this).closest('.info__category').find('.mainButtons').removeClass('mainButtons');
      $(this).addClass('mainButtons');
    });
  });

  //Изменяем количество в карточке товара
  function quantity() {
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"></div><div class="quantity-button quantity-down"></div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function () {
      var spinner = jQuery(this),
          input = spinner.find('input[type="number"]'),
          btnUp = spinner.find('.quantity-up'),
          btnDown = spinner.find('.quantity-down'),
          min = input.attr('min'),
          max = input.attr('max'),
          price = $(this).closest('.cardWrap').find('.priceCount'),
          priceVal = price.text(),
          fullPrice = 0;

      priceVal = priceVal.replace(' ', '');
      function calcPrice() {
        $('.order__wrap').find('.priceCount').each(function () {
          var i = $(this).text(),
              iVal = i.replace(' ', '');
          fullPrice = fullPrice + +iVal;
        });
      }

      calcPrice();

      if ($(this).closest('.order__wrap').length > 0) {
        var sel = $(this).closest('.order__wrap').find('#finishPrice');
        sel.text(fullPrice);
      }

      btnUp.click(function () {
        var oldValue = parseFloat(input.val()),
            newPriceVal;
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
        newPriceVal = newVal * priceVal;
        price.text(newPriceVal);
      });

      btnDown.click(function () {
        var oldValue = parseFloat(input.val()),
            newPriceVal;
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
        newPriceVal = newVal * priceVal;
        price.text(newPriceVal);
      });
    });
  }
  quantity();

  function tabsInAccord() {
    var w = window.innerWidth ? window.innerWidth : $(window).width(),
        //ширина экрана
    widthVal = 1024,
        //ширина, меньше которой табы становятся аккордионами
    speed = 250,
        //скорость раскрытия аккордионов
    tab = $('.tab__item > span.active'); //отдельная вкладка


    //Высчитываем высоту контейнера
    function calcHeight() {
      var tabHeight = 0;
      $('.tab__item > span.active').next('.tab__content').each(function () {
        if ($(this).innerHeight() > tabHeight) {
          tabHeight = $(this).innerHeight();
        }
      });
      $('.tab').height(tabHeight);
    }

    function tabsSwitch() {
      $('.tab__item').off().on('click', 'span', function () {
        $(this).closest('.tab').find($('.tab__item')).find('.tab__content').removeAttr("style");
        $(this).addClass('active').next('.tab__content').show().closest('.tab').find($('.tab__item > span.active').not($(this))).removeClass('active');
        calcHeight();
      });
    }

    function accordOpen() {
      $('.tab').removeAttr("style");
      $('.tab__item').off().on('click', 'span', function () {
        $(this).toggleClass('active').next('.tab__content').slideToggle(speed);
      });
    }

    if (w < widthVal) {
      if (tab.length > 0) {
        tab.closest('.tab').find($('.tab__item > span').not(tab).next('.tab__content')).css({ 'display': 'none' });
        tab.next('.tab__content').slideDown(speed);
      }
      accordOpen();
    } else {
      if (tab.length === 0 || tab.length > 1) {
        tab.removeClass('active').next('.tab__content').css({ 'display': 'block' });
        $('.tab__item:first > span').addClass('active');
      } else {
        $('.tab').find('.tab__content').css({ 'display': 'block' });
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
  $('.product__del').off().on('click', function () {
    $(this).closest('.result__item').detach();
  });

  //Навигация по табам в корзине
  $('.order__next').off().on('click', function (e) {
    e.preventDefault();
    var attr = $(this).attr('href');
    $('.tabs-panel').each(function () {
      $(this).removeClass('is-active');
      var str = '#' + $(this).attr('id');
      if (str == attr) {
        $(this).addClass('is-active');
      }
    });

    $('.tabs-title').each(function () {
      $(this).removeClass('is-active');
      $(this).find('a').attr('aria-selected', false);
      if ($(this).find('a').attr('href') == attr) {
        $(this).addClass('is-active');
        $(this).find('a').attr('aria-selected', true);
      }
    });
  });

  //Forms
  $(function () {

    $(".js-formShow").click(function (e) {
      e.preventDefault();
      var elementClick = $(this).attr("href");
      showForm(elementClick);
    });

    function showForm(elementClick) {
      $(elementClick + " .callback-bgrd").show("slow");
      var main_h = $(window).height();
      var h = $(" .callback-form").height();
      if (main_h > h) {
        $(elementClick + " .callback-form").css("margin-top", -(h / 2) + "px");
      } else {
        $(elementClick + " .callback-form").css("margin-top", 0).css("top", 0);
      }
      $(elementClick + " .callback-form").show("slow");
    };

    $(".callback-bgrd, .callback-form .x").click(function () {
      $(".callback-bgrd").hide("slow");
      $(".callback-form").hide("slow");
    });

    allResize();
  });

  function allResize() {
    var main_h = $(window).height();
    var h = $(".callback-form").height();
    if (main_h > h) {
      $(".callback-form").css("margin-top", -(h / 2) + "px");
    }
  }

  $(window).resize(function () {
    allResize();
  });

  window.addEventListener('orientationchange', function () {
    allResize();
  }, false);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyIkIiwicmVhZHkiLCJkb2N1bWVudCIsImZvdW5kYXRpb24iLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIndpZHRoIiwic21hbGxXaWR0aCIsInNwZWVkIiwiZGVza3RvcCIsImVhY2giLCJmaW5kIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJtb2JpbGUiLCJvZmYiLCJvbiIsInRvZ2dsZUNsYXNzIiwibmV4dCIsInNsaWRlVG9nZ2xlIiwibW9iaWxlTWVudSIsInNsaWNrIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJhcnJvd3MiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInZlcnRpY2FsIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImRyYWdnYWJsZSIsInVpU2xpZGVyIiwialF1ZXJ5Iiwic2xpZGVyIiwibWluIiwibWF4IiwidmFsdWVzIiwicmFuZ2UiLCJzdG9wIiwiZXZlbnQiLCJ1aSIsInZhbCIsInNsaWRlIiwiY2hhbmdlIiwidmFsdWUxIiwidmFsdWUyIiwicGFyc2VJbnQiLCJrZXlwcmVzcyIsImtleSIsImtleUNoYXIiLCJrZXlDb2RlIiwid2hpY2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ0ZXN0IiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2xvc2VzdCIsImZpbHRlckl0ZW1IaWRkZW4iLCJjb3VudCIsImVxIiwibmV4dEFsbCIsImNzcyIsImZpbHRlckNvbXBhbnkiLCJzZWxlY3RvciIsInN3aXRjaFNlbCIsInN3aXRjaFNlbFRleHQiLCJ0ZXh0Iiwic3dpdGNoU2VsTmV3VGV4dCIsIndyYXBBbGwiLCJyZW1vdmVDbGFzcyIsInF1YW50aXR5IiwiaW5zZXJ0QWZ0ZXIiLCJzcGlubmVyIiwiaW5wdXQiLCJidG5VcCIsImJ0bkRvd24iLCJhdHRyIiwicHJpY2UiLCJwcmljZVZhbCIsImZ1bGxQcmljZSIsInJlcGxhY2UiLCJjYWxjUHJpY2UiLCJpIiwiaVZhbCIsInNlbCIsImNsaWNrIiwib2xkVmFsdWUiLCJwYXJzZUZsb2F0IiwibmV3UHJpY2VWYWwiLCJuZXdWYWwiLCJ0cmlnZ2VyIiwidGFic0luQWNjb3JkIiwid2lkdGhWYWwiLCJ0YWIiLCJjYWxjSGVpZ2h0IiwidGFiSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJ0YWJzU3dpdGNoIiwicmVtb3ZlQXR0ciIsInNob3ciLCJub3QiLCJhY2NvcmRPcGVuIiwic2xpZGVEb3duIiwicmVzaXplIiwiZGV0YWNoIiwic3RyIiwiZWxlbWVudENsaWNrIiwic2hvd0Zvcm0iLCJtYWluX2giLCJoIiwiaGlkZSIsImFsbFJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFFLGFBQVc7O0FBR1hBLElBQUUsVUFBRixFQUFjQyxLQUFkLENBQW9CLFlBQVc7O0FBRTdCRCxNQUFFRSxRQUFGLEVBQVlDLFVBQVo7O0FBRUEsUUFBSUMsSUFBSUMsT0FBT0MsVUFBUCxHQUFvQkQsT0FBT0MsVUFBM0IsR0FBd0NOLEVBQUVLLE1BQUYsRUFBVUUsS0FBVixFQUFoRDtBQUFBLFFBQ0lDLGFBQWEsR0FEakI7QUFBQSxRQUVJQyxRQUFRLEdBRlo7O0FBS0E7QUFDQSxhQUFTQyxPQUFULEdBQW1CO0FBQ2pCLFVBQUdOLElBQUksSUFBUCxFQUFhO0FBQ1hKLFVBQUUsZ0NBQUYsRUFBb0NXLElBQXBDLENBQXlDLFlBQVc7QUFDbEQsY0FBR1gsRUFBRSxJQUFGLEVBQVFZLElBQVIsQ0FBYSxJQUFiLEVBQW1CQyxNQUFuQixHQUE0QixDQUEvQixFQUFrQztBQUNoQ2IsY0FBRSxJQUFGLEVBQVFZLElBQVIsQ0FBYSxHQUFiLEVBQWtCRSxRQUFsQixDQUEyQixRQUEzQjtBQUNEO0FBQ0YsU0FKRDtBQUtEO0FBQ0Y7QUFDREo7O0FBR0E7QUFDQSxhQUFTSyxNQUFULEdBQWtCO0FBQ2hCLFVBQUdYLElBQUlJLFVBQVAsRUFB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LEVBQXVDLEVBQUVpRCxJQUFFLENBQUosQ0FBRCxHQUFXLElBQWpEO0FBQ0Q7QUFDRjs7QUFFRHBILElBQUVLLE1BQUYsRUFBVXlHLE1BQVYsQ0FBaUIsWUFBWTtBQUMzQlE7QUFDRCxHQUZEOztBQUlBakgsU0FBT2tILGdCQUFQLENBQXlCLG1CQUF6QixFQUE4QyxZQUFZO0FBQ3hERDtBQUNELEdBRkQsRUFFRyxLQUZIO0FBSUQsQ0E1YkMsR0FBRCIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7KGZ1bmN0aW9uKCkge1xuXG5cbiAgJCgnZG9jdW1lbnQnKS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBcbiAgICAkKGRvY3VtZW50KS5mb3VuZGF0aW9uKCk7XG5cbiAgICB2YXIgdyA9IHdpbmRvdy5pbm5lcldpZHRoID8gd2luZG93LmlubmVyV2lkdGggOiAkKHdpbmRvdykud2lkdGgoKSxcbiAgICAgICAgc21hbGxXaWR0aCA9IDY0MCxcbiAgICAgICAgc3BlZWQgPSAyNTA7XG5cblxuICAgIC8v0KHQutGA0LjQv9GC0Ysg0LTQu9GPINC00LXRgdC60YLQvtC/0L3QvtC5INCy0LXRgNGB0LjQuFxuICAgIGZ1bmN0aW9uIGRlc2t0b3AoKSB7XG4gICAgICBpZih3ID4gMTAyMykge1xuICAgICAgICAkKCcubWVudSA+IGxpID4gdWwgPiBsaSA+IHVsID4gbGknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKCQodGhpcykuZmluZCgndWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EnKS5hZGRDbGFzcygncGFyZW50Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVza3RvcCgpOyBcblxuXG4gICAgLy/QodC60YDQuNC/0YLRiyDQtNC70Y8g0LzQvtCx0LjQu9GM0L3QvtC5INCy0LXRgNGB0LjQuFxuICAgIGZ1bmN0aW9uIG1vYmlsZSgpIHtcbiAgICAgIGlmKHcgPCBzbWFsbFdpZHRoKSB7XG4gICAgICAgICQoJy5mb290ZXJfX21lbnUtLXRpdGxlJykub2ZmKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCkuc2xpZGVUb2dnbGUoc3BlZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgbW9iaWxlKCk7XG5cbiAgICAvL9Cc0L7QsdC40LvRjNC90L7QtSDQvNC10L3RjlxuICAgICQoJy5tZW51X193cmFwcGVyJykubW9iaWxlTWVudSgpO1xuXG4gICAgLy/QodC70LDQudC00LXRgFxuICAgICQoJy5zbGlkZXInKS5zbGljayh7XG4gICAgICBzcGVlZDogMzAwLFxuICAgICAgZG90czogZmFsc2UsXG4gICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha3BvaW50OiA3NjgsXG4gICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICAvL9Ch0LvQsNC50LTQtdGAINCx0YDQtdC90LTQvtCyXG4gICAgJCgnLmJyYW5kU2xpZGVyX19saXN0Jykuc2xpY2soe1xuICAgICAgZG90czogdHJ1ZSxcbiAgICAgIGFycm93czogZmFsc2UsXG4gICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjMsXG4gICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2NyxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MCxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgLy/QodC70LDQudC00LXRgCDRgtC+0LLQsNGA0L7QslxuICAgICQoJyNwcm9kdWN0X19wYW5lbDIsICNwcm9kdWN0X19wYW5lbDEnKS5zbGljayh7XG4gICAgICBkb3RzOiBmYWxzZSxcbiAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogMTMwMCxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogMTAyMyxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDY0MCxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgdmVydGljYWw6IHRydWUsXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gICAgLy/QodC70LDQudC00LXRgCDQutCw0YDRgtC+0YfQutC4INGC0L7QstCw0YDQsFxuICAgICQoJy5zbGlkZXItZm9yJykuc2xpY2soe1xuICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgIGFzTmF2Rm9yOiAnLnNsaWRlci1uYXYnLFxuICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogNjQwLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gICAgJCgnLnNsaWRlci1uYXYnKS5zbGljayh7XG4gICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgIGFzTmF2Rm9yOiAnLnNsaWRlci1mb3InLFxuICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgIHZlcnRpY2FsOiB0cnVlLFxuICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgLy90b3VjaC1ldmVudHMgZm9yIHNsaWRlclxuICAgICQoJy51aS1zbGlkZXItaGFuZGxlICcpLmRyYWdnYWJsZSgpO1xuXG4gICAgLy/QmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC70LDQudC00LXRgNCwXG4gICAgZnVuY3Rpb24gdWlTbGlkZXIoKSB7XG4gICAgICBqUXVlcnkoXCIjc2xpZGVyXCIpLnNsaWRlcih7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxMDAwLFxuICAgICAgICB2YWx1ZXM6IFswLDEwMDBdLFxuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAgICAgalF1ZXJ5KFwiaW5wdXQjbWluQ29zdFwiKS52YWwoalF1ZXJ5KFwiI3NsaWRlclwiKS5zbGlkZXIoXCJ2YWx1ZXNcIiwwKSk7XG4gICAgICAgICAgalF1ZXJ5KFwiaW5wdXQjbWF4Q29zdFwiKS52YWwoalF1ZXJ5KFwiI3NsaWRlclwiKS5zbGlkZXIoXCJ2YWx1ZXNcIiwxKSk7XG4gICAgICAgICAgXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKXtcbiAgICAgICAgICBqUXVlcnkoXCJpbnB1dCNtaW5Db3N0XCIpLnZhbChqUXVlcnkoXCIjc2xpZGVyXCIpLnNsaWRlcihcInZhbHVlc1wiLDApKTtcbiAgICAgICAgICBqUXVlcnkoXCJpbnB1dCNtYXhDb3N0XCIpLnZhbChqUXVlcnkoXCIjc2xpZGVyXCIpLnNsaWRlcihcInZhbHVlc1wiLDEpKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgalF1ZXJ5KFwiaW5wdXQjbWluQ29zdFwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbHVlMT1qUXVlcnkoXCJpbnB1dCNtaW5Db3N0XCIpLnZhbCgpO1xuICAgICAgICB2YXIgdmFsdWUyPWpRdWVyeShcImlucHV0I21heENvc3RcIikudmFsKCk7XG4gICAgICAgICAgaWYocGFyc2VJbnQodmFsdWUxKSA+IHBhcnNlSW50KHZhbHVlMikpe1xuICAgICAgICAgIHZhbHVlMSA9IHZhbHVlMjtcbiAgICAgICAgICBqUXVlcnkoXCJpbnB1dCNtaW5Db3N0XCIpLnZhbCh2YWx1ZTEpO1xuICAgICAgICB9XG4gICAgICAgIGpRdWVyeShcIiNzbGlkZXJcIikuc2xpZGVyKFwidmFsdWVzXCIsMCx2YWx1ZTEpO1x0XG4gICAgICB9KTtcblxuICAgICAgICBcbiAgICAgIGpRdWVyeShcImlucHV0I21heENvc3RcIikuY2hhbmdlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgXG4gICAgICAgIHZhciB2YWx1ZTE9alF1ZXJ5KFwiaW5wdXQjbWluQ29zdFwiKS52YWwoKTtcbiAgICAgICAgdmFyIHZhbHVlMj1qUXVlcnkoXCJpbnB1dCNtYXhDb3N0XCIpLnZhbCgpO1xuXG4gICAgICAgIGlmKHBhcnNlSW50KHZhbHVlMSkgPiBwYXJzZUludCh2YWx1ZTIpKXtcbiAgICAgICAgICB2YWx1ZTIgPSB2YWx1ZTE7XG4gICAgICAgICAgalF1ZXJ5KFwiaW5wdXQjbWF4Q29zdFwiKS52YWwodmFsdWUyKTtcbiAgICAgICAgfVxuICAgICAgICBqUXVlcnkoXCIjc2xpZGVyXCIpLnNsaWRlcihcInZhbHVlc1wiLDEsdmFsdWUyKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDRhNC40LvRjNGC0YDQsNGG0LjRjyDQstCy0L7QtNCwINCyINC/0L7Qu9GPXG4gICAgICBqUXVlcnkoJ2lucHV0I21heENvc3QsIGlucHV0I21pbkNvc3QnKS5rZXlwcmVzcyhmdW5jdGlvbihldmVudCl7XG4gICAgICAgIHZhciBrZXksIGtleUNoYXI7XG4gICAgICAgIGlmKCFldmVudCkgdmFyIGV2ZW50ID0gd2luZG93LmV2ZW50O1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSkga2V5ID0gZXZlbnQua2V5Q29kZTtcbiAgICAgICAgZWxzZSBpZihldmVudC53aGljaCkga2V5ID0gZXZlbnQud2hpY2g7XG4gICAgICAgIGlmKGtleT09bnVsbCB8fCBrZXk9PTAgfHwga2V5PT04IHx8IGtleT09MTMgfHwga2V5PT05IHx8IGtleT09NDYgfHwga2V5PT0zNyB8fCBrZXk9PTM5ICkgcmV0dXJuIHRydWU7XG4gICAgICAgIGtleUNoYXI9U3RyaW5nLmZyb21DaGFyQ29kZShrZXkpOyBcbiAgICAgICAgaWYoIS9cXGQvLnRlc3Qoa2V5Q2hhcikpXHRyZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHVpU2xpZGVyKCk7XG5cbiAgICAvL9Cg0LDRgdC60YDRi9GC0LjQtSDQstGC0L7RgNC+0LPQviDRg9GA0L7QstC90Y8g0LzQtdC90Y4g0LIg0YHQsNC50LTQsdCw0YDQtVxuICAgICQoJy5sZWZ0TWVudSA+IHVsID4gbGkgPiBhJykub2ZmKCkub24oJ2NsaWNrJywgJ3NwYW4nLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykuY2xvc2VzdCgnYScpLm5leHQoJ3VsJykuc2xpZGVUb2dnbGUoc3BlZWQpO1xuICAgIH0pO1xuXG4gICAgLy/QoNCw0YHQutGA0YvRgtC40LUg0YLQtdC70LAg0L7QtNC90L7QuSDQutCw0YLQtdCz0L7RgNC40Lgg0YTQuNC70YzRgtGA0LBcbiAgICAkKCcuZmlsdGVyX19uYW1lJykub2ZmKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCduby1hY3RpdmUnKS5uZXh0KCcuZmlsdGVyX19ib2R5Jykuc2xpZGVUb2dnbGUoc3BlZWQpO1xuICAgIH0pO1xuXG4gICAgLy/QodC60YDRi9Cy0LDQtdC8INGH0LDRgdGC0Ywg0YTQuNC70YzRgtGA0L7QsiDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtVxuICAgIGZ1bmN0aW9uIGZpbHRlckl0ZW1IaWRkZW4oKSB7XG4gICAgICB2YXIgY291bnQgPSAyO1xuICAgICAgJCgnLmZpbHRlcicpLmZpbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCQodGhpcykuZmluZCgnLmZpbHRlcl9faXRlbScpLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgICAgICAgJCh0aGlzKS5maW5kKCcuZmlsdGVyX19pdGVtJykuZXEoY291bnQgLSAxKS5uZXh0QWxsKCkuZmluZCgnLmZpbHRlcl9fbmFtZScpLmFkZENsYXNzKCduby1hY3RpdmUnKS5uZXh0KCcuZmlsdGVyX19ib2R5JykuY3NzKHsnZGlzcGxheSc6J25vbmUnfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgZmlsdGVySXRlbUhpZGRlbigpXG5cbiAgICAvL9Cg0LDQt9Cy0L7RgNCw0YfQuNCy0LDQvdC40LUg0LjQvdC/0YPRgtC+0LIg0LIg0YTQuNC70YzRgtGA0LVcbiAgICBmdW5jdGlvbiBmaWx0ZXJDb21wYW55KCkge1xuICAgICAgdmFyIGNvdW50ID0gMyxcbiAgICAgICAgICBzZWxlY3RvciA9ICc8ZGl2IGNsYXNzPVwiY29tcGFueV9fd3JhcFwiIC8+JyxcbiAgICAgICAgICBzd2l0Y2hTZWwgPSAkKCcuZmlsdGVyX190b2dnbGUnKSxcbiAgICAgICAgICBzd2l0Y2hTZWxUZXh0ID0gc3dpdGNoU2VsLnRleHQoKSxcbiAgICAgICAgICBzd2l0Y2hTZWxOZXdUZXh0ID0gJy0g0KHQstC10YDQvdGD0YLRjCc7XG4gICAgICAkKCcuZmlsdGVyX19jb21wYW55JykuZmluZChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5maW5kKCcuZmlsdGVyX19jb21wYW55LS1pdGVtJykubGVuZ3RoID4gY291bnQpIHtcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5maWx0ZXJfX2NvbXBhbnktLWl0ZW0nKS5lcShjb3VudCAtIDEpLm5leHRBbGwoKS53cmFwQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzd2l0Y2hTZWwub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5jb21wYW55X193cmFwJykuc2xpZGVUb2dnbGUoc3BlZWQpO1xuICAgICAgICBpZigkKHRoaXMpLnRleHQoKSA9PSBzd2l0Y2hTZWxOZXdUZXh0KSB7XG4gICAgICAgICAgJCh0aGlzKS50ZXh0KHN3aXRjaFNlbFRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcykudGV4dChzd2l0Y2hTZWxOZXdUZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZpbHRlckNvbXBhbnkoKTtcblxuICAgICQoJy5maWx0ZXJfX3N3aXRjaCcpLm9mZigpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5uZXh0KCcuZmlsdGVyJykuc2xpZGVUb2dnbGUoc3BlZWQpO1xuICAgIH0pO1xuXG4gICAgJCgnLmluZm9fX2NhdGVnb3J5LS1pdGVtJykub2ZmKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5pbmZvX19jYXRlZ29yeScpLmZpbmQoJy5tYWluQnV0dG9ucycpLnJlbW92ZUNsYXNzKCdtYWluQnV0dG9ucycpO1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbWFpbkJ1dHRvbnMnKTtcbiAgICB9KTtcblxuICB9KTtcblxuICAvL9CY0LfQvNC10L3Rj9C10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0LIg0LrQsNGA0YLQvtGH0LrQtSDRgtC+0LLQsNGA0LBcbiAgZnVuY3Rpb24gcXVhbnRpdHkoKSB7XG4gICAgalF1ZXJ5KCc8ZGl2IGNsYXNzPVwicXVhbnRpdHktbmF2XCI+PGRpdiBjbGFzcz1cInF1YW50aXR5LWJ1dHRvbiBxdWFudGl0eS11cFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJxdWFudGl0eS1idXR0b24gcXVhbnRpdHktZG93blwiPjwvZGl2PjwvZGl2PicpLmluc2VydEFmdGVyKCcucXVhbnRpdHkgaW5wdXQnKTtcbiAgICBqUXVlcnkoJy5xdWFudGl0eScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3Bpbm5lciA9IGpRdWVyeSh0aGlzKSxcbiAgICAgICAgaW5wdXQgPSBzcGlubmVyLmZpbmQoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKSxcbiAgICAgICAgYnRuVXAgPSBzcGlubmVyLmZpbmQoJy5xdWFudGl0eS11cCcpLFxuICAgICAgICBidG5Eb3duID0gc3Bpbm5lci5maW5kKCcucXVhbnRpdHktZG93bicpLFxuICAgICAgICBtaW4gPSBpbnB1dC5hdHRyKCdtaW4nKSxcbiAgICAgICAgbWF4ID0gaW5wdXQuYXR0cignbWF4JyksXG4gICAgICAgIHByaWNlID0gJCh0aGlzKS5jbG9zZXN0KCcuY2FyZFdyYXAnKS5maW5kKCcucHJpY2VDb3VudCcpLFxuICAgICAgICBwcmljZVZhbCA9IHByaWNlLnRleHQoKSxcbiAgICAgICAgZnVsbFByaWNlID0gMDtcblxuICAgICAgICBwcmljZVZhbCA9IHByaWNlVmFsLnJlcGxhY2UoJyAnLCcnKTtcbiAgICAgICAgZnVuY3Rpb24gY2FsY1ByaWNlKCkge1xuICAgICAgICAgICAgJCgnLm9yZGVyX193cmFwJykuZmluZCgnLnByaWNlQ291bnQnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGkgPSAkKHRoaXMpLnRleHQoKSxcbiAgICAgICAgICAgICAgICBpVmFsID0gaS5yZXBsYWNlKCcgJywnJyk7XG4gICAgICAgICAgICBmdWxsUHJpY2UgPSBmdWxsUHJpY2UgKyAraVZhbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGNQcmljZSgpO1xuXG4gICAgICBpZigkKHRoaXMpLmNsb3Nlc3QoJy5vcmRlcl9fd3JhcCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNlbCA9ICQodGhpcykuY2xvc2VzdCgnLm9yZGVyX193cmFwJykuZmluZCgnI2ZpbmlzaFByaWNlJyk7XG4gICAgICAgIHNlbC50ZXh0KGZ1bGxQcmljZSk7XG4gICAgICB9XG5cbiAgICAgIGJ0blVwLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBwYXJzZUZsb2F0KGlucHV0LnZhbCgpKSxcbiAgICAgICAgICAgIG5ld1ByaWNlVmFsO1xuICAgICAgICBpZiAob2xkVmFsdWUgPj0gbWF4KSB7XG4gICAgICAgICAgdmFyIG5ld1ZhbCA9IG9sZFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdWYWwgPSBvbGRWYWx1ZSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgc3Bpbm5lci5maW5kKFwiaW5wdXRcIikudmFsKG5ld1ZhbCk7XG4gICAgICAgIHNwaW5uZXIuZmluZChcImlucHV0XCIpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICAgIG5ld1ByaWNlVmFsID0gIG5ld1ZhbCAqIHByaWNlVmFsO1xuICAgICAgICBwcmljZS50ZXh0KG5ld1ByaWNlVmFsKTtcbiAgICAgIH0pO1xuXG4gICAgICBidG5Eb3duLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBwYXJzZUZsb2F0KGlucHV0LnZhbCgpKSxcbiAgICAgICAgICAgIG5ld1ByaWNlVmFsO1xuICAgICAgICBpZiAob2xkVmFsdWUgPD0gbWluKSB7XG4gICAgICAgICAgdmFyIG5ld1ZhbCA9IG9sZFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdWYWwgPSBvbGRWYWx1ZSAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgc3Bpbm5lci5maW5kKFwiaW5wdXRcIikudmFsKG5ld1ZhbCk7XG4gICAgICAgIHNwaW5uZXIuZmluZChcImlucHV0XCIpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICAgIG5ld1ByaWNlVmFsID0gIG5ld1ZhbCAqIHByaWNlVmFsO1xuICAgICAgICBwcmljZS50ZXh0KG5ld1ByaWNlVmFsKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cbiAgcXVhbnRpdHkoKTtcblxuICBmdW5jdGlvbiB0YWJzSW5BY2NvcmQoKSB7XG5cdHZhciB3ID0gd2luZG93LmlubmVyV2lkdGggPyB3aW5kb3cuaW5uZXJXaWR0aCA6ICQod2luZG93KS53aWR0aCgpLCAvL9GI0LjRgNC40L3QsCDRjdC60YDQsNC90LBcblx0XHRcdHdpZHRoVmFsID0gMTAyNCwgLy/RiNC40YDQuNC90LAsINC80LXQvdGM0YjQtSDQutC+0YLQvtGA0L7QuSDRgtCw0LHRiyDRgdGC0LDQvdC+0LLRj9GC0YHRjyDQsNC60LrQvtGA0LTQuNC+0L3QsNC80Lhcblx0XHRcdHNwZWVkID0gMjUwLCAvL9GB0LrQvtGA0L7RgdGC0Ywg0YDQsNGB0LrRgNGL0YLQuNGPINCw0LrQutC+0YDQtNC40L7QvdC+0LJcblx0XHRcdHRhYiA9ICQoJy50YWJfX2l0ZW0gPiBzcGFuLmFjdGl2ZScpOyAvL9C+0YLQtNC10LvRjNC90LDRjyDQstC60LvQsNC00LrQsFxuXHRcblx0XG5cdC8v0JLRi9GB0YfQuNGC0YvQstCw0LXQvCDQstGL0YHQvtGC0YMg0LrQvtC90YLQtdC50L3QtdGA0LBcblx0XHRmdW5jdGlvbiBjYWxjSGVpZ2h0KCkge1xuXHRcdFx0dmFyIHRhYkhlaWdodCA9IDA7XG5cdFx0XHQkKCcudGFiX19pdGVtID4gc3Bhbi5hY3RpdmUnKS5uZXh0KCcudGFiX19jb250ZW50JykuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoJCh0aGlzKS5pbm5lckhlaWdodCgpID4gdGFiSGVpZ2h0ICkge1xuXHRcdFx0XHRcdCB0YWJIZWlnaHQgPSAkKHRoaXMpLmlubmVySGVpZ2h0KClcblx0XHRcdFx0IH1cblx0XHRcdH0pO1xuXHRcdFx0JCgnLnRhYicpLmhlaWdodCh0YWJIZWlnaHQpO1xuXHRcdH1cblx0XG5cdGZ1bmN0aW9uIHRhYnNTd2l0Y2goKSB7XG5cdFx0JCgnLnRhYl9faXRlbScpLm9mZigpLm9uKCdjbGljaycsICdzcGFuJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy50YWInKS5maW5kKCQoJy50YWJfX2l0ZW0nKSkuZmluZCgnLnRhYl9fY29udGVudCcpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJy50YWJfX2NvbnRlbnQnKS5zaG93KCkuY2xvc2VzdCgnLnRhYicpLmZpbmQoJCgnLnRhYl9faXRlbSA+IHNwYW4uYWN0aXZlJykubm90KCQodGhpcykpKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRjYWxjSGVpZ2h0KCk7XG5cdFx0fSk7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGFjY29yZE9wZW4oKSB7XG5cdFx0JCgnLnRhYicpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcblx0XHQkKCcudGFiX19pdGVtJykub2ZmKCkub24oJ2NsaWNrJywgJ3NwYW4nLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgnLnRhYl9fY29udGVudCcpLnNsaWRlVG9nZ2xlKHNwZWVkKTtcblx0XHRcdH0pO1xuXHR9XG5cdFxuXHRpZiAodyA8IHdpZHRoVmFsKSB7XG5cdFx0aWYodGFiLmxlbmd0aCA+IDApIHtcblx0XHRcdHRhYi5jbG9zZXN0KCcudGFiJykuZmluZCgkKCcudGFiX19pdGVtID4gc3BhbicpLm5vdCh0YWIpLm5leHQoJy50YWJfX2NvbnRlbnQnKSkuY3NzKHsnZGlzcGxheSc6J25vbmUnfSk7XG5cdFx0XHR0YWIubmV4dCgnLnRhYl9fY29udGVudCcpLnNsaWRlRG93bihzcGVlZCk7XG5cdFx0fVxuXHRcdGFjY29yZE9wZW4oKTtcbiAgfSBlbHNlIHtcbiAgICAgIGlmKHRhYi5sZW5ndGggPT09IDAgfHwgdGFiLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGFiLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCcudGFiX19jb250ZW50JykuY3NzKHsnZGlzcGxheSc6J2Jsb2NrJ30pO1xuICAgICAgICAgICQoJy50YWJfX2l0ZW06Zmlyc3QgPiBzcGFuJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJy50YWInKS5maW5kKCcudGFiX19jb250ZW50JykuY3NzKHsnZGlzcGxheSc6J2Jsb2NrJ30pO1xuICAgICAgICB9XG4gICAgICAgIGNhbGNIZWlnaHQoKTtcbiAgICAgICAgdGFic1N3aXRjaCgpO1x0XG4gICAgICB9XG4gICAgfSBcblxuICB0YWJzSW5BY2NvcmQoKTtcblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICB0YWJzSW5BY2NvcmQoKTtcbiAgfSk7XG5cbiAgLy/Qo9C00LDQu9C10L3QuNC1INGC0L7QstCw0YDQsCDQuNC3INC60L7RgNC30LjQvdGLINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC60YDQtdGB0YJcbiAgJCgnLnByb2R1Y3RfX2RlbCcpLm9mZigpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuY2xvc2VzdCgnLnJlc3VsdF9faXRlbScpLmRldGFjaCgpO1xuICB9KTtcblxuICAvL9Cd0LDQstC40LPQsNGG0LjRjyDQv9C+INGC0LDQsdCw0Lwg0LIg0LrQvtGA0LfQuNC90LVcbiAgJCgnLm9yZGVyX19uZXh0Jykub2ZmKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgYXR0ciA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICQoJy50YWJzLXBhbmVsJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgdmFyIHN0ciA9ICcjJyArICQodGhpcykuYXR0cignaWQnKTtcbiAgICAgIGlmKHN0ciA9PSBhdHRyKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnLnRhYnMtdGl0bGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAkKHRoaXMpLmZpbmQoJ2EnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgaWYoJCh0aGlzKS5maW5kKCdhJykuYXR0cignaHJlZicpID09IGF0dHIpIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9Gb3Jtc1xuICAkKGZ1bmN0aW9uKCkge1xuXG4gICAgJChcIi5qcy1mb3JtU2hvd1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcbiAgICAgICAgICAgIHNob3dGb3JtKGVsZW1lbnRDbGljayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNob3dGb3JtKGVsZW1lbnRDbGljaykge1xuICAgICAgICAgICAgJChlbGVtZW50Q2xpY2srXCIgLmNhbGxiYWNrLWJncmRcIikuc2hvdyhcInNsb3dcIik7XG4gICAgICAgICAgICB2YXIgbWFpbl9oID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAgICAgdmFyIGggPSAkKFwiIC5jYWxsYmFjay1mb3JtXCIpLmhlaWdodCgpO1xuICAgICAgICAgICAgaWYgKG1haW5faCA+IGgpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnRDbGljaytcIiAuY2FsbGJhY2stZm9ybVwiKS5jc3MoXCJtYXJnaW4tdG9wXCIsICgtKGggLyAyKSkgKyBcInB4XCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnRDbGljaytcIiAuY2FsbGJhY2stZm9ybVwiKS5jc3MoXCJtYXJnaW4tdG9wXCIsIDApLmNzcyhcInRvcFwiLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoZWxlbWVudENsaWNrK1wiIC5jYWxsYmFjay1mb3JtXCIpLnNob3coXCJzbG93XCIpO1xuICAgICAgICB9O1xuXG5cbiAgICAkKFwiLmNhbGxiYWNrLWJncmQsIC5jYWxsYmFjay1mb3JtIC54XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiLmNhbGxiYWNrLWJncmRcIikuaGlkZShcInNsb3dcIik7XG4gICAgICAkKFwiLmNhbGxiYWNrLWZvcm1cIikuaGlkZShcInNsb3dcIik7XG4gICAgfSk7XG5cbiAgICBhbGxSZXNpemUoKTtcblxuICB9KTtcblxuICBmdW5jdGlvbiBhbGxSZXNpemUoKSB7XG4gICAgdmFyIG1haW5faCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICB2YXIgaCA9ICQoXCIuY2FsbGJhY2stZm9ybVwiKS5oZWlnaHQoKTtcbiAgICBpZiAobWFpbl9oID4gaCkge1xuICAgICAgJChcIi5jYWxsYmFjay1mb3JtXCIpLmNzcyhcIm1hcmdpbi10b3BcIiwgKC0oaC8yKSkgKyBcInB4XCIpO1xuICAgIH1cbiAgfVxuXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgIGFsbFJlc2l6ZSgpO1xuICB9KTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ29yaWVudGF0aW9uY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIGFsbFJlc2l6ZSgpO1xuICB9LCBmYWxzZSApO1xuXG59KCkpOyJdfQ==
