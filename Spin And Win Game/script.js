// Hello World of Phaser  = Basic Game = Single scene in Spin & Win Game
// How to create the basic skeleton for the game --> Game Loop

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin","CB Tshirt","CB Book"]
}

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height:600,
    backgroundColor : 0xffcc00,
    scene: {
        preload : preload,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    this.load.image('background','Assets/back.jpg');
    this.load.image('wheel','Assets/wheel.png');
    this.load.image('pin','Assets/pin.png');
    this.load.image('stand','Assets/stand.png');
}
function create(){
    console.log("Create");
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(W/2,H/2,'background');
    background.setScale(0.20);
    
    let stand = this.add.sprite(W/2,H/2+250,'stand');
    stand.setScale(0.25);
    
    this.wheel = this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.25);
    
    let pin  = this.add.sprite(W/2,H/2-250,'pin');
    pin.setScale(0.25);
    
    this.input.on("pointerdown",spinwheel,this);
    
    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "red"
    } 
    
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);

}
function update(){
    console.log("Inside update");
}

function spinwheel(){
    console.log("start spinning");
    
    let rounds = Phaser.Math.Between(2,5);
    let degree = Phaser.Math.Between(0,11)*30;
    let totalangle = rounds*360 + degree;
    
    let idx = prizes_config.count - 1 - Math.floor(degree/(360/prizes_config.count)); 
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: totalangle,
        ease:"Cubic.easeOut", // For slowing down effect
        callbackScope:this,
        duration: 6000,
        onComplete: function(){
            this.game_text.setText("You Won "+ prizes_config.prize_names[idx]);
        }
    }); 
    
}
