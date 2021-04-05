let userX = 0;
let sumX = 0;
let mapZ = 0;
let bikeZ = 0;
let bike_scale = 5;
let scene = 0;
let fontB;
let fontL;
let smoothingFactor = 0.25;
let gridX = 10;
let gridZ = 15;
let touchDistance;
let pauseV = false;
let touchTime = 0;
let tmp_element_row = 0;
let tmp_element_height = 0;


function preload(){
    bike = loadModel('./assets/bike.obj');
    city= loadModel('./assets/low poly buildings.obj');
    city_1= loadModel('./assets/bulidings/1.obj');
    city_2= loadModel('./assets/bulidings/2.obj');
    city_3= loadModel('./assets/bulidings/3.obj');
    city_4= loadModel('./assets/bulidings/4.obj');
    city_5= loadModel('./assets/bulidings/5.obj');
    fontB = loadFont('assets/robotoBlack.ttf');
    fontL = loadFont('assets/robotoLight.ttf');
}

function setup(){
    frameRate(60);
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(HSB, 360, 100, 100);
    for (let i = 0; i < gridZ; i++) {
      map[i] = [];
      for (let j = 0; j < gridX; j++) {
        map[i][j] = random(400);
      }
    }
    resetBtn = createButton('RESET');
    pauseBtn = createButton('PAUSE');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){





  switch(scene){
    
    case 0:
        //set Light & shininess
      pointLight(318,83,94, 0, 0, -18000);
      pointLight(203,70,48, 0, 0, 200);
      shininess(50);

      push();
      resetBtn.position(30, 180);
      resetBtn.mousePressed(reset);
      pop();
      push();
      pauseBtn.position(30, 240);
      pauseBtn.mousePressed(pause);
      pop();

      if (pauseV == false) {
        mapZ += 10 // * frameCount/1000;
        bikeZ -= 10 //* frameCount/1000;
      }

      background(266,77,38);
      sumX += (userX - sumX) * smoothingFactor;
      
      push();
      translate(sumX+mouseX-width/2,+800,mapZ+bikeZ);
      rotateX(PI);
      noStroke();
      rotateY(PI/2+PI);
      specularMaterial(318,83,100);
      model(bike);
      pop();

      push();
      noStroke();
      fill(255);
      rotateX(PI);
      translate(10,-800,-mapZ+3000);
      specularMaterial(318,83,94);
      model(city);
      pop();


      if (mapZ < 14000){
      for (let j = 0; j < gridX; j++) {
        for (let i = 0; i < gridZ; i++){
          push();
          noStroke();
          rotateX(PI);
          touchDistance = dist(map[i][j]*i-2000,0,-mapZ+5000+j*1000,sumX+mouseX-width/2,0,mapZ+bikeZ);
          translate(map[i][j]*i-2000,-800,-mapZ+5000+j*1000);
          
          if (touchDistance < 150 && tmp_element_height != i && tmp_element_row != j) {
            touchTime++;
            console.log(i,j,touchDistance,touchTime);
            tmp_element_height = i;
            tmp_element_row = j;
          } else {
            specularMaterial(318,83,94);
            model(city_2);
          }

          pop();
          }
        }
      }

      if (mapZ > 4000 && mapZ < 22000){
        for (let j = 0; j < gridX; j++) {
          for (let i = 0; i < gridZ; i++){
            push();
            noStroke();
            fill(255);
            rotateX(PI);
            translate(map[i][j]*i-2000,-800,-mapZ+15000+j*1000);
            specularMaterial(318,83,94);
            model(city_1);
            pop();
          }
        }
      }
      if (mapZ > 17000 && mapZ < 30000){
        for (let j = 0; j < gridX; j++) {
          for (let i = 0; i < gridZ; i++){
            push();
            noStroke();
            fill(255);
            rotateX(PI);
            translate(map[i][j]*i-2000,-800,-mapZ+20000+j*1000);
            specularMaterial(318,83,94);
            model(city_5);
            pop();
          }
        }
      }

      push();
      translate(0,0,-15000);
      smooth();
      ambientLight(50);
      pointLight(62,66,92, 0,-2000,-14000);
      ambientMaterial(318,83,100);
      ellipse(0, 0, 5500, 5500, 50);
      pop();





      push();
      fill(264,61,23);
      pointLight(318,83,94, 0, 0, -20000);
      noStroke();
      rotateX(PI/2);
      rotateZ(PI/2);
      ambientLight(0);
      ambientMaterial(318,83,100);
      translate(0,0,-800);
      plane(100000,50000);
      pop();

      push();
      textFont(fontB);
      textSize(40);
      fill(255);
      text("Your Score is " + mapZ, -width/2+30, -height/2+60);
      text("Life " + (10-touchTime), -width/2+30, -height/2+120);
      pop();

      


  }
    
}

function reset() {
  mapZ = 0;
  bikeZ = 0;
  touchTime = 0;
}

function pause() { 
  if (pauseV == false){
    pauseV = true;
  } else {
    pauseV = false;
  }
}

switch(scene) {
  case 0 :
    function keyPressed() {
  
      if (keyCode === RIGHT_ARROW) {
        userX += 10;
      } else if (keyCode === LEFT_ARROW) {
        userX -= 10;
      }
    }
    
  }
