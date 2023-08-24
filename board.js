// board.js
import { constant } from "./constant.js";
import { newBlock as piece } from "./piece.js";
import { ctx } from "./main.js";

let x = 0;
let y = 0;
let key;
let xDirection = [];
let yDirection = [];
//키 누를시 마다 1로 변함
let keyFlag = [0, 0, 0, 0];
let array = JSON.parse(JSON.stringify([...piece.initBlock])); // Deep copy of the initial array
let rotations = 0;

function rotateArrayClockwise() {
  const numRows = array.length;
  const numCols = array[0].length;
  const rotatedArray = [];

  for (let i = 0; i < numCols; i++) {
    const newRow = [];
    for (let j = numRows - 1; j >= 0; j--) {
      newRow.push(array[j][i]);
    }
    rotatedArray.push(newRow);
  }

  array = rotatedArray;
  rotations++;

  if (rotations === 4) {
    // 네 번 회전한 후에는 초기 배열로 돌아감
    array = JSON.parse(JSON.stringify([...piece.initBlock]));
    rotations = 0;
  }

  piece.changeBlock(array);

  drawBoard(x, y, ctx, array);
}

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
  // if (
  //   yDirection.some((el) => Math.abs(el) === 0) &&
  //   keyFlag.findIndex((el) => el === 1) === 2
  // ) {
  //   return false;
  // }
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
  canvas.width = constant.ROW * constant.double;
  canvas.height = constant.COLUMN * constant.double;
  drawBoard(x, y, ctx, piece.initBlock);
}

export function drawBoard(x, y, ctx, block) {
  console.log(block);
  if (isValid()) {
    console.table(block);
    ctx.clearRect(
      0,
      0,
      constant.ROW * constant.double,
      constant.COLUMN * constant.double
    );
    xDirection = [];
    yDirection = [];
    block.forEach((row, columnIdx) => {
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
      // keyFlag = [0, 0, 1, 0];
      rotateArrayClockwise();
      // if (isValid()) y -= 10; // 위로 이동
    } else if (event.key === "ArrowDown") {
      keyFlag = [0, 0, 0, 1];
      if (isValid()) y += 10; // 아래로 이동
    }
    key = event.key;
    return { x, y };
  };
}
