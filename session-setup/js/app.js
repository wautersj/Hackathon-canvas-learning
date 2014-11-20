$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var objects;

var emitters;
var emit = true;

function init() {
	//Caching, initializing some objects.
	_FPS = 45 ;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	//Create clean array
	objects = [];

	//Set coords of emitter
	emitters = [];

	emitters.push({
		x: (window.innerWidth/4)*1,
		y: window.innerHeight-100,
		color: '#f43900'
	});

	emitters.push({
		x: window.innerWidth/2,
		y: window.innerHeight-100,
		color: '#82f100'
	});

	emitters.push({
		x: (window.innerWidth/4)*3,
		y: window.innerHeight-100,
		color: '#005af0'
	});

	createBall();

	//Starting the Render sequence.
	render();

	document.body.onmousedown = function(){
		if(emit==false){
			emit = true;
			createBall();
		}
	}

	document.body.onmouseup = function(){
		emit = false;
	}
}

function createBall(){

	for (var e = emitters.length - 1; e >= 0; e--) {
		var emitter = emitters[e];

		for (var i = 3; i > 0; i--) {
			var weight = 7 + Math.round(Math.random()*15);
			var ball =  {
				x: emitter.x,
				y: emitter.y,

				speedX: ((Math.random()*2)-1)*10,
				speedY: -40 - (Math.random()*((20 - weight)*1.5)),

				radius: weight,
				color: emitter.color,
				alpha: (22 - weight)/20
			}

			objects.push(ball);	
		};
	};

	requestAnimationFrame(function(){
		if(emit){
			setTimeout(function(){
				createBall();
			},1000/30);
		}
	});
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

	//emitter.x = window.innerWidth/2;
	//emitter.y = window.innerHeight;

	for (var i = emitters.length - 1; i >= 0; i--) {
		var emitter = emitters[i];
		emitter.x = (window.innerWidth/4)*(i+1);
	};
}

function updateObjects(){
	for (var i = objects.length - 1; i >= 0; i--) {
		var obj = objects[i];

		obj.x += obj.speedX;
		obj.y += obj.speedY;

		obj.speedX -= (obj.speedX/Math.abs(obj.speedX))*0.2;
		obj.speedY += 2;

		//obj.alpha = obj.radius/40;

		if(obj.y>(window.innerHeight-obj.radius)){
			var index = objects.indexOf(obj);

			obj.speedY = obj.radius/10;

			if(obj.alpha>0.1){
				obj.alpha -= 0.01;
			}

			if(obj.y>(window.innerHeight+obj.radius)){
				objects.splice(index,1);
			}
		}
	}
}



var degrees = 0;
function drawObjects(){
	//draw part 1 of dual effect screen
	//_CONTEXT.clearRect(0, 0, window.innerWidth/2, window.innerHeight);


	//draw part 2 of dual effect screen
	_CONTEXT.globalAlpha = 0.7;
	_CONTEXT.fillStyle = '#000000';
    _CONTEXT.fillRect(0,0,window.innerWidth,window.innerHeight);
    _CONTEXT.globalAlpha = 1;

	if(objects.length){
		for (var i = 0; i < objects.length; i++) {
			var obj = objects[i];	

			_CONTEXT.globalAlpha = obj.alpha;
			_CONTEXT.fillStyle = obj.color;  //off

			//_CONTEXT.strokeStyle = '#FFFFFF';
			_CONTEXT.beginPath();
			_CONTEXT.arc(obj.x,obj.y,obj.radius,0,Math.PI*2,true);
			//_CONTEXT.stroke();
			_CONTEXT.fill(); //off
			_CONTEXT.closePath();
			
		};	
	}
}