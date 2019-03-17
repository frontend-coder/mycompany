$(document).ready(function() {
	$("body").niceScroll({
horizrailenabled:false
});
// вверхнее красиво-вращающееся меню
// 1 и 2 строка это анимация крестика
//3 строка - слайдер вниз меню
//слайдер вниз меню отвечает за работу мобильного меню к переносу
$(".toggle-mnu").click(function() {
$(this).toggleClass("on");
$(".top-menu").slideToggle();
return false;
});
$('body, .top-menu ul li a').click(function () {
$('.hidden-mnu').hide("slow");
});

// pagination on lending pages
$(".top_line_menu ul li a, .hidden_mnu ul li a").mPageScroll2id({
layout                 : "auto",
offset                 : ".top_line_box",
scrollEasing           : "linear",
highlightByNextTarget  : true,
keepHighlightUntilNext : true,
autoScrollSpeed        : true,
scrollSpeed            : 1000
});



$('#adwise_carousel').owlCarousel({
	items                : 1,
	loop                 : true,
	margin               : 30,
	slideSpeed           : 2500,
	//	autoplay          : true,
	autoplayTimeout      : 3500,
	nav                  : false,
	dragBeforeAnimFinish : true,
	mouseDrag            : true,
	touchDrag            : true,
	stagePadding         : 30,
	stopOnHover          : false,
	dots                 : true
});


$(window).scroll(function(){
	console.log($(window).scrollTop());
 //   if($(window).scrollTop() > 400 && $(window).scrollTop() < 450)
if($(window).scrollTop() > 600 )
    { $(".top_line").addClass("active");
    } else {
       $(".top_line").removeClass("active"); }

});

















$(".our_portfolio_wrap").magnificPopup({
   delegate: 'a', // the selector for gallery item
    type: 'image',
    tClose: 'Закрыть (Esc)',
     mainClass: 'mfp-with-zoom',
      tLoading: 'Загрузка...',
  zoom: {
    enabled: true, // By default it's false, so don't forget to enable it

    duration: 300, // duration of the effect, in milliseconds
    easing: 'ease-in-out', // CSS transition easing function
    // The "opener" function should return the element from which popup will be zoomed in
    // and to which popup will be scaled down
    // By defailt it looks for an image tag:
    opener: function(openerElement) {
      // openerElement is the element on which popup was initialized, in this case its <a> tag
      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
      return openerElement.is('img') ? openerElement : openerElement.find('img');
    }
  },
    gallery: {
      enabled:true,
  tPrev: 'Предыдущий (Левая стрелка)', // title for left button
  tNext: 'Следующий (Правая стрелка)', // title for right button
  tCounter: '<span class="mfp-counter">%curr% из %total%</span>' // markup of counter
   }
});




//Ajax push mesege http://api.jquery.com/jquery.ajax/

$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(".forms-calldecor .success").addClass("active");
			setTimeout(function() {
				// Done Functions
				$(".forms-calldecor .success").removeClass("active");
				th.trigger("reset");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});
//castom code



});