import { constant } from "./constant.js";
import { initPiece } from "./piece.js";

function board(ctx, color, initPiece) {
  initPiece.forEach((row, columnIdx) => {
    row.forEach((el, rowIdx) => {
      console.log(rowIdx, columnIdx);
      if (el === 1) {
        ctx.fillStyle = color;
        ctx.fillRect(
          rowIdx * constant.double,
          columnIdx * constant.double,
          constant.double,
          constant.double
        );
      }
    });
  });
}

function setBoard(canvas) {
  canvas.width = constant.ROW * constant.double;
  canvas.height = constant.COLUMN * constant.double;
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

setBoard(canvas);
export default board(ctx, "blue", initPiece);
