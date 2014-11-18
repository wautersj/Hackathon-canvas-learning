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
			y: Math.round(Math.random()*window.innerHeight)
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

function updateObjects(){
	for (var i = objects.length - 1; i >= 0; i--) {
		var obj = objects[i];
	}
}

function drawObjects(){
	_CONTEXT.clearRect(0, 0, window.innerWidth/2, window.innerHeight);

	if(objects.length){
		for (var i = 0; i < objects.length; i++) {
			var obj = objects[i];
		};	
	}
}