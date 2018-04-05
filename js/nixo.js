"use strict";
/*------------------------------------------

 Template: Nixo Creative Agency Template
 Author: AtypicalThemes
 Version: 1.0.0
 Last Change: 07/01/2017
 Description: Custom JS file

 -------------------------------------------*/


$(document).ready(function () {


    // SMOOTH SCROLLING TO ANCHORS
    $('a[href*=\\#]:not([href=\\#]):not(.control-right, .control-left)').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
        }
    });


    // SKILLBARS SLIDER
    jQuery('.skillbar').each(function () {
        jQuery(this).appear(function () {
            jQuery(this).find('.count-bar').animate({
                width: jQuery(this).attr('data-percent')
            }, 1000);
            var percent = jQuery(this).attr('data-percent');
            var displayPercent = jQuery(this).attr('display-value');
            jQuery(this).find('.count').html('<span>' + displayPercent + '</span>');
        });
    });

    // TESTIMONIAL SLIDER OPTIONS
    $('#carousel-testimonials').carousel({
        interval: 8000, // Interval of the slides (8s)
        pause: "hover" // Paue slides on mouse hover
    });

    // ANIMATIONS
    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top + 150;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            }
        });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    // LOAD GOOGLE MAP
    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {
        var myLatLng = {lat: 34.064417, lng: -118.371090};
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
            center: myLatLng,
            zoom: 17,
            navigationControl: true,
            mapTypeControl: true,
            scaleControl: true,
            scrollwheel: false,
            draggable: true,
            mapTypeId: 'roadmap'
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            // icon:'hero2.jpg',
            title: 'Find us here!'
        });
        marker.setMap(map);
    }

    // FORM SCRIPTS
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var name = $("#name").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        var message = $("#message").val();

        console.log('message', message);

        $.post('/moreinfo', {
            emailAddress: email,
            name: name,
            phone: phone,
            message: message
        }).done(function success() {
            formSuccess();
            console.log('it worked!');
        }).fail(function failure() {
            formError();
            submitMSG(false, 'no goood!');
            console.log('it failed!');
        })

    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }

    function formError() {
        $("#contactForm").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    // NEWSLETTER SIGNUP SCRIPTS
    $("#signupForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            signupError();
            signupMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitSignup();
        }
    });

    function submitSignup() {
        var emailsign = $("#emailsign").val();

        $.post('/newsletter', {
            emailAddress: emailsign
        }).done(function success() {
            signupSuccess();
            console.log('it worked!');
        }).fail(function failure() {
            signupError();
            signupMSG(false, 'it failed!');
            console.log('it failed!');
        })
    }

    function signupSuccess() {
        $("#signupForm")[0].reset();
        signupMSG(true, "Awesome! Thank you for subscribing!")
    }

    function signupError() {
        $("#signupForm").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function signupMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSignup").removeClass().addClass(msgClasses).text(msg);
    }

});

window.onload = function () {
    //INITIALIZE ISOTIPE
    // cache container
    var $container = $('.portfolio-grid');
    // initialize isotope
    $container.isotope({
        // options...
    });
    // filter items when filter link is clicked
    $('.portfolio-tags li a').on('click', function () {
        var selector = $(this).attr('data-filter');
        $container.isotope({filter: selector});
        return false;
    });
    // HIDE LOADING SCREEN WHEN PAGE IS LOADED
    $('#loader-wrapper').addClass('loaded');

}
