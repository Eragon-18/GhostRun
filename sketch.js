var ghost;
var door;
var doorImage;
var doorGroup;
var ghost_jumping;
var ghost_standing;
var towerImage;
var tower;
var climber;
var climberImage;
var climberGroup;
var invisibleBlock;
var invisibleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghost_standing = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(480,480);
  
  tower = createSprite(300,300)
  tower.addImage("tower",towerImage);
  tower.velocityY = 2;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghost_standing);
  ghost.scale = 0.3;
}

function draw() {
  background(0);
if(gameState === PLAY) {
  if(tower.y > 400) {
    tower.y = 300;
  }
  
  if(keyDown("space")) {
    ghost.velocityY = -5;
  }
  
  if(ghost.y < 200) {
  ghost.velocityY = ghost.velocityY + 0.8;
  }
  
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if(invisibleGroup.isTouching(ghost)) {
    gameState = END;
  }
  
  console.log(ghost.y)
  
  drawSprites();
  spawnDoor();
  spawnClimber();
}
  else if(gameState === END){
    text("Game Over", 240, 240)
  }
}

function spawnDoor() {
  if(frameCount%250 === 0) {
    door = createSprite(200,50);
    door.addImage("door", doorImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    door.lifetime = 600;
    doorGroup.add(door);
    ghost.depth = door.depth + 1;
  }
}

function spawnClimber() {
  if(frameCount%250 === 0) {
    climber = createSprite(200,100);
    climber.addImage("climber", climberImage);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 600;
    climberGroup.add(climber);
    ghost.depth = climber.depth + 1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleGroup.add(invisibleBlock)
  }
}