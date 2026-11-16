// selectors

const board = document.querySelector(".board");

const startBtn = document.querySelector(".btn-start");

const restartBtn = document.querySelector(".btn-restart");

const modal = document.querySelector(".modal");

const startGame = document.querySelector(".start-game");

const gameOver = document.querySelector(".game-over");

const scoreElement = document.querySelector("#score");
const highScoreElement = document.querySelector("#high-score");
const timeElement = document.querySelector("#time");

let time = '00 - 00';
let score = 0;
let highScore = localStorage.getItem("highScore")? JSON.parse(localStorage.getItem("highScore")): 0;
let speed = 300;

highScoreElement.innerText = highScore;

// block-dimensions

const blockWidth = 30;
const blockHeight = 30;

// to find number of rows and columns

const cols = Math.floor(board.clientWidth/blockWidth);
const rows = Math.floor(board.clientHeight/blockHeight);

//makes blank array to contains the coordinates of each block

const blocks = [];

//array of object for snake

let snake = [
    {
        x:1,
        y:2
    },
]


let food = 
    {
        x:Math.floor(Math.random()*rows),
        y:Math.floor(Math.random()*cols)   
    }


let isIntervalId = null;

let timerId = null;


let direction = 'down';


for(let row=0; row<rows; row++){
    for(let col = 0; col<cols; col++){
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block; //coordinates for each rows and columns
}
}

//frame per second

function render(){
  
   //make one variable

   let head = null;

    //add classList for food first time

    blocks[`${food.x}-${food.y}`].classList.add("food");

    //check the snake direction

    if(direction === 'left'){
     head = {x:snake[0].x, y:snake[0].y-1};
    }

    else if(direction === 'right'){
        head = {x:snake[0].x, y:snake[0].y+1};
    }

    else if(direction === 'down'){
        head = {x:snake[0].x+1, y:snake[0].y};
    }

    else if(direction === 'up'){
        head = {x:snake[0].x-1, y:snake[0].y};
    }
    

    snake.forEach((element) => {
    blocks[`${element.x}-${element.y}`].classList.remove("fill");
    });

    //it checks if sankes head touched the boundary number of rows and columns becomes equal to the head x and y then clear the interval game is over now

    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        clearInterval(isIntervalId);//clear
        clearInterval(timerId);
        modal.style.display = "flex";//modal
        startGame.style.display = "none";//none
        gameOver.style.display = "flex";//flex
        return;
    }

    //food consume logic

    if(head.x === food.x && head.y === food.y){

     blocks[`${food.x}-${food.y}`].classList.remove("food");//dissapear

     //recalculation

     food = {
        x:Math.floor(Math.random()*rows),
        y:Math.floor(Math.random()*cols)
     };

     blocks[`${food.x}-${food.y}`].classList.add("food");//new coorfdinates

     snake.unshift(head);

     score += 10;

     scoreElement.innerText = score;

     if(score>highScore){
        localStorage.setItem("highScore", JSON.stringify(score));
     }

       if(speed>80){
        speed-=15;
        clearInterval(isIntervalId);
        isIntervalId = setInterval(render, speed);
       }
    }
    snake.unshift(head);//add at beginning

    snake.pop();//remove from end

    snake.forEach((element) => {
    blocks[`${element.x}-${element.y}`].classList.add("fill");
    });

}


startBtn.addEventListener("click", function(){
 modal.style.display = "none";
    
isIntervalId = setInterval(()=>{
    
    render();

},speed);

//destructuring

 timerId = setInterval(()=>{

   let [min, sec] = time.split("-").map(Number);

   if(sec===59){
    min+=1;
    sec = 0;
   } 
   else{
    sec += 1;
   }

   time = `${min}-${sec}`;

   timeElement.innerText = time;

},1000);

});

restartBtn.addEventListener("click", restartGame);

function restartGame(){

    //before recalculation of new state first we have to lcear previous state
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    snake.forEach((segment)=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

        if(score>highScore){
            localStorage.setItem("highScore", JSON.stringify(score));
        }

    score = 0;
    time = `00 - 00`;
    speed = 300;
    direction = 'down';
    
    scoreElement.innerText = score;
    highScoreElement.innerText = highScore;
    timeElement.innerText = time;

    modal.style.display = "none";

    //recalculation

    snake = [
        {
            x:1,y:2
        },
    ]

    food = {
        x:Math.floor(Math.random()*rows),
        y:Math.floor(Math.random()*cols)
    };

    //set interval

    isIntervalId = setInterval(()=>{
        render();
    },speed); 


    timerId = setInterval(()=>{

   let [min, sec] = time.split("-").map(Number);

   if(sec===59){
    min+=1;
    sec = 0;
   } 
   else{
    sec += 1;
   }

   time = `${min}-${sec}`;

   timeElement.innerText = time;

},1000);

}



addEventListener("keydown", (e)=>{

    console.log(e.key);
    if(e.key === "ArrowLeft"){
    direction = 'left';
    }
    else if(e.key === "ArrowRight"){
    direction = 'right';
    }
    else if(e.key === "ArrowDown"){
    direction = 'down'
    }
    else if(e.key === "ArrowUp"){
    direction = 'up';
    }

});


let touchStartX = 0;
let touchStartY = 0;

board.addEventListener("touchstart", (e)=>{
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    // console.log(e.changedTouches[0]);
},
{
 passive:true
}
);

board.addEventListener("touchend", (e)=>{
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;

    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    // Screen par har cheez Top-Left corner se count hoti hai
    //left km 
    //right zyada
    //top km
    //down zyada

    if(Math.abs(diffX)<30 && Math.abs(diffY)<30) return;

    if(Math.abs(diffX)> Math.abs(diffY)){
        if(diffX>0 && direction!=='left'){
            direction = 'right';
        }
        else if(diffX<0 && direction!=='right'){
            direction = 'left';
        }
    }

    else{
        if(diffY>0 && direction!=='up'){
            direction = 'down';
        }
        else if(diffY<0 && direction!=='down'){
            direction = 'up';
        }
    }
},
{
    passive:true
}
)
