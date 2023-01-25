canvas = document.getElementById("snake-canvas");
document.addEventListener("keydown", user_input);
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

setInterval(cycle, 1000/10);

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
    
    output.fillStyle="green";
    // output.fillRect(player_posX*tileSize, player_posY*tileSize, tileSize, tileSize);

    for (i = 0; i < tails.length; i++){
        output.fillRect(tails[i].x*tileSize, tails[i].y*tileSize,tileSize, tileSize);
        if (tails[i].x == player_posX && tails[i].y == player_posY){
            tail = tail - i;
        }
        if (i == tails.length-1){
            output.fillStyle="lime";
            output.fillRect(tails[i].x*tileSize, tails[i].y*tileSize,tileSize, tileSize);
        }
    }
    
    tails.push({x:player_posX, y:player_posY});
    while (tails.length > tail){
        tails.shift();
    }

    if (player_posX == apple_posX && player_posY == apple_posY){
        newApple();
        appleAudio.play();
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
}

function newApple(){
    apple_posX = Math.floor(Math.random()*sizeX);
    apple_posY = Math.floor(Math.random()*sizeY);
    addTail();
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