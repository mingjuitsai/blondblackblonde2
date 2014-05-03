/**
 * site.js
 *
 * Handles site functions and interactions.
 */
function get_random(min, max) {
return Math.floor(Math.random() * (max - min)) + min;

}
jQuery(document).ready(function($) {
	

//lets create an array of the shapes
var path_a_pos=new Array();
var path_b_pos=new Array();

path_a_pos.push({path: 'M 469,15.833 111.667,45.167 30.034,134.021 53,287.834 469,295.167  z', fill: '#000000'});
path_a_pos.push({path: 'M 473,16.834 228,25.167 26.183,139.657 81.333,269.167 416.667,304.501  z'});
path_b_pos.push({path: 'M 378,70.5 125.833,167.833 187.916,253.834 378,129.833  z',fill: '#FFFFFF'});
path_b_pos.push({path: 'M 289.333,57.834 82,83.167 264.667,264.501 404.667,123.834  z'});

// draw shapes 
var shape = Raphael('shape', '508', '319.919');
var currentshape = 0;
var path_a = shape.path("M 150 100");
var path_b = shape.path("M 250 100");
path_a.attr({'stroke-width': '0','stroke-opacity': '1',fill: path_a_pos[0].fill}).data('id', 'path_a');
path_a.animate(path_a_pos[currentshape], 300,'backOut');

path_b.attr({'stroke-width': '0','stroke-opacity': '1',fill: path_a_pos[0].fill}).data('id', 'path_a');
path_b.animate(path_b_pos[currentshape], 300,'backOut');



	
setTimeout(nextShape,3000);

function nextShape(){
	var duration = 1000;
	var easing = "<>";
	currentshape++;
	if (currentshape >= path_a_pos.length) {
    	currentshape=0;
    }
	path_a.animate(path_a_pos[currentshape], 300,'backOut');
	path_b.animate(path_b_pos[currentshape], 300,'backOut');
	setTimeout(nextShape,3000);
}


	
	
});

