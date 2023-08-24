// board.js
import { constant } from "./constant.js";
import { initPiece as piece } from "./piece.js";

let xDirection = [];
let yDirection = [];
let key;
//키 누를시 마다 1로 변함
let keyFlag = [0, 0, 0, 0];

function isValid() {
  //왼쪽 끝에 도달하고 [1,0,0,0]임
  if (
    xDirection.some((el) => Math.abs(el) === 10) &&
    keyFlag.findIndex((el) => el === 1) === 0
  ) {
    return false;
  }
  //오른쪽 끝에 도달
  if (
    xDirection.some((el) => Math.abs(el) === 430) &&
    keyFlag.findIndex((el) => el === 1) === 1
  ) {
    return false;
  }
  if (
    yDirection.some((el) => Math.abs(el) === 0) &&
    keyFlag.findIndex((el) => el === 1) === 2
  ) {
    return false;
  }
  //block stacking
  if (
    yDirection.some((el) => Math.abs(el) === 800) &&
    keyFlag.findIndex((el) => el === 1) === 3
  ) {
    return false;
  }

  return true;
}

export function setCanvas(canvas, ctx) {
  let x = 0;
  let y = 0;
  canvas.width = constant.ROW * constant.double;
  canvas.height = constant.COLUMN * constant.double;
  drawBoard(x, y, ctx);
}

export function drawBoard(x, y, ctx) {
  console.log(x, y, yDirection);

  // console.log(keyFlag);
  if (isValid()) {
    ctx.clearRect(
      0,
      0,
      constant.ROW * constant.double,
      constant.COLUMN * constant.double
    );
    xDirection = [];
    yDirection = [];
    piece.forEach((row, columnIdx) => {
      row.forEach((el, rowIdx) => {
        xDirection.push(x + (rowIdx + 4) * constant.double);
        yDirection.push(y + columnIdx * constant.double);

        if (el >= 1) {
          let colorVariable = Object.values(constant.colors[el - 1])[0];
          ctx.fillStyle = colorVariable;
          ctx.fillRect(
            x + (rowIdx + 4) * constant.double,
            y + columnIdx * constant.double,
            constant.double,
            constant.double
          );
        }
      });
    });
  }
}

export function move() {
  // 화살표 키 입력을 감지하고 블록을 이동합니다.
  // (이 부분은 원하는 게임 논리로 변경해야 합니다)
  let x = 0;
  let y = 0;
  return function moveClosure(event) {
    if (event.key === "ArrowLeft") {
      keyFlag = [1, 0, 0, 0];
      if (isValid()) {
        x -= 10;
      } // 왼쪽으로 이동
    } else if (event.key === "ArrowRight") {
      keyFlag = [0, 1, 0, 0];
      if (isValid()) {
        x += 10; // 오른쪽으로 이동
      }
    } else if (event.key === "ArrowUp") {
      keyFlag = [0, 0, 1, 0];
      if (isValid()) y -= 10; // 위로 이동
    } else if (event.key === "ArrowDown") {
      keyFlag = [0, 0, 0, 1];
      if (isValid()) y += 10; // 아래로 이동
    }
    key = event.key;
    console.log(key);
    return { x, y };
  };
}
