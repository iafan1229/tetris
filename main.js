import { Piece } from "./piece.js";
import { Canvas } from "./canvas.js";
import { constant } from "./constant.js";

//블록 자동으로 움직이게

const initiatedCanvas = document.getElementById("myCanvas");
const ctx = initiatedCanvas.getContext("2d");
ctx.canvas.width = constant.ROW * 30;
ctx.canvas.height = constant.COLUMN * 30;

ctx.scale(30, 30);

const instance = new Canvas();

//0번째 블록
const piece = new Piece();

instance.ctx = ctx;
instance.piece = piece.initBlock;
instance.reset();

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
