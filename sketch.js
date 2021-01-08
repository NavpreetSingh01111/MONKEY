
var monkey , monkey_running, monkeycollided;
var banana ,bananaImage,  obstacleImage ,obstacle, ground ;
var FoodGroup, obstacleGroup
var score = 0;

var gameState = "PLAY";
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite (50,380,20,50);
  
  monkey.addAnimation("running",monkey_running);
  
  monkey.scale = 0.2;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  ground = createSprite (200,390,600,30);
 ground.x = ground.width/2;
   ground.velocityX = -4;
  
}


function draw() {
background (255);
  
  
  if(gameState === "PLAY"){
    
       ground.velocityX = -4;
    
if (ground.x < 0){
  ground.x = ground.width/2;
}

    
  text("Score: " + score,500,50);
  
  if (keyDown("space")) {
    
    monkey.velocityY = -12;
   
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    
 spawnObstacles();
  spawnFruits();
    
    
     
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score + 3;
  } 
    if (monkey.isTouching(obstacleGroup)){
      gameState = "END";
  }
  }
  
  if(gameState === "END"){
     
  
    monkey.destroy();
    ground.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    score = 0;
    
    fill("black");
    textSize (20);
    text("GAME OVER",300,200);
  
}
  
   
  drawSprites();
  
}

function spawnObstacles(){
if(frameCount % 100 === 0){
  obstacle = createSprite(400,365,10,40);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -(6 + score/100);
  obstacle.scale = 0.2;
obstacle.Lifetime = 50;
  
  obstacleGroup.add(obstacle);
 
  }

}

function spawnFruits(){
  if (World.frameCount%40===0){
    banana= createSprite (400,200,20,20);

    banana.addImage(bananaImage);
    banana.velocityX = -7;
    banana.scale = 0.1;
    banana.lifetime = 100;
    
    banana.x = Math.round(random(100,300));
    
    
    FoodGroup.add(banana);
  }
}



