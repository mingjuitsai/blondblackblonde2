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
    // stop running Rahapel if no shape canvas
    var shapeid = "shape";
    if (document.getElementById('shape') === null ||
        document.getElementById('shape') === undefined) {
        return;
    }
    /*
		Home page shape
	*/
    //lets create an array of the paths
    var path_a_pos = new Array();
    var path_b_pos = new Array();
    // path a path
    path_a_pos.push({
        path: 'M 469.34,33.858 194.011,22.448 77.336,17.424 47,293.501 455,290.834  z'
    });
    path_a_pos.push({
        path: 'M 473,16.834 228,25.167 26.183,139.657 81.333,269.167 416.667,304.501  z'
    });
    path_a_pos.push({
        path: 'M 456.333,11.167 232.333,108.5 52.333,57.834 61,288.501 469,285.834  z'
    });
    path_a_pos.push({
        path: 'M 469.34,33.858 194.011,22.448 77.336,17.424 47,293.501 455,290.834  z'
    });
    path_a_pos.push({
        path: 'M 227.667,150.834 473.667,28.167 77.336,17.424 47,293.501 477.667,266.167  z'
    });
    path_a_pos.push({
        path: 'M 233.667,86.834 74.333,35.5 48.333,229.334 109.667,284.5 397,284.5 433.667,230 463,151.417 383,36.792   257.667,18.813  z'
    });
    // path b path
    path_b_pos.push({
        path: 'M 442.333,10.167 18.333,262.501 55.333,307.834 469.34,140.5  z'
    });
    path_b_pos.push({
        path: 'M 289.333,57.834 82,83.167 264.667,264.501 404.667,123.834  z'
    });
    path_b_pos.push({
        path: 'M 281.333,60.834 83,295.834 340.446,306.08 387.446,125.413  z'
    });
    path_b_pos.push({
        path: 'M 293.667,17.424 27,96.5 295.667,302.167 481.34,108.834  z'
    });
    path_b_pos.push({
        path: 'M 229.667,82.834 167.739,155.463 269.17,296.167 353,220.834  z'
    });
    path_b_pos.push({
        path: 'M 289.667,102.167 108.333,18.834 21.667,224.167 197,159.959 332.333,297.501 434.333,128.834   483,67.5  z'
    });

    // draw shapes
    var shape = Raphael('shape', '508', '319.919');
    var duration = 400;
    var easing = "backIn"
    // starting point 
    var path_a = shape.path("M 250 250");
    var path_b = shape.path("M 250 250");
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
    function nextShape() {
        var randoma = get_random(0, path_a_pos.length);
        var randomb = get_random(0, path_b_pos.length);
        path_a.animate(path_a_pos[randoma], duration, easing);
        path_b.animate(path_b_pos[randomb], duration, easing);
    }
    // draw first shape 
    nextShape();
    // slideshow shapes
    var interval = 2500;
    var myVar = setInterval(nextShape, interval);
    // hover nav next shape 
    $('.page_item').hover(function() {
        clearInterval(myVar);
        nextShape();
        myVar = setInterval(nextShape, interval);
    });
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