$(document).ready(init);

var _FPS;
var _CANVAS;
var _CONTEXT;

var player;
var enemys;
var bullets;

var playerGraphic;
var enemyGraphic;

var canShoot = true;

function init() {
	//Caching, initializing some objects.
	_FPS = 8;
	_CANVAS = document.getElementById('myCanvas');
	_CONTEXT = _CANVAS.getContext("2d");

	//Set players init position
	player = {
		x: window.innerWidth/2,
		y: window.innerHeight - 20,

		directionX: 0,
		directionY: 0
	}

	//Create clean enemeys array
	enemys = [];

	//Create clean bullets array
	bullets = [];

	preloadGraphics(function(){
		render();
		addInteractivity();
		setInterval(updateEnemys, 500)

		setTimeout(addEnemey, 1000);
	});
}

function preloadGraphics(callback){
	playerGraphic = {
		name: 'player',
		url: 'assets/player.png',
		img: null
	}

	enemyGraphic = {
		name: 'enemy',
		url: 'assets/enemy.png',
		img: null
	}

	var que = [playerGraphic, enemyGraphic];

	function load(){
		if(que.length>0){
			var item = que.shift();

			var img = new Image();
			img.onload = function(){
				console.log('Preloaded img: ' + item.name);

				//Save the img context
				item.img = this;

				//Load next item in que
				load();
			}

			img.src = item.url;
		} else {
			console.log('Preloaded Complete: Start game');

			//Preload complete, start render
			callback();
		}
	}

	//Start load
	load();
}

function addInteractivity(){
	document.onkeydown = function(event) {
		if(event.keyCode==37) {
			player.directionX = -1;
		} else if(event.keyCode==39) {
			player.directionX = 1;
		}

		if(event.keyCode==32){
			playerShoot();
		}
	}

	document.onkeyup = function(event){
		if(event.keyCode==37 && player.directionX == -1) {
			player.directionX = 0;
		} else if(event.keyCode==39 && player.directionX == 1) {
			player.directionX = 0;
		}
	}
}

function addEnemey(){
	var xOnGrid = Math.round((window.innerWidth/enemyGraphic.img.width)*Math.random())*enemyGraphic.img.width;

	var newEnemy = {
		x: xOnGrid,
		y: 20,

		directionX: 0,
		directionY: 1
	}

	enemys.push(newEnemy);

	window.requestAnimationFrame(function(){
		setTimeout(addEnemey, 1001 + Math.round(Math.random()*1000));
	});
}

function playerShoot(){
	if(canShoot==true){
		canShoot = false;

		var newBullet = {
			x: player.x,
			y: player.y - 50,

			width: 8,
			height: 16
		}

		bullets.push(newBullet);

		setTimeout(function(){
			canShoot = true;
		},500);
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
	player.x += player.directionX*40;

	if(bullets.length>0){
		for (var i = bullets.length - 1; i >= 0; i--) {
			var bullet = bullets[i];
			bullet.y -= 40;


			for (var j = enemys.length - 1; j >= 0; j--) {
				var e = enemys[j];

				if(doCollide(bullet,e)){
					//ASSIGNMENT
					//Remove from lists bullets and enemys
				}
			};
		}
	}
}

function updateEnemys(){
	if(enemys.length>0){
		for (var i = enemys.length - 1; i >= 0; i--) {
			var enemy = enemys[i];
			enemy.y += enemyGraphic.img.height;

			if(enemy.y > player.y-playerGraphic.img.height){
				//alert('Game Over!');
				window.location = window.location.href;
			}
		}
	}
}

function doCollide(bullet, enemy){
	//ASSIGNMENT
	return false;
}

function drawObjects(){
	_CONTEXT.clearRect( 0, 0, _CANVAS.width, _CANVAS.height);

	if(player){
		var pGraphic = playerGraphic;

		_CONTEXT.drawImage(pGraphic.img, 
			0, 0, pGraphic.img.width, pGraphic.img.height,
			player.x - (pGraphic.img.width/2), player.y - pGraphic.img.height, pGraphic.img.width, pGraphic.img.height
		);
	}

	if(enemys.length>0){
		for (var i = enemys.length - 1; i >= 0; i--) {
			var enemy = enemys[i];
			var eGraphic = enemyGraphic;

			_CONTEXT.drawImage(eGraphic.img, 
				0, 0, eGraphic.img.width, eGraphic.img.height,
				enemy.x, enemy.y, eGraphic.img.width, eGraphic.img.height
			);
		};
	}

	if(bullets.length>0){
		for (var i = bullets.length - 1; i >= 0; i--) {
			var bullet = bullets[i];

			_CONTEXT.fillStyle="#FF0000";
			_CONTEXT.fillRect(bullet.x - (bullet.width/2),bullet.y - (bullet.height/2),bullet.width,bullet.height);
		};
	}
}
