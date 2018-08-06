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
////////////////
let x;
let y;

module.exports = class Cat{
    constructor(){
        this.x,
        this.y
        
    }
};

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

function initializeCat(catPng, catJson, animationList){
    let frames = catJson.frames;

    _.forOwn(frames, function(value, key){

        let pos = value.frame;

        let img = catPng.get(pos.x, pos.y, pos.w, pos.h);

        animationList.push(img);

    });
}

//TODO:

//Apply physics to cat (small compact physics engine)

//State machine: IDLE, WALKING, SPRINTING, JUMPING
//Pseudo-randomized states 

//Needed variables: Acceleration, speed, gravity