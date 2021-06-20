"use strict";

//Testing to see if JavaScript works.
let div = document.getElementById("div");
div.innerHTML = "JavaScript works!";

//Initialize canvas
let canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;
let context = canvas.getContext("2d");

//See if canvas is there by painting it pink
context.fillStyle = "pink";
context.fillRect(0, 0, canvas.width, canvas.height);

let canvas2 = document.getElementById("canvas2");
canvas2.width = 400;
canvas2.height = 400;
let context2 = canvas2.getContext("2d");

//See if canvas is there by painting it pink
context2.fillStyle = "blue";
context2.fillRect(0, 0, canvas2.width, canvas2.height);

//Render an image on the canvas
let target = new Image();
target.src = "./image/color.jpg";
//loadでトリガーしないと描画できない。
target.addEventListener("load", () => {
  context.drawImage(target, 0, 0, 300, 300);
});

//画像のデータを取得する。これは左上のピクセルのデータをとる場合。
const imageData = context.getImageData(0, 0, 1, 1);
const data = imageData.data;
console.log(data);

//Get coordinates of the mouse and get imageData of the coordinates. canvas works, but target doesn't.
canvas.addEventListener("click", (event) => {
  let x = event.offsetX;
  let y = event.offsetY;
  let imageData = context.getImageData(x, y, 1, 1);
  let data = imageData.data;
  console.log(data);
});

//fileをアップロードする準備。
let file = document.getElementById("file");

//fileが指定されたら実行される関数を定義する。
function renderLocalImage(e) {
  //ファイル情報を取得
  let fileData = e.target.files[0];
  //画像以外が選ばれたら処理を止める。
  if (!fileData.type.match("image.*")) {
    alert("画像を選択してください");
    return;
  }

  //FileReaderオブジェクトを使ってファイル読み込み。
  let reader = new FileReader();
  //ファイル読み込みが成功したときの処理。
  reader.onload = function () {
    //canvas上にこの画像を表す。
    let img = new Image();
    //読み込んだファイルのsrcが得られるメソッド、reader.resultを使う。
    img.src = reader.result;
    img.onload = function () {
      context2.clearRect(0, 0, canvas2.width, canvas2.height);
      context2.drawImage(img, 0, 0, 400, img.height * (400 / img.width));
    };
  };
  reader.readAsDataURL(fileData);
}

//ファイルが指定されたらrenderLocalImageを実行させる。
file.addEventListener("change", renderLocalImage, false);

let rgb = document.getElementById("rgb");

//Get the coordinates and imageData of click location in canvas2
canvas2.addEventListener("mousemove", (event) => {
  let x = event.offsetX;
  let y = event.offsetY;
  let imageData = context2.getImageData(x, y, 1, 1);
  let data = imageData.data;
  rgb.innerHTML = `${data[0]}, ${data[1]}, ${data[2]}`;
  rgb.style.background = `rgba(${data[0]}, ${data[1]}, ${data[2]}`;
});

canvas2.addEventListener("click", (event)=>{
  let x = event.offsetX;
  let y = event.offsetY;
  let imageData = context2.getImageData(x, y, 1, 1);
  let data = imageData.data;
  console.log(data);
})