function init(){
    var canvas = document.getElementById("myCanvas");
    W = H = canvas.width = canvas.height = 1000;
    pen  = canvas.getContext('2d');
    cs=66;
    food = getRandomFood();
    game_over = false;
    score = 5;
    food_img = new Image();
    food_img.src = "Assets/apple.png";
    tropy = new Image();
    tropy.src = "Assets/trophy.png";
    gameOver = new Image();
    gameOver.src = "Assets/gameOver.png"; 
    restart = "Press R to Restart";
    snake  = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }
        },
        updateSnake:function(){

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX==food.x && headY==food.y){
                console.log("Food eaten");
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            var X,Y;
            if(this.direction=="left"){
                X = headX-1;
                Y= headY;
            }
            else if(this.direction=="right"){
                X = headX+1;
                Y= headY;
            }
            else if(this.direction=="down"){
                X = headX;
                Y= headY+1;
            }
            else if(this.direction=="up"){
                X = headX;
                Y= headY-1;
            }
            this.cells.unshift({x:X,y:Y});
            for(var i=1;i<this.cells.length;i++){
                if(this.cells[0].x==this.cells[i].x && this.cells[0].y==this.cells[i].y){
                    console.log("Bit Himself");
                    game_over = true;
                }
            }
            var last_x = (W/cs);
            var last_y = (H/cs);
            if(game_over==false && (this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_x || this.cells[0].y > last_y)){
                game_over = true;
            }
        }   
    };
    snake.createSnake();
    function KeyPressed(event){
        if(event.key=="ArrowUp"){
            snake.direction = "up";
        }
        else if(event.key=="ArrowRight"){
            snake.direction = "right";
        }
        else if(event.key=="ArrowLeft"){
            snake.direction = "left";
        }
        else if(event.key=="ArrowDown"){
            snake.direction = "down";
        }
        else if(game_over==true && event.key=="r"){
            init();
            f = setInterval(gameLoop,100);
        }
        console.log(event.key);
    }
    document.addEventListener('keydown',KeyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(tropy,18,20,cs,cs);
    pen.fillStyle = "blue";
    pen.font = "25px Roboto";
    pen.fillText(score,50,50);

}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    } 
    return food;
}

function update(){
    snake.updateSnake();
}

function gameLoop(){
    if(game_over==true){
        clearInterval(f);
        pen.drawImage(gameOver, 0,0,1000,1000);
        pen.fillStyle = "red";
        pen.font = "50px Roboto";
        pen.fillText(restart,330,800);
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameLoop,100);