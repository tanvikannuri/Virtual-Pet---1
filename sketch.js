var dog, dog1, dog2;
var db, dog_ref, data_value;
var food;
function preload() {
    dog1 = loadImage("dog2.png");
    dog2 = loadImage("dog.png");
}
function setup() {
    createCanvas(500, 500);
    dog = createSprite(250, 300, 10, 10);
    dog.addImage(dog1);
    dog.scale = 0.25;
    db = firebase.database();
    dog_ref = db.ref("dog");
    dog_ref.on("value", feed, displayError);
}

function draw() {
    background("green");
    fill("#fff");
    textSize(16);

    text("Press UP Arrow to feed Draco milk ", 100, 20);
    text("Food remaining: " + food, 150, 100);
    if (keyDown(UP_ARROW)) {
        wFood();
    }
    drawSprites();
}

function wFood() {

    db.ref("dog").set({
        food: food - 1,
    });
    dog.addImage(dog2);
}
function feed(data) {
    data_value = data.val();
    food = data_value.food;

}
function displayError(error) {
    console.log(error.value);
}
