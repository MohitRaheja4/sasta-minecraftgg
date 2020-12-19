var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bgimg,zombie,steve,steveimg,zombieimg;
var score,heart,heart1,heart2,heart3,heartimg,food,food1,food2,food3,foodgroup,obstacle,obstaclegroup,obs1,obs2,zombiestop,respawnimg,youdied,scor,scoro,respawn,youdiedimg, scorimg,heartscore;


function preload()
{
  bgimg=loadImage("Untitled.png");
  food1=loadImage("bread1.png");
  food2=loadImage("carrot.png");
  food3=loadImage("chicken.png");
  heartimg=loadImage("heart1.png");
  obs1=loadImage("magma.png");
  zombieimg=loadImage("zombier.gif");
  zombiestop=loadImage("zombie collided.png")
  steveimg=loadImage("steve.gif")
  obs2=loadImage("arrow1.png")
  youdiedimg=loadImage("you died.png")
  respawnimg=loadImage("respawn.png")
  scorimg=loadImage("score.png")
}

function setup() {
  createCanvas(600,400);
  bg=createSprite(600,200);
  bg.addImage(bgimg);
  
  zombie=createSprite(500,200,30,50);
  
  zombie.scale=0.2
  
  scor=score;
  
  obstaclegroup=new Group();
  foodgroup=new Group();
  
  scor=createSprite(300,200)
    scor.addImage(scorimg);
    scor.scale=0.4
    scor.visible=false;
    respawn=createSprite(300,300)
    respawn.addImage(respawnimg);
    respawn.scale=0.4
    respawn.visible=false;
    youdied=createSprite(300,100)
    youdied.addImage(youdiedimg);
    youdied.scale=0.4
    youdied.visible=false
  
  score=0
  
  heart=3
  
  steve=createSprite(190,200,30,50);
    steve.addImage(steveimg);
  steve.scale=0.08
  
  heart1=createSprite(90,50)
  heart1.addImage(heartimg)
  heart1.scale=0.1
  heart2=createSprite(115,50)
  heart2.addImage(heartimg)
  heart2.scale=0.1
  heart3=createSprite(140,50)
  heart3.addImage(heartimg)
  heart3.scale=0.1
}

function draw()
{
  background(220);
  stroke("black")
  textSize(20)
  text("Score: "+ score, 500,50);
  drawSprites()
  if(gameState===PLAY)
    {
      zombie.addImage(zombieimg);
      
      
      
      text("Score: "+ score, 500,50);
      
     bg.velocityX=-1
      
     if(bg.x<1)
     {
      bg.x=600
     }
        score = score + Math.round(getFrameRate()/60);
      zombie.velocityY=steve.velocityY;
      
      if(keyDown("space")||touches.x>0)
        {
          steve.velocityY=-5
        }
      steve.velocityY=steve.velocityY+0.6;
      
      if(steve.isTouching(obstaclegroup))
        {
          heart=heart-1
          obstaclegroup.destroyEach()
        }
      
      if(steve.y<10||steve.y>390)
        {
          gameState=END;
        }
      
      if(heart===2)
        {
          heart1.visible=false
        }
      
      if(heart===1)
        {
          heart2.visible=false
        }
      
      if(heart===0)
        {
          heart3.visible=false
          gameState=END
        }
      
      if(heart===2&&steve.isTouching(foodgroup))
        {
          heart=heart+1;
          heart1.visible=true;
          foodgroup.destroy();
        }
      
       if(heart===1&&steve.isTouching(foodgroup))
        {
          heart=heart+1;
          heart2.visible=true;
          foodgroup.destroy()
        }
      spawnfood()
      spawnobs();
      
    }
  
  
  if (gameState===END)
  {
    scor.visible=true;
    
    respawn.visible=true;
    
    youdied.visible=true
    
    scoro=score
    
    text(scoro,330,209)
    bg.velocityX=0;
    steve.destroy();
    zombie.addImage(zombiestop)
    zombie.y=200
    
    if(mousePressedOver(respawn))
      {
        reset()
      }
    
  }
  
}

function reset()
{
  gameState=PLAY;
  youdied.visible=false
  scor.visible=false
  respawn.visible=false
  zombie.addImage(zombieimg)
  spawnobs();
  steve=createSprite(190,200,30,50);
    steve.addImage(steveimg);
  steve.scale=0.08
  drawSprites();
  if(steve.y<10||steve.y>390)
        {
          gameState=END;
        }
  score=0
  heart=3
  
  heart1.visible=true;
  heart2.visible=true;
  heart3.visible=true;
}
function spawnobs()
{
  if(frameCount%50===0)
    {
      obstacle=createSprite(1,3,30,30);
      obstacle.y=Math.round(random(50,350));
      
      var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obs1);
              break;
      case 2: obstacle.addImage(obs2);
              break;
      default: break;
      
    }
      obstacle.velocityX=5
      obstacle.scale=0.1
      obstaclegroup.add(obstacle)
      obstacle.lifetime=400
      obstacle.debug=true
      obstacle.setCollider("rectangle",0,0,30,30)
    }
  
}

function spawnfood()
{
  if(frameCount%250===0)
    {
      food=createSprite(1,3,30,30);
      
      var rand = Math.round(random(1,3));
    switch(rand) 
    {
      case 1: food.addImage(food1);
              break;
      case 2: food.addImage(food2);
              break;
      case 3: food.addImage(food3);
              break;
      default: break;
    }
    
      food.lifetime=400
      food.velocityX=5
      food.scale=0.1
      foodgroup.add(food)
      food.y=Math.round(random(50,350))
    }
  
}
