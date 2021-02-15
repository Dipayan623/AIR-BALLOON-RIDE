var bgImg;
var hotAirBallon,hotAirBallonImg;
var database,positions;

function preload(){
  hotAirBallonImg=loadAnimation("ballon1.png","ballon2.png","ballon3.png");
  bgImg=loadImage("bgImage.png");
}

function setup() {
  createCanvas(1500,600);

  database=firebase.database();

  hotAirBallon = createSprite(400, 200, 50, 50);
  hotAirBallon.addAnimation("ground",hotAirBallonImg);
  hotAirBallon.scale=0.5;

  var hotAirBallonposition=database.ref('hotAirBallon/height');
  hotAirBallonposition.on("value",showError);
}

function draw() {
  background(bgImg);
  
  textSize("100");
  fill("Black");
  text("Press arrow keys to move the balloon",600,50);

  if(keyDown(LEFT_ARROW)){
    hotAirBallon.x = hotAirBallon.x -10;
    
}
else if(keyDown(RIGHT_ARROW)){
    hotAirBallon.x = hotAirBallon.x +10;
}
else if(keyDown(UP_ARROW)){
  hotAirBallon.scale=hotAirBallon.scale -0.01;
  hotAirBallon.y = hotAirBallon.y -10;
}
else if(keyDown(DOWN_ARROW)){
    hotAirBallon.scale=hotAirBallon.scale +0.01;
    hotAirBallon.y = hotAirBallon.y +10;
}

  drawSprites();
}

function updateHeight(x,y){
database.ref('hotAirBallon/height').set({
  'x' : height.x + x ,
  'y' : height.y + y
})

}

function showError(){
console.log("Error in the writing to the database.");
}