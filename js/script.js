(function( $ ){

	function getAngle (x1, y1, x2, y2) {

	    var radians = Math.atan2( ( x2 - x1 ), ( y2 - y1 ) );
	    var degree = (radians * (180 / Math.PI) * -1) + 180;

	    return degree;
	}

	var set = false, thread = false, counter = 0, temp_count = 0;

	$(document).ready(function(){

		$("body").mousemove(function(e) {                 
		    
			if (!set) {
				x1  = e.pageX, // set starting mouse x
				y1  = e.pageY, // set starting mouse y
				set = true;
			}   
			
			if( thread ){
				clearTimeout(thread);
			}

			thread = setTimeout( callback.bind( this, e ), 5 );

		});

		function callback(e) {

		    var x2 = e.pageX; // new X
		    var y2 = e.pageY; // new Y

		    if( x1 == x2 && y1 == y2 ){
		    	return;
		    }

            if( counter % 5 == 0 ){

			    var dot = document.createElement('div');
			    dot.style.left = x1 + "px";
			    dot.style.top  = y1 + "px";

			    var degree = getAngle( x1, y1, x2, y2 );
			
				$( dot ).css('-moz-transform', 'rotate(' + degree + 'deg)')
		           .css('-webkit-transform', 'rotate(' + degree + 'deg)')
		           .css('-o-transform', 'rotate(' + degree + 'deg)')
		           .css('-ms-transform', 'rotate(' + degree + 'deg)');

		        if( temp_count % 2 == 0 ){
		    		dot.className  = "dot right";
		        }else{
		        	dot.className = "dot left";
		        }   
		        
				document.body.appendChild(dot);

				setTimeout( function(){
					$( dot ).fadeOut( 800, 'swing', function(){
						$( this ).remove();
					});
				},200);

		    	counter = 0;
		    	temp_count++;
            }

       		counter++;
			set = false;
		} 
	});
})(jQuery)