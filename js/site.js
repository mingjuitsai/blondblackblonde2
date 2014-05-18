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
        var shape = new Raphael(target, '120', '60');
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

    function get_random_path() {
        var path = new Array();
        var m = get_random(0, 10) + " " + get_random(10, 10);
        var ctr = get_random(90, 120) + " " + get_random(0, 25);
        var cbr = get_random(90, 120) + " " + get_random(30, 60);
        var cbl = get_random(0, 30) + " " + get_random(30, 60);
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