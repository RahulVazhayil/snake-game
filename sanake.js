//1.variable declaration.
var cvs = document.getElementById("canvas").getContext("2d")
var sPosx = 80;
var sPosy = 80;
var nposx = 0;
var nposy = 0;
var fposx = 180;
var fposy = 180;
var oposx = 280;
var oposy = 280;
var snakeTail =[];
var snakeSize = 1;
var score = 0;
var gameStatus ="ready";




//-2. onload function
window.onload =function(){
    document.addEventListener("keydown",inputControl);
    game = setInterval(mainGame,200);
}


//3.  main game function
function mainGame(){
    document.getElementById("game-status").innerHTML =gameStatus;
    document.getElementById("score").innerHTML =score;


// move snake

sPosx += nposx;
sPosy += nposy;

// snake movemet control

if (sPosx > 400){
    sPosx = 0;
}
if (sPosy > 400){
    sPosy = 0;
}
if (sPosx < 0){
    sPosx = 400;
}
if (sPosy < 0){
    sPosy = 400;
}


 //.Game Area

 //background colour
 cvs.fillStyle = "red";
 cvs.fillRect(0,0,400,400);

 //gridline
 for (var cl =0; cl <400; cl +=20){
 cvs.moveTo(cl,0);
 cvs.lineTo(cl,400);
 }


 for (var rl =0; rl <400; rl +=20){
    cvs.moveTo(0,rl);
    cvs.lineTo(400,rl);
    }
    cvs.strokeStyle ='gray'
    cvs.stroke();

    //snake
    cvs.fillStyle ='yellow'
    //cvs.fillRect(sPosx,sPosy, 20, 20);
    for(var i=0; i<snakeTail.length;i++){
        cvs.fillRect(
            snakeTail[i].x,snakeTail[i].y,20,20
        );
        //if snake touch its tail
        if (sPosx == snakeTail[i].x && sPosy == snakeTail[i].y && snakeSize>1){
            clearInterval(game);
            gameStatus = "Game Over";
            document.getElementById("game-status").innerHTML = gameStatus
        }

    }

    //fruit
    cvs.fillStyle ='green'
    cvs.fillRect(fposx , fposy, 20, 20);

    //object
    cvs.fillStyle ='orange'
    cvs.fillRect(oposx , oposy, 20, 20);
 
    //if snake eat apple
if (sPosx == fposx && sPosy==fposy){   
    snakeSize++;
    score += 10;
    fposx = Math.floor(Math.random()*20)*20;
    fposy = Math.floor(Math.random()*20)*20;
}

//if snake hit object
if (sPosx == oposx && sPosy==oposy){   
    snakeSize--;
    score -= 10;
    oposx = Math.floor(Math.random()*20)*20;
    oposy = Math.floor(Math.random()*20)*20;
}
snakeTail.push({x: sPosx, y:sPosy});
while(snakeTail.length > snakeSize){
    snakeTail.shift();
}

}

//4. input control function

function inputControl (e){
    console.log(e.keyCode);
    console.log(e.key);

    switch(e.keyCode) {
        case 38:
            nposy -= 20;
            nposx = 0;
            break;
        case 40:
            nposy += 20;
            nposx = 0;

            break;   
        case 39:
            nposx += 20;
            nposy = 0;
            break;
        case 37:
            nposx -= 20;
            nposy = 0;
            break;

            
    }
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 )
        gameStatus = "Game Started";
        document.getElementById("game-status").innerHTML = gameStatus


}
