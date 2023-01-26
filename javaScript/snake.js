canvas = document.getElementById("snake-canvas");
document.addEventListener("keydown", user_input);
lengthDiv = document.getElementById("score");
speedDiv = document.getElementById("speed");
appleDiv = document.getElementById("apples-eaten");
applesEaten = 0;

output = canvas.getContext("2d");

width = canvas.clientWidth;
height = canvas.clientHeight;

tileSize = 20;
sizeX = width / tileSize;
sizeY = height / tileSize;

player_dirX = 0;
player_dirY = -1;

player_posX = 10;
player_posY = 10;

apple_posX = Math.floor(Math.random()*sizeX);
apple_posY = Math.floor(Math.random()*sizeY);

speed = 10;

intervalID = setInterval(cycle, 1000/speed);

win = 50;

tail = 5;
tails = [];

var appleAudio = new Audio("../audio/MunchBiteSoundEffect.mp3");
var winAudio = new Audio("../audio/YippeeOriginalSoundEffect.mp3");

function cycle(){
    player_posX += player_dirX;
    player_posY += player_dirY;

    if (player_posX < 0){
        player_posX = sizeX -1;
    }
    if (player_posY < 0){
        player_posY = sizeY -1;
    }

    if (player_posX > sizeX -1){
        player_posX = 0;
    }
    if (player_posY > sizeY -1){
        player_posY = 0;
    }

    output.fillStyle="black";
    output.fillRect(0,0, canvas.width, canvas.height);
    
    output.fillStyle="lime";
    output.fillRect(player_posX*tileSize, player_posY*tileSize, tileSize, tileSize);
    output.fillStyle="green";

    for (i = 0; i < tails.length; i++){
        output.fillRect(tails[i].x*tileSize, tails[i].y*tileSize,tileSize, tileSize);
        if (tails[i].x == player_posX && tails[i].y == player_posY){
            tail = tail - i;
            lengthDiv.value = tail;
        }
    }
    
    tails.push({x:player_posX, y:player_posY});
    while (tails.length > tail){
        tails.shift();
    }

    if (player_posX == apple_posX && player_posY == apple_posY){
        applesEaten++;
        appleDiv.value = applesEaten;
        newApple();
        appleAudio.play();
        addTail();
        if (tail == win){
            winAudio.play();
            tail = 5;
        }
    }
    
    output.strokeStyle = "red";
    output.lineWidth = tileSize/2;
    output.beginPath();
    output.arc(apple_posX*tileSize+(tileSize/2), apple_posY*tileSize+(tileSize/2), tileSize/4, 0, 2*Math.PI);
    output.stroke();
}

function addTail(){
    tail++;
    tails.push({x:player_posX, y:player_posY});
    lengthDiv.value = tail;
}

function newApple(){
    apple_posX = Math.floor(Math.random()*sizeX);
    apple_posY = Math.floor(Math.random()*sizeY);

    for (i = 0; i < tails.length; i++){
        if (tails[i].x == apple_posX && tails[i].y == apple_posY){
            newApple()
            break;
        } 
    }
}

function user_input(input){
    switch(input.key){
        case "ArrowLeft":
            if (player_dirX != 1){
                player_dirX = -1;
                player_dirY = 0;
            }
            break;
        case "ArrowUp":
            if (player_dirY != 1){
                player_dirX = 0;
                player_dirY = -1;
            }
            break;
        case "ArrowRight":
            if (player_dirX != -1){
                player_dirX = 1;
                player_dirY = 0;
            }
            break;
        case "ArrowDown":
            if (player_dirY != -1){
                player_dirX = 0;
                player_dirY = 1;
            }
            break;
    }
}

function speedUp(){
    speed++;
    clearInterval(intervalID);
    intervalID = setInterval(cycle, 1000/speed);
    speedDiv.value = speed;
}

function speedDown(){
    if (speed != 1){
        speed--;
        clearInterval(intervalID);
        intervalID = setInterval(cycle, 1000/speed);
        speedDiv.value = speed;
    }
}