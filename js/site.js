/**
 * site.js
 *
 * Handles site functions and interactions.
 */
function get_random(min, max) {
return Math.floor(Math.random() * (max - min)) + min;

}
jQuery(document).ready(function($) {
	
		//var menu_size = $(".wrap-canvas").size();
		$(".nav-menu > li").each(function(index){
			var new_Xpos = get_random(30,60);
			var new_Ypos = get_random(0,30);
			var new_Xpos2 = get_random(-20,0);
			var new_Ypos2 = get_random(0,60);
			var random_color = '#'+Math.floor(Math.random()*16777215).toString(16);
			var paper = Raphael($(".wrap-canvas")[index], 100, 100);
			var shape = paper.path("M 10 10 l "+new_Xpos+" "+new_Ypos+" l "+new_Xpos2+" "+new_Ypos2+" l -10 20 z");
			shape.attr({stroke: '#777', 'stroke-width': 1});
			shape.node.setAttribute("class","shape");

			console.log(new_Xpos);

			$(this).hover(function(){
				shape.attr({'fill': random_color });
			},function(){
				shape.attr({'fill': "white" });
			});
		});

	/* Code for random shape
	var paper = new Raphael(document.getElementById('header-canvas'), 900, 250);
	var shape = paper.path("M 20 0 l 100 100 l -50 100 l -50 -70 z ");
	var shape2 = paper.path("M 180 0 l 20 130 l -40 30 l -50 -70 z ");
	shape.attr({fill:"url(http://blondblackblonde.files.wordpress.com/2013/06/mg_6463.jpg)", stroke: '#777', 'stroke-width': 1});
	shape2.attr({stroke: '#777', 'stroke-width': 1});
	shape.node.setAttribute("class","shape");
	shape2.node.setAttribute("class","shape2");

	var count= 0;
	$(".nav-menu li").hover(function(){
		if(count<15){
			var new_Xpos = get_random(20,900);
			var new_Ypos = get_random(0,250);
			var new_Xdraw = get_random(0,100);
			var new_Ydraw = get_random(0,100);
			var path = "M "+new_Xpos+" "+new_Ypos+" l "+new_Xdraw+" "+new_Ydraw+"l 20 l 4 -30 z ";
			var new_shape = paper.path(path);
			new_shape.attr({stroke: '#777', 'stroke-width': 1});
			new_shape.node.setAttribute("class","shape2");
			count++;
		}
	});
	*/
});
