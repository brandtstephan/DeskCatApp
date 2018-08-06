let mX, mY = 0
////////////////
let spritesheet;
let spritedata;
let animation = [];
////////////////
let spritesheet_back;
let spritedata_back;
let animation_back = []
////////////////
let sprite_idle;
let sprite_idle_data;
let idle = [];
////////////////
let sprite_idle_back;
let sprite_idle_data_back;
let idle_back = [];
///////////////
let elec_window;
let animationBoolean = true;

let catHeigh = 79;

let speed = 0.01;

let position;

///////////////

let _ = require('lodash');


//////////////////
require('electron').ipcRenderer.on('mousePosition', (event, pos) => {
    mX = pos.x
    mY = pos.y
    elec_window = pos.boundries
    
})

const remote = require('electron').remote
let w = remote.getCurrentWindow()

//Preload the images to be used
function preload(){

    spritedata = loadJSON('./assets/walkingCat-sheet.json');
    spritesheet = loadImage('./assets/walkingCat-sheet.png');
    //////////
    spritedata_back = loadJSON('./assets/walking-cat-backwards.json');
    spritesheet_back = loadImage('./assets/walking-cat-backwards.png');
    //////////
    sprite_idle_data = loadJSON('./assets/iddle-cat.json');
    sprite_idle = loadImage('./assets/iddle-cat.png');
    /////////
    sprite_idle_data_back = loadJSON('./assets/idle-cat-back.json');
    sprite_idle_back = loadImage('./assets/idle-cat-back.png');
}

//Initializes the canvas
//saves the cutted images from the PNG files
function setup() {
    
    createCanvas(window.innerWidth, window.innerHeight);

    initializeCat(spritesheet, spritedata, animation);
    
    initializeCat(spritesheet_back, spritedata_back, animation_back);
    
    initializeCat(sprite_idle, sprite_idle_data, idle);

    initializeCat(sprite_idle_back, sprite_idle_data_back, idle_back);

    position = mX;
    
    document.onkeydown = onKeyDown;

    alert(" \t \t \t Welcome to DeskCat! \n To close the application just press 'Control + B' any time you want \n Enjoy!")
    
}

function draw() {
    
    
    clear();

    //if cat is to the left of the mouse
    if(position + 5 < mX){

        image(animation[round(frameCount/17) % animation.length],moveCat(),screen.availHeight - (catHeigh) + 3);

        animationBoolean = true;

    }else if(position - 5 > mX){ //if cat is to the right of the mouse

        image(animation_back[round(frameCount/17) % animation_back.length],moveCat(),screen.availHeight - (catHeigh) + 3);

        animationBoolean = false;

    }else{
            //Either sleep to the right or to the left
            if(animationBoolean){

                image(idle[round(frameCount*speed) % idle.length],mX,screen.availHeight - (catHeigh) + 27);
            
            }else{

                image(idle_back[round(frameCount*speed) % idle_back.length],mX,screen.availHeight - (catHeigh) + 27);

            }
    }
    
  
}

//Calculates where to render the cat
function moveCat(){
  
    if(Math.abs(position - mX) > 5){

        position = position + _.clamp((mX - position) * speed,-4,4);

    }

    return position;

}

//Cuts the images from the png files using the json data and stores it on an array
function initializeCat(catPng, catJson, animationList){

    let frames = catJson.frames;

    _.forOwn(frames, function(value, key){

        let pos = value.frame;

        let img = catPng.get(pos.x, pos.y, pos.w, pos.h);

        animationList.push(img);

    });
}

//Ctrl+B to close electron app
function onKeyDown(e){
    e = e || window.event;

    if ((e.which == 66 || e.keyCode == 66) && e.ctrlKey) {
        w.close()
    }
}


