$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var objects;

function init() {
	//Caching, initializing some objects.
	_FPS = 40 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	//Create clean array
	objects = [];


	//Starting the Render sequence.
	render();

	setInterval(squaresTimer,500);
}

function squaresTimer(){
	

	console.log('Create Square');
	var square = createSquare();
	objects.push(square);
}

function createSquare(x,y){
	return {
		x: window.innerWidth/2,
		y: window.innerHeight/2,
		radius: 1,
		opacity: 1
	}
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

		obj.radius *= 1.2;

		obj.x = window.innerWidth/2;
		obj.y = window.innerHeight/2;

		if(obj.radius>window.innerHeight/2){
			objects.shift();
			console.log('obj removed');
		}
	}
}

var degrees = 0;
function drawObjects(){
	//draw part 1 of dual effect screen
	//_CONTEXT.clearRect(0, 0, window.innerWidth/2, window.innerHeight);


	//draw part 2 of dual effect screen
	_CONTEXT.globalAlpha = 0.05;
	_CONTEXT.fillStyle = '#000000';
    _CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
    _CONTEXT.globalAlpha = 1;
    


	if(objects.length){
		for (var i = 0; i < objects.length; i++) {
			var obj = objects[i];




			_CONTEXT.globalAlpha = 1 - (obj.radius/(window.innerHeight/2));
			_CONTEXT.fillStyle = '#FFFFFF';
			_CONTEXT.beginPath();
			_CONTEXT.strokeStyle="red";
			_CONTEXT.arc(obj.x,obj.y,obj.radius,0,Math.PI*2,true);
			_CONTEXT.stroke();
			_CONTEXT.closePath();
			
		};	
	}
}