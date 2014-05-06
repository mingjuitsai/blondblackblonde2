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
    //lets create an array of the paths
    var path_a_pos = new Array();
    var path_b_pos = new Array();
    // path a path
    path_a_pos.push({
        path: 'M 53.877,3.254 19.298,10.058 4.997,24.329 45.224,23.732 z'
    });

    // add shape to each menu 
    $(".nav-menu > li").each(function(index, ele) {
        drawshape($(".wrap-canvas")[index], index);
    });

    function drawshape(target, index) {
        var shape = new Raphael(target, '120', '60');
        var path = new Array();
        var m = get_random(0, 10) + " " + get_random(10, 10);
        var ctr = get_random(90, 120) + " " + get_random(0, 25);
        var cbr = get_random(90, 120) + " " + get_random(30, 60);
        var cbl = get_random(0, 30) + " " + get_random(30, 60);
        path.push(m, ctr, cbr, cbl);
        var draw = shape.path("M" + path + "z");
        draw.attr({
            'stroke-width': '1',
            'stroke-opacity': '1',
            fill: get_random_color()
        }).data('id', 'draw' + index);
    }

    $('.page_item').hover(function(ele) {
        clearInterval(myVar);
        nextShape($(ele).children);
        myVar = setInterval(nextShape, interval);
    });

    path_a.animate(path_a_pos[randoma], duration, easing);
    path_b.animate(path_b_pos[randomb], duration, easing);

    function nextShape(target, index) {
        var m = get_random(0, 10) + " " + get_random(10, 10);
        var ctr = get_random(90, 120) + " " + get_random(0, 25);
        var cbr = get_random(90, 120) + " " + get_random(30, 60);
        var cbl = get_random(0, 30) + " " + get_random(30, 60);
    }


    // draw shapes
    var duration = 400;
    var easing = "backIn";
    // starting point 
    //var path_a = shape.path("M 250 250");
    //var path_b = shape.path("M 250 250");
    // set both path attr
    path_a.attr({
        'stroke-width': '0',
        'stroke-opacity': '1',
        fill: get_random_color()
    }).data('id', 'path_a');
    path_b.attr({
        'stroke-width': '0',
        'stroke-opacity': '1',
        fill: '#FFFFFF'
    }).data('id', 'path_a');
    // draw random shape 

    // draw first shape 
    // slideshow shapes
    var interval = 2500;
    var myVar = setInterval(nextShape, interval);
    // hover nav next shape 

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