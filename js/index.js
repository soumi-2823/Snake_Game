// Game constants & variables
let inputDir = {x:0,y:0};
const foodSound = new Audio('Music/eating_sound.mp3');
const gameOverSound = new Audio('Music/game_over.mp3');
const moveSound = new Audio('Music/move.mp3');
const musicSound = new Audio('Music/bg_music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
food = {x: 6, y:7};

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1 ; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x >=18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}
function gameEngine(){
    musicSound.play();
    // Part 1 : Updating the snake array & Food (locations of bodypart)
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press ENTER to play again!");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    // if you have eaten the food , increment the score and regenerate the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiScore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score :" + hiscoreval;
        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a +(b-a)* Math.random()), y: Math.round(a +(b-a)* Math.random())}
    }

    //Moving the snake 
    for(let i = snakeArr.length - 2;i>= 0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    // Part 2 : Display the snake and Food
    // Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}

//Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiScore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiscoreval));   
} 
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score :" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y:1} //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});