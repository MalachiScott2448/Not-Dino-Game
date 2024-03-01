//Board information
let boardHeight = 250;
let boardWidth = 500;

let ctx;

//Dino information
let dinoHeight = 200 / 2;
let dinoWidth = 190 / 2;
let dinoX = 50;
let dinoY = 20;
let dinoImg;

let dino = {
  x: dinoX,
  y: dinoY,
  width: dinoWidth,
  height: dinoHeight
};

//Tree information
let treeHeight = 200 / 2;
let treeWidth = 100;
let treeX = 400;
let treeY = 20;
let treeImg;

let tree = {
  img: treeImg,
  x: treeX,
  y: treeY,
  width: treeWidth,
  height: treeHeight
};

//Physics
let velocity = -2.5;

let gameOver = false;
// let score = 0;

//Image rotation function
let angle = 0;
let scale = 1;

//Randomization
let randomSymbol;
let result;
let treeAngle = 0;

document.addEventListener("keydown", function() {
  //This is the code for the board
  const board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  ctx = board.getContext("2d");

  //This is the code for the middle line
  ctx.fillStyle = "#ababab";
  ctx.fillRect(0, 120, 500, 1);

  //This is the code for the dinosaurs image
  dinoImg = new Image();
  dinoImg.src = "./media/dino.png";
  dinoImg.onload = function() {
    ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  };

  //This is the code for the tree image
  treeImg = new Image();
  treeImg.src = "./media/oak_tree.png";
  treeImg.onload = function() {
    ctx.drawImage(treeImg, -tree.width / 2, -tree.height / 2, tree.width, tree.height);
  };

  requestAnimationFrame(update);
  setInterval(placeTree, 1500);
  document.addEventListener("keydown", moveDino)
});

function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }
  // Draw dino and tree
  rotate();
  treeRotate();

  tree.x += velocity; // ** responsive error **

  // Draw middle line
  ctx.fillStyle = "#ababab";
  ctx.fillRect(0, 120, 500, 1);

  if (detectCollision(dino, tree)) {
    gameOver = true;
  }
}

function moveDino(e) {
  if (gameOver) {
    return;
  }

  if ((e.code == "Space") && dino.y == dinoY) {
    dino.y = (dinoY + 100);
    angle += Math.PI / -1;
    scale = -1;
    rotate();
  }
  else if ((e.code == "Space") && dino.y != dinoY) {
    dino.y = dinoY;
    angle -= Math.PI / 1;
    scale = 1;
    rotate();
  }
}

function placeTree() {
  if (gameOver) {
    return;
  }

  let randomNumber = Math.floor(Math.random() * 2)

  if (randomNumber === 0) {
    treeAngle = 0;
  }
  else {
    treeAngle = Math.PI;
  }

  // Update tree position
  tree.x = boardWidth;

  console.log(treeAngle)
}

function rotate() {
  ctx.clearRect(0, 0, board.width, board.height);
  ctx.save();
  ctx.translate(dino.x + dino.width / 2, dino.y + dino.height / 2);
  ctx.rotate(angle);
  ctx.scale(scale, 1);
  ctx.drawImage(dinoImg, -dino.width / 2, -dino.height / 2, dino.width, dino.height);
  ctx.restore();
}

function treeRotate() { 
  ctx.save();
  ctx.translate(tree.x + tree.width / 2, tree.y + tree.height / 2);

  if (treeAngle === Math.PI) {
    ctx.rotate(Math.PI);
    ctx.drawImage(treeImg, -tree.width / 2, (-tree.height / 2) - 100, tree.width, tree.height);
  }
  else if (treeAngle === 0) {
    ctx.scale(1, 1);
    ctx.drawImage(treeImg, -tree.width / 2, -tree.height / 2, tree.width, tree.height);
  }
  else {
    ctx.scale(1, 1)
    ctx.drawImage(treeImg, -tree.width / 2, -tree.height / 2, tree.width, tree.height);
  }
  
  ctx.restore();
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && 
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}