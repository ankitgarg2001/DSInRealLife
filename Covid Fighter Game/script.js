function load_images(){
    player_img = new Image();
    player_img.src = "Assets/superhero.png";
    
    gem_img = new Image();
    gem_img.src = "Assets/gemm.png";
    
    virus_img = new Image();
    virus_img.src = "Assets/v1.png";
    
    game_over_img = new Image();
    game_over_img.src ="Assets/won.jfif";
}

function helper(){
    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 10
    };
    
    e2 = {
        x: 300,
        y: 150,
        w: 60,
        h: 60,
        speed: 15
    };

    e3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        speed: 20
    };

    enemy = [e1,e2,e3];

    score = 0;
    level = 1;
    print = "Score: ";
    isCollision = false;
    document.getElementById("level").innerText = "Level- "+ level;
}


document.addEventListener('keydown',function(event){
   if(game_over===true && event.key=='r'){
       init();
       helper();
       f = setInterval(gameLoop,100);
   } 
});

function init(){
    // define the objects that we will have in the game
    canvas = document.getElementById("mycanvas");
    W = 700;
    H = 400;
    canvas.width = W;
    canvas.height = H;
    pen = canvas.getContext('2d');
    game_over = false;
    
    player = {
        x: 20,
        y: H/2,
        w: 60,
        h: 60,
        speed: 20,
        moving: "false"
    };
    
    gem = {
        x: W-100,
        y: H/2,
        w: 60,
        h: 60
    };
    
    canvas.addEventListener('mousedown',function(){
        player.moving = "true";
    });
    
    canvas.addEventListener('mouseup',function(){
        player.moving = "false";
    });
    
}

function draw(){
    pen.clearRect(0,0,W,H);
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    pen.fillStyle = "white";
    pen.font = "25px Roboto";
    pen.fillText(print+score,50,50);
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(virus_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    if(game_over===true){
        pen.drawImage(game_over_img,0,0,W,H);
        pen.fillStyle = "black";
        pen.font = "50px Roboto";
        pen.fillText(print+score,270,100);
        pen.fillText("Press R to restart",200,330);
    }
}

function collision(rect1,rect2){
    if(rect1.x<rect2.x + rect2.w && 
       rect1.x+rect1.w>rect2.x && 
       rect1.y<rect2.y+rect2.h && 
       rect1.y+rect1.h>rect2.y){
            return true;
    }
    return false;
}

function update(){
    // collision between gem and player
    if(collision(gem,player) && isCollision===false){
        isCollision=true;
        score+=50;
    }
    
    for(let i=0;i<enemy.length;i++){
        if(collision(player,enemy[i])){
           game_over = true;
           return;
        }
    }
    
    if(player.moving==="true"){
        player.x += player.speed;
    }
    
    for(let i =0;i<enemy.length;i++){
        if(enemy[i].y>=H-enemy[i].h || enemy[i].y<0){
            enemy[i].speed*=-1;
        }
        enemy[i].y+=(enemy[i].speed);
    }
    
    if(player.x>=W){
        init();
        for(let i=0;i<enemy.length;i++){
            if(enemy[i].speed<0){
                enemy[i].speed -=3;
            }
            else{
                enemy[i].speed+=3;
            }
        }
        isCollision=false;
        level+=1;
        document.getElementById("level").innerText = "Level- "+ level;
    }
    
}

function gameLoop(){
    if(game_over===true){
        clearInterval(f);
        return;
    }
    update();
    draw();
}

load_images();
init();
helper();
var f = setInterval(gameLoop,100);