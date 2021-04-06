let userX = 0;
let sumX = 0;
let mapZ = 0;
let bikeZ = 0;
let bike_scale = 5;
let scene = -1;
let fontB;
let fontL;
let smoothingFactor = 0.25;
let gridX = 10;
let gridZ = 50;
let touchDistance;
let touchTime = 0;
let touch = false;
let pauseV = false;
let tmp_element_row = 0;
let tmp_element_height = 0;
let bg_img;
let city_type;
let difficulty = null;
let isMouseClicked = false;
let heart_score = 0;


function preload(){
    bike = loadModel('./assets/bike.obj');
    city= loadModel('./assets/low poly buildings.obj');
    city_1= loadModel('./assets/bulidings/1.obj');
    city_2= loadModel('./assets/bulidings/2.obj');
    city_3= loadModel('./assets/bulidings/3.obj');
    city_4= loadModel('./assets/bulidings/4.obj');
    city_5= loadModel('./assets/bulidings/5.obj');
    city_6= loadModel('./assets/bulidings/6.obj');
    city_7= loadModel('./assets/bulidings/7.obj');
    city_8= loadModel('./assets/bulidings/8.obj');
    city_9= loadModel('./assets/bulidings/9.obj');
    city_10= loadModel('./assets/bulidings/10.obj');
    city_11= loadModel('./assets/bulidings/11.obj');
    city_12= loadModel('./assets/bulidings/12.obj');
    city_13= loadModel('./assets/bulidings/13.obj');
    city_14= loadModel('./assets/bulidings/14.obj');
    city_15= loadModel('./assets/bulidings/15.obj');
    heart = loadModel('./assets/Love.obj');
    fontB = loadFont('./assets/robotoBlack.ttf');
    fontL = loadFont('./assets/robotoLight.ttf');
    bg_img = loadImage('./assets/bg.png');
}

function setup(){
    frameRate(60);
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(HSB, 360, 100, 100);
    
    gridZ = int(width/20);

    //Make 2d array, create random Xvalue
    for (let i = 0; i < gridZ; i++) {
      map[i] = [];
      for (let j = 0; j < gridX; j++) {
        map[i][j] = random(width/2);
      }
    }

    resetBtn = createButton('RESET');
    pauseBtn = createButton('PAUSE');
    easyBtn = createButton('EASY');
    hardBtn = createButton('HARD');
    startBtn = createButton('START');
    backBtn = createButton('TRY AGAIN');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    gridZ = int(width/20);
    for (let i = 0; i < gridZ; i++) {
      map[i] = [];
      for (let j = 0; j < gridX; j++) {
        map[i][j] = random(width/2);
      }
    }
}

