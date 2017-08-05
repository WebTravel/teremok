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

  //Удаление товара из сравнения
  $('.product__delete').on('click', function () {
    $(this).closest('.product__item').remove();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyIkIiwicmVhZHkiLCJkb2N1bWVudCIsImZvdW5kYXRpb24iLCJ3Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIndpZHRoIiwic21hbGxXaWR0aCIsInNwZWVkIiwiZGVza3RvcCIsImVhY2giLCJmaW5kIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJtb2JpbGUiLCJvZmYiLCJvbiIsInRvZ2dsZUNsYXNzIiwibmV4dCIsInNsaWRlVG9nZ2xlIiwibW9iaWxlTWVudSIsInNsaWNrIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJhcnJvd3MiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInZlcnRpY2FsIiwiZmFkZSIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsImRyYWdnYWJsZSIsInVpU2xpZGVyIiwialF1ZXJ5Iiwic2xpZGVyIiwibWluIiwibWF4IiwidmFsdWVzIiwicmFuZ2UiLCJzdG9wIiwiZXZlbnQiLCJ1aSIsInZhbCIsInNsaWRlIiwiY2hhbmdlIiwidmFsdWUxIiwidmFsdWUyIiwicGFyc2VJbnQiLCJrZXlwcmVzcyIsImtleSIsImtleUNoYXIiLCJrZXlDb2RlIiwid2hpY2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ0ZXN0IiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2xvc2VzdCIsImZpbHRlckl0ZW1IaWRkZW4iLCJjb3VudCIsImVxIiwibmV4dEFsbCIsImNzcyIsImZpbHRlckNvbXBhbnkiLCJzZWxlY3RvciIsInN3aXRjaFNlbCIsInN3aXRjaFNlbFRleHQiLCJ0ZXh0Iiwic3dpdGNoU2VsTmV3VGV4dCIsIndyYXBBbGwiLCJyZW1vdmVDbGFzcyIsInF1YW50aXR5IiwiaW5zZXJ0QWZ0ZXIiLCJzcGlubmVyIiwiaW5wdXQiLCJidG5VcCIsImJ0bkRvd24iLCJhdHRyIiwicHJpY2UiLCJwcmljZVZhbCIsImZ1bGxQcmljZSIsInJlcGxhY2UiLCJjYWxjUHJpY2UiLCJpIiwiaVZhbCIsInNlbCIsImNsaWNrIiwib2xkVmFsdWUiLCJwYXJzZUZsb2F0IiwibmV3UHJpY2VWYWwiLCJuZXdWYWwiLCJ0cmlnZ2VyIiwidGFic0luQWNjb3JkIiwid2lkdGhWYWwiLCJ0YWIiLCJjYWxjSGVpZ2h0IiwidGFiSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJ0YWJzU3dpdGNoIiwicmVtb3ZlQXR0ciIsInNob3ciLCJub3QiLCJhY2NvcmRPcGVuIiwic2xpZGVEb3duIiwicmVzaXplIiwiZGV0YWNoIiwic3RyIiwicmVtb3ZlIiwiZWxlbWVudENsaWNrIiwic2hvd0Zvcm0iLCJtYWluX2giLCJoIiwiaGlkZSIsImFsbFJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFFLGFBQVc7O0FBR1hBLElBQUUsVUFBRixFQUFjQyxLQUFkLENBQW9CLFlBQVc7O0FBRTdCRCxNQUFFRSxRQUFGLEVBQVlDLFVBQVo7O0FBRUEsUUFBSUMsSUFBSUMsT0FBT0MsVUFBUCxHQUFvQkQsT0FBT0MsVUFBM0IsR0FBd0NOLEVBQUVLLE1BQUYsRUFBVUUsS0FBVixFQUFoRDtBQUFBLFFBQ0lDLGFBQWEsR0FEakI7QUFBQSxRQUVJQyxRQUFRLEdBRlo7O0FBS0E7QUFDQSxhQUFTQyxPQUFULEdBQW1CO0FBQ2pCLFVBQUdOLElBQUksSUFBUCxFQUFhO0FBQ1hKLFVBQUUsZ0NBQUYsRUFBb0NXLElBQXBDLENBQXlDLFlBQVc7QUFDbEQsY0FBR1gsRUFBRSxJQUFGLEVBQVFZLElBQVIsQ0FBYSxJQUFiLEVBQW1CQyxNQUFuQixHQUE0QixDQUEvQixFQUFrQztBQUNoQ2IsY0FBRSxJQUFGLEVBQVFZLElBQVIsQ0FBYSxHQUFiLEVBQWtCRSxRQUFsQixDQUEyQixRQUEzQjtBQUNEO0FBQ0YsU0FKRDtBQUtEO0FBQ0Y7QUFDREo7O0FBR0E7QUFDQSxhQUFTSyxNQUFULEdBQWtCO0FBQ2hCLFVBQUdYLElBQUlJ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LEVBQVVrRyxNQUFWLEVBQWI7QUFDQSxRQUFJYyxJQUFJckgsRUFBRSxnQkFBRixFQUFvQnVHLE1BQXBCLEVBQVI7QUFDQSxRQUFJYSxTQUFTQyxDQUFiLEVBQWdCO0FBQ2RySCxRQUFFLGdCQUFGLEVBQW9CbUUsR0FBcEIsQ0FBd0IsWUFBeEIsRUFBdUMsRUFBRWtELElBQUUsQ0FBSixDQUFELEdBQVcsSUFBakQ7QUFDRDtBQUNGOztBQUVEckgsSUFBRUssTUFBRixFQUFVeUcsTUFBVixDQUFpQixZQUFZO0FBQzNCUztBQUNELEdBRkQ7O0FBSUFsSCxTQUFPbUgsZ0JBQVAsQ0FBeUIsbUJBQXpCLEVBQThDLFlBQVk7QUFDeEREO0FBQ0QsR0FGRCxFQUVHLEtBRkg7QUFJRCxDQWpjQyxHQUFEIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24oKSB7XG5cblxuICAkKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIFxuICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcblxuICAgIHZhciB3ID0gd2luZG93LmlubmVyV2lkdGggPyB3aW5kb3cuaW5uZXJXaWR0aCA6ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgICBzbWFsbFdpZHRoID0gNjQwLFxuICAgICAgICBzcGVlZCA9IDI1MDtcblxuXG4gICAgLy/QodC60YDQuNC/0YLRiyDQtNC70Y8g0LTQtdGB0LrRgtC+0L/QvdC+0Lkg0LLQtdGA0YHQuNC4XG4gICAgZnVuY3Rpb24gZGVza3RvcCgpIHtcbiAgICAgIGlmKHcgPiAxMDIzKSB7XG4gICAgICAgICQoJy5tZW51ID4gbGkgPiB1bCA+IGxpID4gdWwgPiBsaScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYoJCh0aGlzKS5maW5kKCd1bCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYScpLmFkZENsYXNzKCdwYXJlbnQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBkZXNrdG9wKCk7IFxuXG5cbiAgICAvL9Ch0LrRgNC40L/RgtGLINC00LvRjyDQvNC+0LHQuNC70YzQvdC+0Lkg0LLQtdGA0YHQuNC4XG4gICAgZnVuY3Rpb24gbW9iaWxlKCkge1xuICAgICAgaWYodyA8IHNtYWxsV2lkdGgpIHtcbiAgICAgICAgJCgnLmZvb3Rlcl9fbWVudS0tdGl0bGUnKS5vZmYoKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoKS5zbGlkZVRvZ2dsZShzcGVlZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBtb2JpbGUoKTtcblxuICAgIC8v0JzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOXG4gICAgJCgnLm1lbnVfX3dyYXBwZXInKS5tb2JpbGVNZW51KCk7XG5cbiAgICAvL9Ch0LvQsNC50LTQtdGAXG4gICAgJCgnLnNsaWRlcicpLnNsaWNrKHtcbiAgICAgIHNwZWVkOiAzMDAsXG4gICAgICBkb3RzOiBmYWxzZSxcbiAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgIGRvdHM6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIC8v0KHQu9Cw0LnQtNC10YAg0LHRgNC10L3QtNC+0LJcbiAgICAkKCcuYnJhbmRTbGlkZXJfX2xpc3QnKS5zbGljayh7XG4gICAgICBkb3RzOiB0cnVlLFxuICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogMTAyMyxcbiAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogNzY3LFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogNDgwLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICAvL9Ch0LvQsNC50LTQtdGAINGC0L7QstCw0YDQvtCyXG4gICAgJCgnI3Byb2R1Y3RfX3BhbmVsMiwgI3Byb2R1Y3RfX3BhbmVsMScpLnNsaWNrKHtcbiAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgc2xpZGVzVG9TaG93OiA0LFxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha3BvaW50OiAxMzAwLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha3BvaW50OiAxMDIzLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYnJlYWtwb2ludDogNjQwLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgICAvL9Ch0LvQsNC50LTQtdGAINC60LDRgNGC0L7Rh9C60Lgg0YLQvtCy0LDRgNCwXG4gICAgJCgnLnNsaWRlci1mb3InKS5zbGljayh7XG4gICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgIGFycm93czogZmFsc2UsXG4gICAgICBmYWRlOiB0cnVlLFxuICAgICAgYXNOYXZGb3I6ICcuc2xpZGVyLW5hdicsXG4gICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha3BvaW50OiA2NDAsXG4gICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIGRvdHM6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcuc2xpZGVyLW5hdicpLnNsaWNrKHtcbiAgICAgIHNsaWRlc1RvU2hvdzogNCxcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgYXNOYXZGb3I6ICcuc2xpZGVyLWZvcicsXG4gICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgdmVydGljYWw6IHRydWUsXG4gICAgICBmb2N1c09uU2VsZWN0OiB0cnVlXG4gICAgfSk7XG5cbiAgICAvL3RvdWNoLWV2ZW50cyBmb3Igc2xpZGVyXG4gICAgJCgnLnVpLXNsaWRlci1oYW5kbGUgJykuZHJhZ2dhYmxlKCk7XG5cbiAgICAvL9CY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0LvQsNC50LTQtdGA0LBcbiAgICBmdW5jdGlvbiB1aVNsaWRlcigpIHtcbiAgICAgIGpRdWVyeShcIiNzbGlkZXJcIikuc2xpZGVyKHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEwMDAsXG4gICAgICAgIHZhbHVlczogWzAsMTAwMF0sXG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBzdG9wOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgICBqUXVlcnkoXCJpbnB1dCNtaW5Db3N0XCIpLnZhbChqUXVlcnkoXCIjc2xpZGVyXCIpLnNsaWRlcihcInZhbHVlc1wiLDApKTtcbiAgICAgICAgICBqUXVlcnkoXCJpbnB1dCNtYXhDb3N0XCIpLnZhbChqUXVlcnkoXCIjc2xpZGVyXCIpLnNsaWRlcihcInZhbHVlc1wiLDEpKTtcbiAgICAgICAgICBcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpe1xuICAgICAgICAgIGpRdWVyeShcImlucHV0I21pbkNvc3RcIikudmFsKGpRdWVyeShcIiNzbGlkZXJcIikuc2xpZGVyKFwidmFsdWVzXCIsMCkpO1xuICAgICAgICAgIGpRdWVyeShcImlucHV0I21heENvc3RcIikudmFsKGpRdWVyeShcIiNzbGlkZXJcIikuc2xpZGVyKFwidmFsdWVzXCIsMSkpO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBqUXVlcnkoXCJpbnB1dCNtaW5Db3N0XCIpLmNoYW5nZShmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsdWUxPWpRdWVyeShcImlucHV0I21pbkNvc3RcIikudmFsKCk7XG4gICAgICAgIHZhciB2YWx1ZTI9alF1ZXJ5KFwiaW5wdXQjbWF4Q29zdFwiKS52YWwoKTtcbiAgICAgICAgICBpZihwYXJzZUludCh2YWx1ZTEpID4gcGFyc2VJbnQodmFsdWUyKSl7XG4gICAgICAgICAgdmFsdWUxID0gdmFsdWUyO1xuICAgICAgICAgIGpRdWVyeShcImlucHV0I21pbkNvc3RcIikudmFsKHZhbHVlMSk7XG4gICAgICAgIH1cbiAgICAgICAgalF1ZXJ5KFwiI3NsaWRlclwiKS5zbGlkZXIoXCJ2YWx1ZXNcIiwwLHZhbHVlMSk7XHRcbiAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgalF1ZXJ5KFwiaW5wdXQjbWF4Q29zdFwiKS5jaGFuZ2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICBcbiAgICAgICAgdmFyIHZhbHVlMT1qUXVlcnkoXCJpbnB1dCNtaW5Db3N0XCIpLnZhbCgpO1xuICAgICAgICB2YXIgdmFsdWUyPWpRdWVyeShcImlucHV0I21heENvc3RcIikudmFsKCk7XG5cbiAgICAgICAgaWYocGFyc2VJbnQodmFsdWUxKSA+IHBhcnNlSW50KHZhbHVlMikpe1xuICAgICAgICAgIHZhbHVlMiA9IHZhbHVlMTtcbiAgICAgICAgICBqUXVlcnkoXCJpbnB1dCNtYXhDb3N0XCIpLnZhbCh2YWx1ZTIpO1xuICAgICAgICB9XG4gICAgICAgIGpRdWVyeShcIiNzbGlkZXJcIikuc2xpZGVyKFwidmFsdWVzXCIsMSx2YWx1ZTIpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vINGE0LjQu9GM0YLRgNCw0YbQuNGPINCy0LLQvtC00LAg0LIg0L/QvtC70Y9cbiAgICAgIGpRdWVyeSgnaW5wdXQjbWF4Q29zdCwgaW5wdXQjbWluQ29zdCcpLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgdmFyIGtleSwga2V5Q2hhcjtcbiAgICAgICAgaWYoIWV2ZW50KSB2YXIgZXZlbnQgPSB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlKSBrZXkgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICBlbHNlIGlmKGV2ZW50LndoaWNoKSBrZXkgPSBldmVudC53aGljaDtcbiAgICAgICAgaWYoa2V5PT1udWxsIHx8IGtleT09MCB8fCBrZXk9PTggfHwga2V5PT0xMyB8fCBrZXk9PTkgfHwga2V5PT00NiB8fCBrZXk9PTM3IHx8IGtleT09MzkgKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAga2V5Q2hhcj1TdHJpbmcuZnJvbUNoYXJDb2RlKGtleSk7IFxuICAgICAgICBpZighL1xcZC8udGVzdChrZXlDaGFyKSlcdHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdWlTbGlkZXIoKTtcblxuICAgIC8v0KDQsNGB0LrRgNGL0YLQuNC1INCy0YLQvtGA0L7Qs9C+INGD0YDQvtCy0L3RjyDQvNC10L3RjiDQsiDRgdCw0LnQtNCx0LDRgNC1XG4gICAgJCgnLmxlZnRNZW51ID4gdWwgPiBsaSA+IGEnKS5vZmYoKS5vbignY2xpY2snLCAnc3BhbicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5jbG9zZXN0KCdhJykubmV4dCgndWwnKS5zbGlkZVRvZ2dsZShzcGVlZCk7XG4gICAgfSk7XG5cbiAgICAvL9Cg0LDRgdC60YDRi9GC0LjQtSDRgtC10LvQsCDQvtC00L3QvtC5INC60LDRgtC10LPQvtGA0LjQuCDRhNC40LvRjNGC0YDQsFxuICAgICQoJy5maWx0ZXJfX25hbWUnKS5vZmYoKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ25vLWFjdGl2ZScpLm5leHQoJy5maWx0ZXJfX2JvZHknKS5zbGlkZVRvZ2dsZShzcGVlZCk7XG4gICAgfSk7XG5cbiAgICAvL9Ch0LrRgNGL0LLQsNC10Lwg0YfQsNGB0YLRjCDRhNC40LvRjNGC0YDQvtCyINC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1XG4gICAgZnVuY3Rpb24gZmlsdGVySXRlbUhpZGRlbigpIHtcbiAgICAgIHZhciBjb3VudCA9IDI7XG4gICAgICAkKCcuZmlsdGVyJykuZmluZChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5maW5kKCcuZmlsdGVyX19pdGVtJykubGVuZ3RoID4gY291bnQpIHtcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5maWx0ZXJfX2l0ZW0nKS5lcShjb3VudCAtIDEpLm5leHRBbGwoKS5maW5kKCcuZmlsdGVyX19uYW1lJykuYWRkQ2xhc3MoJ25vLWFjdGl2ZScpLm5leHQoJy5maWx0ZXJfX2JvZHknKS5jc3MoeydkaXNwbGF5Jzonbm9uZSd9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBmaWx0ZXJJdGVtSGlkZGVuKClcblxuICAgIC8v0KDQsNC30LLQvtGA0LDRh9C40LLQsNC90LjQtSDQuNC90L/Rg9GC0L7QsiDQsiDRhNC40LvRjNGC0YDQtVxuICAgIGZ1bmN0aW9uIGZpbHRlckNvbXBhbnkoKSB7XG4gICAgICB2YXIgY291bnQgPSAzLFxuICAgICAgICAgIHNlbGVjdG9yID0gJzxkaXYgY2xhc3M9XCJjb21wYW55X193cmFwXCIgLz4nLFxuICAgICAgICAgIHN3aXRjaFNlbCA9ICQoJy5maWx0ZXJfX3RvZ2dsZScpLFxuICAgICAgICAgIHN3aXRjaFNlbFRleHQgPSBzd2l0Y2hTZWwudGV4dCgpLFxuICAgICAgICAgIHN3aXRjaFNlbE5ld1RleHQgPSAnLSDQodCy0LXRgNC90YPRgtGMJztcbiAgICAgICQoJy5maWx0ZXJfX2NvbXBhbnknKS5maW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZigkKHRoaXMpLmZpbmQoJy5maWx0ZXJfX2NvbXBhbnktLWl0ZW0nKS5sZW5ndGggPiBjb3VudCkge1xuICAgICAgICAgICQodGhpcykuZmluZCgnLmZpbHRlcl9fY29tcGFueS0taXRlbScpLmVxKGNvdW50IC0gMSkubmV4dEFsbCgpLndyYXBBbGwoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXRjaFNlbC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmNvbXBhbnlfX3dyYXAnKS5zbGlkZVRvZ2dsZShzcGVlZCk7XG4gICAgICAgIGlmKCQodGhpcykudGV4dCgpID09IHN3aXRjaFNlbE5ld1RleHQpIHtcbiAgICAgICAgICAkKHRoaXMpLnRleHQoc3dpdGNoU2VsVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzKS50ZXh0KHN3aXRjaFNlbE5ld1RleHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZmlsdGVyQ29tcGFueSgpO1xuXG4gICAgJCgnLmZpbHRlcl9fc3dpdGNoJykub2ZmKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLm5leHQoJy5maWx0ZXInKS5zbGlkZVRvZ2dsZShzcGVlZCk7XG4gICAgfSk7XG5cbiAgICAkKCcuaW5mb19fY2F0ZWdvcnktLWl0ZW0nKS5vZmYoKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmluZm9fX2NhdGVnb3J5JykuZmluZCgnLm1haW5CdXR0b25zJykucmVtb3ZlQ2xhc3MoJ21haW5CdXR0b25zJyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdtYWluQnV0dG9ucycpO1xuICAgIH0pO1xuXG4gIH0pO1xuXG4gIC8v0JjQt9C80LXQvdGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDQsiDQutCw0YDRgtC+0YfQutC1INGC0L7QstCw0YDQsFxuICBmdW5jdGlvbiBxdWFudGl0eSgpIHtcbiAgICBqUXVlcnkoJzxkaXYgY2xhc3M9XCJxdWFudGl0eS1uYXZcIj48ZGl2IGNsYXNzPVwicXVhbnRpdHktYnV0dG9uIHF1YW50aXR5LXVwXCI+PC9kaXY+PGRpdiBjbGFzcz1cInF1YW50aXR5LWJ1dHRvbiBxdWFudGl0eS1kb3duXCI+PC9kaXY+PC9kaXY+JykuaW5zZXJ0QWZ0ZXIoJy5xdWFudGl0eSBpbnB1dCcpO1xuICAgIGpRdWVyeSgnLnF1YW50aXR5JykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzcGlubmVyID0galF1ZXJ5KHRoaXMpLFxuICAgICAgICBpbnB1dCA9IHNwaW5uZXIuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLFxuICAgICAgICBidG5VcCA9IHNwaW5uZXIuZmluZCgnLnF1YW50aXR5LXVwJyksXG4gICAgICAgIGJ0bkRvd24gPSBzcGlubmVyLmZpbmQoJy5xdWFudGl0eS1kb3duJyksXG4gICAgICAgIG1pbiA9IGlucHV0LmF0dHIoJ21pbicpLFxuICAgICAgICBtYXggPSBpbnB1dC5hdHRyKCdtYXgnKSxcbiAgICAgICAgcHJpY2UgPSAkKHRoaXMpLmNsb3Nlc3QoJy5jYXJkV3JhcCcpLmZpbmQoJy5wcmljZUNvdW50JyksXG4gICAgICAgIHByaWNlVmFsID0gcHJpY2UudGV4dCgpLFxuICAgICAgICBmdWxsUHJpY2UgPSAwO1xuXG4gICAgICAgIHByaWNlVmFsID0gcHJpY2VWYWwucmVwbGFjZSgnICcsJycpO1xuICAgICAgICBmdW5jdGlvbiBjYWxjUHJpY2UoKSB7XG4gICAgICAgICAgICAkKCcub3JkZXJfX3dyYXAnKS5maW5kKCcucHJpY2VDb3VudCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaSA9ICQodGhpcykudGV4dCgpLFxuICAgICAgICAgICAgICAgIGlWYWwgPSBpLnJlcGxhY2UoJyAnLCcnKTtcbiAgICAgICAgICAgIGZ1bGxQcmljZSA9IGZ1bGxQcmljZSArICtpVmFsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY1ByaWNlKCk7XG5cbiAgICAgIGlmKCQodGhpcykuY2xvc2VzdCgnLm9yZGVyX193cmFwJykubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgc2VsID0gJCh0aGlzKS5jbG9zZXN0KCcub3JkZXJfX3dyYXAnKS5maW5kKCcjZmluaXNoUHJpY2UnKTtcbiAgICAgICAgc2VsLnRleHQoZnVsbFByaWNlKTtcbiAgICAgIH1cblxuICAgICAgYnRuVXAuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHBhcnNlRmxvYXQoaW5wdXQudmFsKCkpLFxuICAgICAgICAgICAgbmV3UHJpY2VWYWw7XG4gICAgICAgIGlmIChvbGRWYWx1ZSA+PSBtYXgpIHtcbiAgICAgICAgICB2YXIgbmV3VmFsID0gb2xkVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG5ld1ZhbCA9IG9sZFZhbHVlICsgMTtcbiAgICAgICAgfVxuICAgICAgICBzcGlubmVyLmZpbmQoXCJpbnB1dFwiKS52YWwobmV3VmFsKTtcbiAgICAgICAgc3Bpbm5lci5maW5kKFwiaW5wdXRcIikudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICAgICAgbmV3UHJpY2VWYWwgPSAgbmV3VmFsICogcHJpY2VWYWw7XG4gICAgICAgIHByaWNlLnRleHQobmV3UHJpY2VWYWwpO1xuICAgICAgfSk7XG5cbiAgICAgIGJ0bkRvd24uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHBhcnNlRmxvYXQoaW5wdXQudmFsKCkpLFxuICAgICAgICAgICAgbmV3UHJpY2VWYWw7XG4gICAgICAgIGlmIChvbGRWYWx1ZSA8PSBtaW4pIHtcbiAgICAgICAgICB2YXIgbmV3VmFsID0gb2xkVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG5ld1ZhbCA9IG9sZFZhbHVlIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBzcGlubmVyLmZpbmQoXCJpbnB1dFwiKS52YWwobmV3VmFsKTtcbiAgICAgICAgc3Bpbm5lci5maW5kKFwiaW5wdXRcIikudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICAgICAgbmV3UHJpY2VWYWwgPSAgbmV3VmFsICogcHJpY2VWYWw7XG4gICAgICAgIHByaWNlLnRleHQobmV3UHJpY2VWYWwpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuICBxdWFudGl0eSgpO1xuXG4gIGZ1bmN0aW9uIHRhYnNJbkFjY29yZCgpIHtcblx0dmFyIHcgPSB3aW5kb3cuaW5uZXJXaWR0aCA/IHdpbmRvdy5pbm5lcldpZHRoIDogJCh3aW5kb3cpLndpZHRoKCksIC8v0YjQuNGA0LjQvdCwINGN0LrRgNCw0L3QsFxuXHRcdFx0d2lkdGhWYWwgPSAxMDI0LCAvL9GI0LjRgNC40L3QsCwg0LzQtdC90YzRiNC1INC60L7RgtC+0YDQvtC5INGC0LDQsdGLINGB0YLQsNC90L7QstGP0YLRgdGPINCw0LrQutC+0YDQtNC40L7QvdCw0LzQuFxuXHRcdFx0c3BlZWQgPSAyNTAsIC8v0YHQutC+0YDQvtGB0YLRjCDRgNCw0YHQutGA0YvRgtC40Y8g0LDQutC60L7RgNC00LjQvtC90L7QslxuXHRcdFx0dGFiID0gJCgnLnRhYl9faXRlbSA+IHNwYW4uYWN0aXZlJyk7IC8v0L7RgtC00LXQu9GM0L3QsNGPINCy0LrQu9Cw0LTQutCwXG5cdFxuXHRcblx0Ly/QktGL0YHRh9C40YLRi9Cy0LDQtdC8INCy0YvRgdC+0YLRgyDQutC+0L3RgtC10LnQvdC10YDQsFxuXHRcdGZ1bmN0aW9uIGNhbGNIZWlnaHQoKSB7XG5cdFx0XHR2YXIgdGFiSGVpZ2h0ID0gMDtcblx0XHRcdCQoJy50YWJfX2l0ZW0gPiBzcGFuLmFjdGl2ZScpLm5leHQoJy50YWJfX2NvbnRlbnQnKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmlubmVySGVpZ2h0KCkgPiB0YWJIZWlnaHQgKSB7XG5cdFx0XHRcdFx0IHRhYkhlaWdodCA9ICQodGhpcykuaW5uZXJIZWlnaHQoKVxuXHRcdFx0XHQgfVxuXHRcdFx0fSk7XG5cdFx0XHQkKCcudGFiJykuaGVpZ2h0KHRhYkhlaWdodCk7XG5cdFx0fVxuXHRcblx0ZnVuY3Rpb24gdGFic1N3aXRjaCgpIHtcblx0XHQkKCcudGFiX19pdGVtJykub2ZmKCkub24oJ2NsaWNrJywgJ3NwYW4nLCBmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykuY2xvc2VzdCgnLnRhYicpLmZpbmQoJCgnLnRhYl9faXRlbScpKS5maW5kKCcudGFiX19jb250ZW50JykucmVtb3ZlQXR0cihcInN0eWxlXCIpO1xuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykubmV4dCgnLnRhYl9fY29udGVudCcpLnNob3coKS5jbG9zZXN0KCcudGFiJykuZmluZCgkKCcudGFiX19pdGVtID4gc3Bhbi5hY3RpdmUnKS5ub3QoJCh0aGlzKSkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdGNhbGNIZWlnaHQoKTtcblx0XHR9KTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gYWNjb3JkT3BlbigpIHtcblx0XHQkKCcudGFiJykucmVtb3ZlQXR0cihcInN0eWxlXCIpO1xuXHRcdCQoJy50YWJfX2l0ZW0nKS5vZmYoKS5vbignY2xpY2snLCAnc3BhbicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCcudGFiX19jb250ZW50Jykuc2xpZGVUb2dnbGUoc3BlZWQpO1xuXHRcdFx0fSk7XG5cdH1cblx0XG5cdGlmICh3IDwgd2lkdGhWYWwpIHtcblx0XHRpZih0YWIubGVuZ3RoID4gMCkge1xuXHRcdFx0dGFiLmNsb3Nlc3QoJy50YWInKS5maW5kKCQoJy50YWJfX2l0ZW0gPiBzcGFuJykubm90KHRhYikubmV4dCgnLnRhYl9fY29udGVudCcpKS5jc3MoeydkaXNwbGF5Jzonbm9uZSd9KTtcblx0XHRcdHRhYi5uZXh0KCcudGFiX19jb250ZW50Jykuc2xpZGVEb3duKHNwZWVkKTtcblx0XHR9XG5cdFx0YWNjb3JkT3BlbigpO1xuICB9IGVsc2Uge1xuICAgICAgaWYodGFiLmxlbmd0aCA9PT0gMCB8fCB0YWIubGVuZ3RoID4gMSkge1xuICAgICAgICB0YWIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJy50YWJfX2NvbnRlbnQnKS5jc3MoeydkaXNwbGF5JzonYmxvY2snfSk7XG4gICAgICAgICAgJCgnLnRhYl9faXRlbTpmaXJzdCA+IHNwYW4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLnRhYicpLmZpbmQoJy50YWJfX2NvbnRlbnQnKS5jc3MoeydkaXNwbGF5JzonYmxvY2snfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsY0hlaWdodCgpO1xuICAgICAgICB0YWJzU3dpdGNoKCk7XHRcbiAgICAgIH1cbiAgICB9IFxuXG4gIHRhYnNJbkFjY29yZCgpO1xuXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgIHRhYnNJbkFjY29yZCgpO1xuICB9KTtcblxuICAvL9Cj0LTQsNC70LXQvdC40LUg0YLQvtCy0LDRgNCwINC40Lcg0LrQvtGA0LfQuNC90Ysg0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrRgNC10YHRglxuICAkKCcucHJvZHVjdF9fZGVsJykub2ZmKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5jbG9zZXN0KCcucmVzdWx0X19pdGVtJykuZGV0YWNoKCk7XG4gIH0pO1xuXG4gIC8v0J3QsNCy0LjQs9Cw0YbQuNGPINC/0L4g0YLQsNCx0LDQvCDQsiDQutC+0YDQt9C40L3QtVxuICAkKCcub3JkZXJfX25leHQnKS5vZmYoKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBhdHRyID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgJCgnLnRhYnMtcGFuZWwnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICB2YXIgc3RyID0gJyMnICsgJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgaWYoc3RyID09IGF0dHIpIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcudGFicy10aXRsZScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICQodGhpcykuZmluZCgnYScpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICBpZigkKHRoaXMpLmZpbmQoJ2EnKS5hdHRyKCdocmVmJykgPT0gYXR0cikge1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5maW5kKCdhJykuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvL9Cj0LTQsNC70LXQvdC40LUg0YLQvtCy0LDRgNCwINC40Lcg0YHRgNCw0LLQvdC10L3QuNGPXG4gICQoJy5wcm9kdWN0X19kZWxldGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9kdWN0X19pdGVtJykucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIC8vRm9ybXNcbiAgJChmdW5jdGlvbigpIHtcblxuICAgICQoXCIuanMtZm9ybVNob3dcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG4gICAgICAgICAgICBzaG93Rm9ybShlbGVtZW50Q2xpY2spO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzaG93Rm9ybShlbGVtZW50Q2xpY2spIHtcbiAgICAgICAgICAgICQoZWxlbWVudENsaWNrK1wiIC5jYWxsYmFjay1iZ3JkXCIpLnNob3coXCJzbG93XCIpO1xuICAgICAgICAgICAgdmFyIG1haW5faCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciBoID0gJChcIiAuY2FsbGJhY2stZm9ybVwiKS5oZWlnaHQoKTtcbiAgICAgICAgICAgIGlmIChtYWluX2ggPiBoKSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50Q2xpY2srXCIgLmNhbGxiYWNrLWZvcm1cIikuY3NzKFwibWFyZ2luLXRvcFwiLCAoLShoIC8gMikpICsgXCJweFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50Q2xpY2srXCIgLmNhbGxiYWNrLWZvcm1cIikuY3NzKFwibWFyZ2luLXRvcFwiLCAwKS5jc3MoXCJ0b3BcIiwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKGVsZW1lbnRDbGljaytcIiAuY2FsbGJhY2stZm9ybVwiKS5zaG93KFwic2xvd1wiKTtcbiAgICAgICAgfTtcblxuXG4gICAgJChcIi5jYWxsYmFjay1iZ3JkLCAuY2FsbGJhY2stZm9ybSAueFwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgJChcIi5jYWxsYmFjay1iZ3JkXCIpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgJChcIi5jYWxsYmFjay1mb3JtXCIpLmhpZGUoXCJzbG93XCIpO1xuICAgIH0pO1xuXG4gICAgYWxsUmVzaXplKCk7XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gYWxsUmVzaXplKCkge1xuICAgIHZhciBtYWluX2ggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgdmFyIGggPSAkKFwiLmNhbGxiYWNrLWZvcm1cIikuaGVpZ2h0KCk7XG4gICAgaWYgKG1haW5faCA+IGgpIHtcbiAgICAgICQoXCIuY2FsbGJhY2stZm9ybVwiKS5jc3MoXCJtYXJnaW4tdG9wXCIsICgtKGgvMikpICsgXCJweFwiKTtcbiAgICB9XG4gIH1cblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICBhbGxSZXNpemUoKTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICBhbGxSZXNpemUoKTtcbiAgfSwgZmFsc2UgKTtcblxufSgpKTsiXX0=
