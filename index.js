	'use strict';
	setInterval(move, 40);
	//Объявляем и находим глобальные переменные;
	let oneScore = document.getElementById('oneScore');
	let twoScore = document.getElementById('twoScore');
	let goalWidth = 30;
	let goalHeight = 200;
	let radius = 30;
	let speedY = 0; 
	let speedX = 0;
	let leftGoalPositionSpeed = 0;
	let rightGoalPositionSpeed = 0;
	let oneScoreNumber = 0;
	let twoScoreNumber = 0;
	// Находим тег CANVAS, задаём ширину, высоту и цвет нашего поля;
	let canv = document.getElementById('canvas');
	canv.width = 800;
	canv.height = 550;
	// Находим центр мячика и прибавляем скорость;
	let ballPositionY = (canv.clientTop + (canv.clientHeight / 2)) + speedY;
	let ballPositionX = (canv.clientLeft + (canv.clientWidth / 2)) + speedX;
	// Крайние точки мячика;
	let ballPositionLeftY ; 
	let ballPositionLeftX;
	let ballPositionRightY;
	let ballPositionRightX;
	// Ширина и высота 'рамки' для полёта шарика;
	let squarePlaceHeight = canv.clientTop*2 + canv.clientHeight;
	let squarePlaceWidth = canv.clientLeft*2 + canv.clientWidth;
	// Находим координаты Х у ракеток и прибавляем скорость;
	let leftGoalPosition = ((canv.clientHeight / 2) - (goalHeight / 2)) + leftGoalPositionSpeed;
	let rightGoalPosition = ((canv.clientHeight / 2) - (goalHeight / 2)) + rightGoalPositionSpeed;
	let canvGoalTopRightX = (canv.clientWidth - goalWidth); 
	let canvGoalTopLeftX = 0;
	// Создадим функцию случайных чисел для speedY и speedX;
	function randomInteger(min, max) {
		speedY = Math.floor(Math.random() * (max - min) + min);
		speedX = Math.floor(Math.random() * (max - min) + min);
	}
	randomInteger(-11, 11); 
	 // Утанавливаем обработчик, который будет двигать ракетками;
	document.addEventListener('keydown', eventDown);
	document.addEventListener('keyup', eventUp);
	function eventDown(EO){
		EO=EO||window.event;
		if (EO.keyCode == 16) 
		leftGoalPositionSpeed = -10;
		if (EO.keyCode == 17) 
		leftGoalPositionSpeed = +10;
		if (EO.keyCode == 38) 
		rightGoalPositionSpeed = -10;
		if (EO.keyCode == 40) 
		rightGoalPositionSpeed = +10;
	}
	function eventUp(EO){
		EO=EO||window.event;
		if (EO.keyCode == 16) 
		leftGoalPositionSpeed = 0;
		if (EO.keyCode == 17) 
		leftGoalPositionSpeed = 0;
		if (EO.keyCode == 38) 
		rightGoalPositionSpeed = 0;
		if (EO.keyCode == 40) 
		rightGoalPositionSpeed = 0;
	} 
	// Оформляем таблицу со счётом;
	oneScore.innerHTML = oneScoreNumber;
	twoScore.innerHTML = twoScoreNumber;
	function move() {
		// Крайние точки мячика;
		ballPositionLeftY = ballPositionY; 
		ballPositionLeftX = ballPositionX - radius;
		ballPositionRightY = ballPositionY;
		ballPositionRightX = ballPositionX + radius;
		// Создаём CANVAS;
		let ctx = canv.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = '#f98866';
		ctx.fillRect(0, 0, squarePlaceWidth, squarePlaceHeight);
		ctx.fill();
		ball();
		leftGoal();
		rightGoal();
		// 'Рамки' для ракеток;
		leftGoalPosition += leftGoalPositionSpeed;
		rightGoalPosition += rightGoalPositionSpeed;
		if (leftGoalPosition <= canv.clientTop) {
			leftGoalPosition = canv.clientTop;;
		}
		if ((leftGoalPosition + goalHeight) >= canv.clientTop + canv.clientHeight) {
			leftGoalPosition = canv.clientTop + canv.clientHeight - goalHeight;
		}
		if (rightGoalPosition <= canv.clientTop) {
				rightGoalPosition = canv.clientTop;
		}
		if ((rightGoalPosition + goalHeight) >= canv.clientTop + canv.clientHeight) {
			rightGoalPosition = canv.clientTop + canv.clientHeight - goalHeight;
		}
		// Запускаем мяч;
		ballPositionY += speedY;
		ballPositionX += speedX;
		if (ballPositionY > (squarePlaceHeight - radius)) {
			speedY = -speedY;
			ballPositionY = (squarePlaceHeight - radius);
			ballPositionY += speedY;
		}
		if (ballPositionY < (0 + radius)) {
			speedY = -speedY;
			ballPositionY = 0 + (radius);
			ballPositionY += speedY;
		}
		if (ballPositionX < (0 + radius)) {
			ballPositionX = (0 + radius);
			speedY = 0;
			speedX = 0;
			oneScoreNumber++;
			oneScore.innerHTML = oneScoreNumber;
		}
		if (ballPositionX > (squarePlaceWidth - radius)) {
			ballPositionX = (squarePlaceWidth - radius);
			speedY = 0;
			speedX = 0;
			twoScoreNumber++;
			twoScore.innerHTML = twoScoreNumber;
		}
		if ((ballPositionLeftX <= (canv.clientLeft + goalWidth)) 
		&& ((leftGoalPosition < ballPositionLeftY) 
		&& (ballPositionLeftY < (leftGoalPosition + goalHeight)))) {
			speedX = -speedX;
			ballPositionX = canv.clientLeft + goalWidth + radius;
			ballPositionX += speedX;
		}
		if (ballPositionRightX >= (canv.clientLeft + canv.clientWidth - goalWidth) 
		&& ((rightGoalPosition < ballPositionRightY) 
		&& (ballPositionRightY < (rightGoalPosition + goalHeight)))) {
			speedX = -speedX;
			ballPositionX = canv.clientLeft + canv.clientWidth - goalWidth - radius;
			ballPositionX += speedX;
		}
		// Рисуем и запускаем мяч;
		function ball() {
			ctx.beginPath();
			ctx.fillStyle  = '#80bd9e';
			ctx.arc(ballPositionX, ballPositionY, radius, 0, 2 * Math.PI);
			ctx.fill();
		}
		// Рисуем и запускаем ракетки;
		function leftGoal() {
			ctx.beginPath();
			ctx.fillStyle  = '#ff420e';
			ctx.fillRect(canvGoalTopLeftX, leftGoalPosition, goalWidth, goalHeight);
			ctx.fill();
		}
		function rightGoal() {
			ctx.beginPath();
			ctx.fillStyle  = '#89da59';
			ctx.fillRect(canvGoalTopRightX, rightGoalPosition, goalWidth, goalHeight) ;
			ctx.fill();
		}
	}
	function startGame() {
	ballPositionY = (canv.clientTop + (canv.clientHeight / 2)) + speedY;
	ballPositionX = (canv.clientLeft + (canv.clientWidth / 2)) + speedX;
	function randomInteger(min, max) {
		speedY = Math.floor(Math.random() * (max - min) + min);
		speedX = Math.floor(Math.random() * (max - min) + min);
	}
	randomInteger(-5, 5);
	move();
	}
