import { newBlock as piece } from "./piece.js";
import { Canvas } from "./canvas.js";
import { constant } from "./constant.js";

//블록 자동으로 움직이게

const initiatedCanvas = document.getElementById("myCanvas");
const ctx = initiatedCanvas.getContext("2d");
ctx.canvas.width = 270;
ctx.canvas.height = 360;
ctx.scale(30, 30);

const instance = new Canvas();

instance.ctx = ctx;
instance.piece = piece.initBlock;
instance.reset();
console.log(instance.grid);
requestAnimationFrame(() => {
  instance.animate(Date.now(), constant.time);
});

// 키보드 누를 때마다 방향이 바뀌도록 이벤트 리스너를 추가합니다.
initiatedCanvas.addEventListener("keydown", (event) => {
  const { x, y } = move(event);

  if (event.key !== "ArrowUp") {
    // drawBoard(x, y, ctx, array);
  }
});
