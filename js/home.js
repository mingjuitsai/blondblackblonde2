/**
 * site.js
 *
 * Handles site functions and interactions.
 */
function get_random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function get_random_color() {
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
}
jQuery(document).ready(function($) {
    /*
		Home page shape
	*/
    // draw shapes
    var duration = 220;
    var easing = "backOut";
    var canvas_w = "160";
    var canvas_h = "90";
    var ctr_x_min = canvas_w*0.75;
    var ctr_x_max = canvas_w;
    var ctr_y_min = 0;
    var ctr_y_max = canvas_h/2;
    var cbr_x_min = canvas_w*0.75; 
    var cbr_x_max = canvas_w
    var cbr_y_min = canvas_h/2
    var cbr_y_max = canvas_h;
    var cbl_x_min = 0; 
    var cbl_x_max = canvas_w/4;
    var cbl_y_min = canvas_h/2
    var cbl_y_max = canvas_h;
    // path a path

    // add shape to each menu 
    $(".nav-menu > li").each(function(index) {
        drawshape($(".wrap-canvas")[index], index);
    });
    // function if it is Odd. alternating colors 
    function isOdd(num) {
        return num % 2 == 1;
    }
    function drawshape(target, index) {
        var shape = new Raphael(target, canvas_w, canvas_h);
        var draw = shape.path("M 60, 30");
        var bbb;
        var bbbr;
        if (isOdd(index)) {
            bbb = '#000';
            bbbr = '#F6ED0C';
        } else {
            bbb = '#F6ED0C';
            bbbr = '#000';
        }
        draw.attr({
            'stroke-width': '0',
            'stroke-opacity': '1',
            fill: bbb
        }).data('id', 'draw' + index);
        draw.animate({
            path: get_random_path(),
        }, duration, easing);

        // hover
        $(target).hover(function(ele) {
            draw.animate({
                path: get_random_path(),
                //fill: get_random_color()
            }, duration, easing);
        }, function() {
            draw.animate({
                fill: bbb
            }, duration, easing);
        });
    }

    console.log(ctr_x_min);
    function get_random_path() {
        var path = new Array();
        var m = get_random(0, 10) + " " + get_random(10, 10);
        var ctr = get_random(ctr_x_min, ctr_x_max) + " " + get_random(ctr_y_min, ctr_y_max);
        var cbr = get_random(cbr_x_min, cbr_x_max) + " " + get_random(cbr_y_min, cbr_y_max);
        var cbl = get_random(cbl_x_min, cbl_x_max) + " " + get_random(cbl_y_min, cbl_y_max);
        path.push(m, ctr, cbr, cbl);
        return "M " + path + " z";
    }

});
/*
	Music
*/
$(function() {
    var playerclass = "playlist";
    if (document.getElementsByClassName(playerclass) === null ||
        document.getElementsByClassName(playerclass) === undefined) {
        return;
    }
    // Setup the player to autoplay the next track
    a = audiojs.createAll({});
    // Multiple Playlist 
    $.each(a, function(index) {
        // Load in the first track
        var audio = a[index];
        var container = '#' + audio['wrapper'].id;
        first = $(container).next('li').children('a').attr('data-src');
        $(container).next('li').addClass('playing');
        audio.load(first);
        console.log();
        // Load in a track on click
        $(container).nextAll('li').click(function(e) {
            e.preventDefault();
            $('ol li').siblings().removeClass('playing');
            $(this).addClass('playing');
            $.each(a, function(index) {
                a[index].pause();
            });
            audio.load($(this).children('a').attr('data-src'));
            audio.play();
        });
        audio['settings']['trackEnded'] = function() {
            var next = $('.playing').next();
            if (!next.length) next = $(container).next('li');
            $('ol li').siblings().removeClass('playing');
            next.addClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
        }
        // Keyboard shortcuts
        $(document).keydown(function(e) {
            var unicode = e.charCode ? e.charCode : e.keyCode;
            // right arrow
            if (unicode == 39) {
                var next = $('li.playing').next();
                if (!next.length) next = $('ol li').first();
                next.click();
                // back arrow
            } else if (unicode == 37) {
                var prev = $('li.playing').prev();
                if (!prev.length) prev = $('ol li').last();
                prev.click();
                // spacebar
            } else if (unicode == 32) {
                audio.playPause();
            }
        });
    });
});