function draw(){
  


  switch(scene){
    case -1:
      if (width > height){
        image(bg_img, -width/2, -height/2, width*1.1, width);
        push();
        textFont(fontL);
        textSize(40);
        fill(255);
        textAlign(CENTER,CENTER);
        text("City City Bang Bang", 0, -80 );
        pop();
      } else {
        image(bg_img, -width/2, -height/2, height, height*1.1);
        push();
        textFont(fontL);
        textSize(40);
        fill(255);
        textAlign(CENTER,CENTER);
        text("City City Bang Bang", 0, -80 );
        pop();
      }



      easyBtn.show();
      hardBtn.show();
      startBtn.show();

      easyBtn.position(width/2-80, height/2);
      easyBtn.mousePressed(easy);

      hardBtn.position(width/2-80, height/2+80);
      hardBtn.mousePressed(hard);

      startBtn.position(width/2-80, height/2+160);
      startBtn.mousePressed(start);
      


      break;
    
    case 0:
      resetBtn.show();
      pauseBtn.show();

        //set Light & shininess
      pointLight(318,83,94, 0, 0, -18000);
      pointLight(203,70,48, 0, 0, 200);
      shininess(40);
      

      resetBtn.position(30, 240);
      resetBtn.mousePressed(reset);
      

      pauseBtn.position(30, 300);
      pauseBtn.mousePressed(pause);


      if (pauseV == false && difficulty == 'easy') {
        mapZ += 30;
        bikeZ -= 30;
      } else if (pauseV == false && difficulty == 'hard'){
        mapZ += 50;
        bikeZ -= 50;
      } else {
        if(pauseV == false){
          mapZ += 30;
          bikeZ -= 30;
        }
      }

      if (touch == true) {
        background(266,77,50);
        touch = false;
      } else {
        background(266,77,38);
      }
      
      sumX += (userX - sumX) * smoothingFactor;
      
      push();
      translate(sumX+mouseX-width/2,+800,mapZ+bikeZ);
      rotateX(PI);
      noStroke();
      rotateY(PI/2+PI);
      if (touch == true) {
        shininess(1);
      }
      specularMaterial(318,83,100);
      model(bike);
      pop();



      


      if (mapZ < 15000){
      for (let j = 0; j < gridX; j++) {
        for (let i = 0; i < gridZ; i++){
          push();
          noStroke();
          rotateX(PI);
          translate(map[i][j]*i-width*2,-800,-mapZ+j*1000+5000);
          //1000 is low, map [i][j] is column, -width, -800 is make low view
          touchDistance = dist(map[i][j]*i-width*2,0,-mapZ+j*1000+5000,sumX+mouseX-width/2,0,mapZ+bikeZ);
          if (touchDistance < 150 && tmp_element_height != i && tmp_element_row != j) {
            touchTime++;
            touch = true;
            tmp_element_height = i;
            tmp_element_row = j;
          } else {
            specularMaterial(318,83,94);
            city_type = int(map(map[i][j],0,1000,0,15));
            decideCity(city_type);
          }
          pop();
        }
      }
    }
    if (mapZ > 7500 && mapZ < 30000){
      for (let j = 0; j < gridX; j++) {
        for (let i = 0; i < gridZ; i++){
          push();
          noStroke();
          rotateX(PI);
          translate(map[i][j]*i-width*2,-800,-mapZ+j*1000+15000);
          //1000 is low, map [i][j] is column, -width, -800 is make low view
          touchDistance = dist(map[i][j]*i-width*2,0,-mapZ+j*1000+15000,sumX+mouseX-width/2,0,mapZ+bikeZ);
          if (touchDistance < 150 && tmp_element_height != i && tmp_element_row != j) {
            touchTime++;
            touch = true;
            tmp_element_height = i;
            tmp_element_row = j;
          } else {
            specularMaterial(318,83,94);
            city_type = int(map(map[i][j],0,1000,0,15));
            decideCity(city_type);
          }
          pop();
        }
      }
    }
    if (mapZ > 15000 && mapZ < 45000){
      for (let j = 0; j < gridX; j++) {
        for (let i = 0; i < gridZ; i++){
          push();
          noStroke();
          rotateX(PI);
          translate(map[i][j]*i-width*2,-800,-mapZ+j*1000+25000);
          //1000 is low, map [i][j] is column, -width, -800 is make low view
          touchDistance = dist(map[i][j]*i-width*2,0,-mapZ+j*1000+25000,sumX+mouseX-width/2,0,mapZ+bikeZ);
          if (touchDistance < 150 && tmp_element_height != i && tmp_element_row != j) {
            touchTime++;
            touch = true;
            tmp_element_height = i;
            tmp_element_row = j;
          } else {
            specularMaterial(318,83,94);
            city_type = int(map(map[i][j],0,1000,0,15));
            decideCity(city_type);
          }
          pop();
        }
      }
    }
    if (mapZ > 22500 && mapZ < 60000){
      for (let j = 0; j < gridX; j++) {
        for (let i = 0; i < gridZ; i++){
          push();
          noStroke();
          rotateX(PI);
          translate(map[i][j]*i-width*2,-800,-mapZ+j*1000+35000);
          //1000 is low, map [i][j] is column, -width, -800 is make low view
          touchDistance = dist(map[i][j]*i-width*2,0,-mapZ+j*1000+35000,sumX+mouseX-width/2,0,mapZ+bikeZ);
          if (touchDistance < 150 && tmp_element_height != i && tmp_element_row != j) {
            touchTime++;
            touch = true;
            tmp_element_height = i;
            tmp_element_row = j;
          } else {
            specularMaterial(318,83,94);
            city_type = int(map(map[i][j],0,1000,0,15));
            decideCity(city_type);
          }
          pop();
        }
      }
    }
      // heart
      push();
      translate(0,-500,0);
      noStroke();
      if (isMouseClicked){
        ambientLight(100);
        isMouseClicked = false;
        heart_score++;
      } else {
        ambientLight(0);
      }
      ambientMaterial(318,83,100);
      model(heart);
      pop();

      //city enterence
      push();
      noStroke();
      fill(255);
      rotateX(PI);
      translate(0,-800,-mapZ+2000);
      specularMaterial(318,83,94);
      model(city);
      pop();

      //moon
      push(); 
      translate(0,0,-8000);
      smooth();
      ambientLight(50);
      pointLight(62,66,92, 0,-2000,-14000);
      ambientMaterial(318,83,100);
      ellipse(0, 0, 4800, 4800, 50);
      pop();

      //ground
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

      //score & life
      push();
      textFont(fontB);
      textSize(40);
      fill(255);
      text("Your Score is " + mapZ, -width/2+30, -height/2+60);
      text("Heart " + heart_score, -width/2+30, -height/2+120);
      text("Life " + (10-touchTime), -width/2+30, -height/2+180);
      pop();

      if (10-touchTime == 0) {
        scene = 1;
        resetBtn.hide();
        pauseBtn.hide();
      }
    
      if (mapZ > 60000) {
        scene = 1;
        resetBtn.hide();
        pauseBtn.hide();
      }
      

      break;
      
      case 1:
        background(266,77,38);
        backBtn.show();
        backBtn.position(width/2-80, height/2+150);
        backBtn.mousePressed(back);
        push();
        textAlign(CENTER);
        textFont(fontB);
        textSize(40);
        fill(255);
        text("Score " + mapZ, 0, -60);
        text("Heart " + heart_score, 0, 0);
        text("Life " + (10-touchTime), 0, 60);
        text("Total Score " + (((10-touchTime) * 1000) + (mapZ) + (heart_score * 100)), 0, 120);
        pop();
      break;
  }
}



    function easy(){
      difficulty = 'easy';
    }
    function hard(){
      difficulty = 'hard';
    }
    function start(){
      if (difficulty){
        scene = 0;
        easyBtn.hide();
        hardBtn.hide();
        startBtn.hide();
      } else {
        alert("Choose the difficulty level.");
      }
    }

  



    function keyPressed() {
      if (keyCode === RIGHT_ARROW) {
        userX += 10;
      } else if (keyCode === LEFT_ARROW) {
        userX -= 10;
      }
    }
    
    function reset() {
      mapZ = 0;
      bikeZ = 0;
      touchTime = 0;
      heart_score = 0;
      
    }

    function pause() { 
      if (pauseV == false){
        pauseV = true;
      } else {
        pauseV = false;
        heart_score--;
      }
      
    }

    function mouseClicked() {
      if (pauseV == false) {
        isMouseClicked = true;
      }
    }

    function decideCity(cityType){
      switch(cityType){
        case 0:
          model(city_1);
          break;
        case 1:
          model(city_2);
          break;
        case 2:
          model(city_3);
          break;
        case 3:
          model(city_4);
          break;
        case 4:
          model(city_5);
          break;
        case 5:
          model(city_6);
          break;
        case 6:
          model(city_7);
          break;
        case 7:
          model(city_8);
          break;
        case 8:
          model(city_9);
          break;
        case 9:
          model(city_10);
          break;
        case 10:
          model(city_11);
          break;
        case 11:
          model(city_12);
          break;
        case 12:
          model(city_13);
          break;
        case 13:
          model(city_14);
          break;
        default:
          model(city_15);
       }
    }

    function back() {
      backBtn.hide();
      mapZ = 0;
      bikeZ = 0;
      touchTime = 0;
      heart_score = 0;
      scene = 0;
    }
