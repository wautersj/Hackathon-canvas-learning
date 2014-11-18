$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var objects;

function init() {
	//Caching, initializing some objects.
	_FPS = 60 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	//Create clean array
	objects = [];

	for (var i = 200 - 1; i >= 0; i--) {
		objects.push({
			x: Math.round(Math.random()*window.innerWidth),
			y: Math.round(Math.random()*window.innerHeight),
			
			color: window.randomColor(),
			
			geo: {
				type: 'circle',
				radius: 1 + Math.round(Math.random()*14)
			}
			/*
			geo: {
				type: 'square',
				width: 5 + Math.round(Math.random()*10),
				height: 5 + Math.round(Math.random()*10)
			}
			*/
		});
	};


	//Starting the Render sequence.
	render();
}

function render() {
	//Add delay to achieve maximum set framerate.
	setTimeout(function() {
		window.requestAnimationFrame(function(){
			//console.log('frame rendered !');
			//Recalling Render, to render next 'frame'.
			window.render();

			updateCanvas();
			updateObjects();
			drawObjects();
		});
	}, 1000/_FPS);
}

function updateCanvas(){
	if(_CANVAS.width !== window.innerWidth)
		_CANVAS.width = window.innerWidth;

	if(_CANVAS.height !== window.innerHeight)
		_CANVAS.height = window.innerHeight;
}

function updateObjects(){for (var i = objects.length - 1; i >= 0; i--) {
	
		var obj = objects[i];

		if(obj.geo.type=='circle'){
			//update coordinates.
			obj.y -= obj.geo.radius/10;
			obj.x += 0.5;

			//auto-update opacity.
			obj.alpha = obj.geo.radius/15;

			//move circle object over y-axis.
			if(obj.y < obj.geo.radius*-1){
				obj.y = window.innerHeight + obj.geo.radius;
			}

			//move circle object over x-axis.
			if(obj.x > window.innerWidth + obj.geo.radius){
				obj.x = obj.geo.radius *-1;
			}
		}

		if(obj.geo.type=='square'){
			//update coordinates.
			obj.y -= obj.geo.height/10;
			obj.x += 0.5;

			//move circle object over y-axis.
			if(obj.y < obj.geo.height*-1){
				obj.y = window.innerHeight + obj.geo.height;
			}

			//move circle object over x-axis.
			if(obj.x > window.innerWidth + obj.geo.width){
				obj.x = obj.geo.width *-1;
			}
		}
	};
}

function drawObjects(){
	//draw part 1 of dual effect screen
	_CONTEXT.clearRect(0, 0, window.innerWidth/2, window.innerHeight);

	//draw part 2 of dual effect screen
	_CONTEXT.globalAlpha = 0.045;
	_CONTEXT.fillStyle = '#000000';
    _CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
    _CONTEXT.globalAlpha = 1;

	if(objects.length){
		for (var i = 0; i < objects.length; i++) {
			var obj = objects[i];

			switch(obj.geo.type) {
				case 'circle': drawCircle(obj); break;
				case 'square': drawSquare(obj); break;
			}
		};	
	}
}

function drawCircle(obj){
	_CONTEXT.globalAlpha = obj.alpha;
	_CONTEXT.fillStyle = obj.color;
	_CONTEXT.beginPath();
	_CONTEXT.arc(obj.x,obj.y,obj.geo.radius,0,Math.PI*2,true);
	_CONTEXT.closePath();
	_CONTEXT.fill();
}

function drawSquare(obj){

	_CONTEXT.globalAlpha = obj.alpha;
	_CONTEXT.fillStyle = obj.color;
	_CONTEXT.beginPath();
	_CONTEXT.rect(obj.x,obj.y,obj.geo.width,obj.geo.height);
	_CONTEXT.closePath();
	_CONTEXT.fill();
}

window.randomColor = function() {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}