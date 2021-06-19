"use strict";

//Testing to see if JavaScript works.
let div = document.getElementById("div");
div.innerHTML = "JavaScript works!";

//Initialize canvas
let canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 800;
let context = canvas.getContext("2d");

//See if canvas is there by painting it pink
context.fillStyle = "pink";
context.fillRect(0, 0, canvas.width, canvas.height);

//Render an image on the canvas
let target = new Image();
target.src = "./image/color.jpg";
//loadでトリガーしないと描画できない。
target.addEventListener("load", () => {
  context.drawImage(target, 0, 0, 300, 300);
});

//画像のデータを取得する。これは左上のピクセルのデータをとる場合。
// const imageData = context.getImageData(0, 0, 1, 1);
// const data = imageData.data;
// console.log(data);

//Get coordinates of the mouse. canvas works, but target doesn't.
canvas.addEventListener("click", (event) => {
  let x = event.offsetX;
  let y = event.offsetY;
  let imageData = context.getImageData(x, y, 1, 1);
  let data = imageData.data;
  console.log(data);
});
