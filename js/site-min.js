function get_random(d, c) {
    return Math.floor(Math.random() * (c - d)) + d
}

function get_random_color() {
    return "#" + (16777216 + 16777215 * Math.random()).toString(16).substr(1, 6)
}
jQuery(document).ready(function(d) {
    function c(c, k) {
        var g = (new Raphael(c, "120", "60")).path("M 60, 30"),
            h;
        h = 1 == k % 2 ? "#000" : "#F6ED0C";
        g.attr({
            "stroke-width": "0",
            "stroke-opacity": "1",
            fill: h
        }).data("id", "draw" + k);
        g.animate({
            path: e()
        }, b, f);
        d(c).hover(function(c) {
            g.animate({
                path: e(),
                fill: get_random_color()
            }, b, f)
        }, function() {
            g.animate({
                fill: h
            }, b, f)
        })
    }

    function e() {
        var b = [],
            c = get_random(0, 10) + " " + get_random(10, 10),
            d = get_random(90, 120) + " " + get_random(0, 25),
            e = get_random(90, 120) + " " + get_random(30, 60),
            f = get_random(0,
                30) + " " + get_random(30, 60);
        b.push(c, d, e, f);
        return "M " + b + " z"
    }
    var b = 200,
        f = "backOut";
    d(".nav-menu > li").each(function(b) {
        c(d(".wrap-canvas")[b], b)
    })
});
$(function() {
    null !== document.getElementsByClassName("playlist") && void 0 !== document.getElementsByClassName("playlist") && (a = audiojs.createAll({}), $.each(a, function(d) {
        var c = a[d],
            e = "#" + c.wrapper.id;
        first = $(e).next("li").children("a").attr("data-src");
        $(e).next("li").addClass("playing");
        c.load(first);
        console.log();
        $(e).nextAll("li").click(function(b) {
            b.preventDefault();
            $("ol li").siblings().removeClass("playing");
            $(this).addClass("playing");
            $.each(a, function(b) {
                a[b].pause()
            });
            c.load($(this).children("a").attr("data-src"));
            c.play()
        });
        c.settings.trackEnded = function() {
            var b = $(".playing").next();
            b.length || (b = $(e).next("li"));
            $("ol li").siblings().removeClass("playing");
            b.addClass("playing");
            c.load($("a", b).attr("data-src"));
            c.play()
        };
        $(document).keydown(function(b) {
            b = b.charCode ? b.charCode : b.keyCode;
            39 == b ? (b = $("li.playing").next(), b.length || (b = $("ol li").first()), b.click()) : 37 == b ? (b = $("li.playing").prev(), b.length || (b = $("ol li").last()), b.click()) : 32 == b && c.playPause()
        })
    }))
});