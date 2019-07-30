$(document).ready(function() {

    $(".toggle-mnu").click(function() {
        $(this).toggleClass("on");
        $(".top-menu").slideToggle();
        return false;
    });
    $('body, .top-menu ul li a').click(function() {
        $('.hidden-mnu').hide("slow");
    });

    /* Page Scroll to id fn call */
    $(".top_line_menu ul li a, .hidden-mnu ul li a").mPageScroll2id({
        layout: "auto",
        offset: ".top_line_box",
        autoScrollSpeed: true,
        scrollSpeed: 3000,
        highlightSelector: ".top_line_menu ul li a"
    });

    /* demo functions */
    $("a[rel='next']").click(function(e) {
        e.preventDefault();
        var to = $(this).parent().parent("section").next().attr("id");
        $.mPageScroll2id("scrollTo", to);
    });


    $('#adwise_carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 30,
        //slideSpeed           : 2500,
        //	autoplay          : true,
        autoplayTimeout: 3500,
        nav: false,
        //	dragBeforeAnimFinish : true,
        //	mouseDrag            : true,
        //	touchDrag            : true,
        //	stagePadding         : 30,
        //	stopOnHover          : false,
        //	dots                 : true
    });


    $(".our_portfolio_wrap").magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        fixedContentPos: false,
        fixedBgPos: false,
        removalDelay: 400,
        tClose: 'Закрыть (Esc)',
        mainClass: 'mfp-with-zoom',
        tLoading: 'Загрузка...',
        zoom: {
            enabled: true,
            duration: 400,
            easing: 'ease-in-out',
            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        },
        gallery: {
            enabled: true,
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