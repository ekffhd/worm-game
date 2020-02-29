const gameCanvas = document.getElementById('gameCanvas');
const gameCtx = gameCanvas.getContext('2d');

const cellColumnCount = 50;
const cellRowCount = 50;
const cellWidth = gameCanvas.width / cellColumnCount;
const cellHeight = gameCanvas.height / cellRowCount;

let startXPoint = cellColumnCount / 2;
let startYPoint = cellRowCount / 2;

let feedX;
let feedY;

let direction; // 0: stop, 1: left, 2: up, 3: right, 4: down;
let score;
let worm;
let length;
let interval;

function init(){
    direction = 0; // 0: stop, 1: left, 2: up, 3: right, 4: down;
    worm = [];
    worm[0] = {x: startXPoint, y: startYPoint};
    length = 1;
    score = 0;

    drawCell();
    makeFeed();
    interval = setInterval(draw, 50);
}

function drawScore(){
    gameCtx.font = "16px Arial";
    gameCtx.fillStyle = "#fff";
    gameCtx.fillText("Score : " + score, 20, 20);
}

function drawworm(){

    gameCtx.beginPath();
    for(let i=0; i<length; i++){
        gameCtx.rect(cellWidth*worm[i].x, cellHeight*worm[i].y, cellWidth, cellHeight);
        gameCtx.fillStyle="white";
        gameCtx.fill();
    }
    gameCtx.closePath();
}

function drawFeed(){
    gameCtx.beginPath();
    gameCtx.rect(cellWidth*feedX, cellHeight*feedY, cellWidth, cellHeight);
    gameCtx.fillStyle="red";
    gameCtx.fill();
    gameCtx.closePath();
}

function drawCell(){
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawScore();
    drawworm();
    drawFeed();
}

function keyDownHandler(e){
    if(e.keyCode === 37 ){ // left
        direction = 1;
    }
    else if(e.keyCode === 38){ // up
        direction = 2;
    }
    else if(e.keyCode === 39){ // right
        direction = 3;
    }
    else if(e.keyCode === 40){ // down
        direction = 4;
    }
}

function moveworm(){
    let nextX = worm[0].x;
    let nextY = worm[0].y;
    switch(direction){
        case 1:
            nextX--;
            break;
        case 2:
            nextY--;
            break;
        case 3:
            nextX++;
            break;
        case 4:
            nextY++;
            break;
        default:
            break;
    }

    if(nextX === feedX && nextY === feedY){
        eatFeed();
    }
    else{
        worm.pop();
        worm.unshift({x: nextX, y: nextY});
    }
}

function checkCrush(){
    return worm[0].x < 0 || worm[0].x > cellColumnCount-1 ||
        worm[0].y < 0 || worm[0].y > cellRowCount-1
}

function checkGameOver(){

    if(checkCrush()){
        alert("Game Over!");
        clearInterval(interval);
        init();
    }
    for(let i = 1; i<length; i++){
        if( (worm[0].x === worm[i].x && worm[0].y === worm[i].y) ){

            alert("Game Over!");
            clearInterval(interval);
            init();

        }
    }
}

function draw(){
    moveworm();
    drawCell();
    checkGameOver();
}

function getRandomNum(upDown){
    if(upDown){
        return Math.floor(Math.random() * cellRowCount);
    }
    else{
        return Math.floor(Math.random() * cellColumnCount);
    }
}

function makeFeed(){
    feedX = getRandomNum(0);
    feedY = getRandomNum(1);
}

function eatFeed(){
    worm.unshift({x: feedX, y: feedY});
    length++;
    score++;
    makeFeed();
}

document.addEventListener('keydown', keyDownHandler, false);

init();
