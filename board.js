// // board.js
// import { constant } from "./constant.js";
// import { newBlock as piece } from "./piece.js";
// import { canvas } from "./canvas.js";

// let x = 0;
// let y = 0;
// let key;
// let xDirection = [];
// let yDirection = [];
// //키 누를시 마다 1로 변함
// let keyFlag = [0, 0, 0, 0];
// let array = JSON.parse(JSON.stringify([...piece.initBlock])); // Deep copy of the initial array
// let rotations = 0;
// const blockArray = [array];
// let blockCount = 0;

// function freeze(block) {
//   block.forEach((row, columnIdx) => {
//     row.forEach((el, rowIdx) => {
//       if (el > 0) {
//         ctx.fillRect(x + (rowIdx + 4), y + columnIdx, 1, 1);
//       }
//     });
//   });
//   return piece.generateRandomBlock().initBlock;
// }

// export function animate(now, time) {
//   // 지난 시간을 업데이트한다.
//   time.elapsed = now - time.start;
//   // // 지난 시간이 현재 레벨의 시간을 초과했는지 확인한다.
//   if (time.elapsed > time.level) {
//     // 현재 시간을 다시 측정한다.
//     time.start = now;
//     ctx.clearRect(0, 0, constant.ROW, constant.COLUMN);
//     y += 20;

//     if (yDirection.some((el) => Math.abs(el) > 200)) {
//       canvas.freeze(x, y);
//       const newBlock = freeze(array);
//       blockArray.push(newBlock);
//       blockCount += 1;
//       //-----초기화
//       x = 0;
//       y = 0;
//       xDirection = [];
//       yDirection = [];
//       keyFlag = [0, 0, 0, 0];
//       array = JSON.parse(JSON.stringify([...newBlock]));
//       rotations = 0;
//       //------초기화 끝
//     }
//     const canvasInit = canvas.reset();
//     canvas.draw(x, y, canvasInit, array);
//     // console.log(y);
//   }

//   const requestId = requestAnimationFrame(() =>
//     animate(Date.now(), constant.time)
//   );
// }

// function rotateArrayClockwise() {
//   const numRows = array.length;
//   const numCols = array[0].length;
//   const rotatedArray = [];

//   for (let i = 0; i < numCols; i++) {
//     const newRow = [];
//     for (let j = numRows - 1; j >= 0; j--) {
//       newRow.push(array[j][i]);
//     }
//     rotatedArray.push(newRow);
//   }

//   array = rotatedArray;
//   rotations++;

//   if (rotations === 4) {
//     // 네 번 회전한 후에는 초기 배열로 돌아감
//     array = JSON.parse(JSON.stringify([...blockArray[blockCount]]));
//     rotations = 0;
//   }

//   piece.changeBlock(array);

//   canvas.draw(x, y, ctx, array);
// }

// function isValid() {
//   //왼쪽 끝에 도달하고 [1,0,0,0]임
//   if (
//     xDirection.some((el) => Math.abs(el) === 10) &&
//     keyFlag.findIndex((el) => el === 1) === 0
//   ) {
//     return false;
//   }
//   //오른쪽 끝에 도달
//   if (
//     xDirection.some((el) => Math.abs(el) === 360) &&
//     keyFlag.findIndex((el) => el === 1) === 1
//   ) {
//     return false;
//   }
//   if (
//     yDirection.some((el) => Math.abs(el) === 800) &&
//     keyFlag.findIndex((el) => el === 1) === 3
//   ) {
//     return false;
//   }

//   return true;
// }

// export function canvas.draw(x, y, ctx, block) {
//   if (isValid()) {
//     // console.log(ctx);
//     // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     xDirection = [];
//     yDirection = [];

//     block.forEach((row, columnIdx) => {
//       row.forEach((el, rowIdx) => {
//         xDirection.push(x + (rowIdx + 4));
//         yDirection.push(y + columnIdx);

//         if (el >= 1) {
//           let colorVariable = Object.values(constant.colors[el - 1])[0];
//           ctx.fillStyle = colorVariable;
//           ctx.fillRect(x + rowIdx, y + columnIdx, 1, 1);
//           console.log(x + rowIdx, y + columnIdx);
//         }
//       });
//     });
//   }
// }

export function move(event) {
  // 화살표 키 입력을 감지하고 블록을 이동합니다.
  // (이 부분은 원하는 게임 논리로 변경해야 합니다.

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
}
