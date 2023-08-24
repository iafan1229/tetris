import { drawBoard } from "./board.js";
import { setCanvas, move } from "./board.js";
import { newBlock as piece } from "./piece.js";
const canvas = document.getElementById("myCanvas");
export const ctx = canvas.getContext("2d");

setCanvas(canvas, ctx);
canvas.tabIndex = 1;

// 페이지가 로드될 때 canvas에 포커스를 주기
window.addEventListener("load", () => {
  canvas.focus();
});

const saveMovefunction = move();
// 키보드 누를 때마다 방향이 바뀌도록 이벤트 리스너를 추가합니다.
canvas.addEventListener("keydown", (event) => {
  const { x, y } = saveMovefunction(event, ctx);

  if (event.key !== "ArrowUp") drawBoard(x, y, ctx, piece.initBlock);
});
