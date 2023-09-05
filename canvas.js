import { constant } from "./constant.js";

export class Canvas {
  constructor(ctx, piece) {
    this.x = 3;
    this.y = 0;
    this.ctx = ctx;
    this.piece = piece;
    this.xDirection = [];
    this.yDirection = [];
    this.keyFlag = [0, 0, 0, 0];
    // this.array = JSON.parse(JSON.stringify([...this.piece])); // Deep copy of the initial array
    this.rotations = 0;
    this.blockCount = 0;
  }

  // 새 게임이 시작되면 보드를 초기화한다.
  reset() {
    this.grid = Array.from({ length: constant.COLUMN }, () =>
      Array(constant.ROW).fill(0)
    );
    return this.grid;
  }
  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value >= 1) {
          this.ctx.fillStyle = Object.values(constant.colors[value - 1])[0];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  draw(x, y, ctx, block) {
    if (this.isValid()) {
      ctx.clearRect(0, 0, constant.ROW, constant.COLUMN);
      // console.log(block);

      block.forEach((row, columnIdx) => {
        this.xDirection = [];
        this.yDirection = [];
        row.forEach((el, rowIdx) => {
          this.xDirection.push(x + rowIdx);
          this.yDirection.push(y + columnIdx);
          console.log(this.yDirection);
          if (el >= 1) {
            let colorVariable = Object.values(constant.colors[el - 1])[0];
            ctx.fillStyle = colorVariable;
            ctx.fillRect(x + rowIdx, y + columnIdx, 1, 1);
            //끝에 도달하면
            if (this.yDirection.some((el) => Math.abs(el) === 11)) {
              this.freeze();
              // const newBlock = this.freeze(array);
              // this.blockArray.push(newBlock);
              this.blockCount += 1;
              //-----초기화
              this.x = 3;
              this.y = 0;
              this.xDirection = [];
              this.yDirection = [];
              this.keyFlag = [0, 0, 0, 0];
              // array = JSON.parse(JSON.stringify([...newBlock]));
              this.rotations = 0;
              //------초기화 끝
            }
          }
        });
      });
    }
    this.drawBoard();
  }
  animate(now, time) {
    // 지난 시간을 업데이트한다.
    time.elapsed = now - time.start;
    // // 지난 시간이 현재 레벨의 시간을 초과했는지 확인한다.
    if (time.elapsed > time.level) {
      // 현재 시간을 다시 측정한다.
      time.start = now;
      this.y += 1;
      this.draw(this.x, this.y, this.ctx, this.piece);
    }

    requestAnimationFrame(() => this.animate(Date.now(), constant.time));
  }
  move(event) {
    // 화살표 키 입력을 감지하고 블록을 이동합니다.
    // (이 부분은 원하는 게임 논리로 변경해야 합니다.

    if (event.key === "ArrowLeft") {
      this.keyFlag = [1, 0, 0, 0];
      if (this.isValid()) {
        this.x -= 10;
      } // 왼쪽으로 이동
    } else if (event.key === "ArrowRight") {
      this.keyFlag = [0, 1, 0, 0];
      if (this.isValid()) {
        this.x += 10; // 오른쪽으로 이동
      }
    } else if (event.key === "ArrowUp") {
      // this.keyFlag = [0, 0, 1, 0];
      this.rotateArrayClockwise();
      // if (this.isValid()) y -= 10; // 위로 이동
    } else if (event.key === "ArrowDown") {
      this.keyFlag = [0, 0, 0, 1];
      if (this.isValid()) this.y += 10; // 아래로 이동
    }
    this.key = event.key;
    return { x: this.x, y: this.y };
  }
  isValid() {
    //왼쪽 끝에 도달하고 [1,0,0,0]임
    if (
      this.xDirection.some((el) => Math.abs(el) === 0) &&
      keyFlag.findIndex((el) => el === 1) === 0
    ) {
      return false;
    }
    //오른쪽 끝에 도달
    if (
      this.xDirection.some((el) => Math.abs(el) === 270) &&
      keyFlag.findIndex((el) => el === 1) === 1
    ) {
      return false;
    }
    if (
      this.yDirection.some((el) => Math.abs(el) === 11) &&
      keyFlag.findIndex((el) => el === 1) === 3
    ) {
      return false;
    }

    return true;
  }
  freeze() {
    // this.piece = [...array];
    this.piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value >= 1) {
          // 현재 블록의 각 셀을 게임 보드에 고정
          // 게임 보드에 값을 설정 (9는 블록이 차있는 상태를 나타냄)
          this.grid[y + this.y][x + this.x] = value;
        }
      });
    });
    console.log(this.grid);
    // this.piece = array;
  }
  rotateArrayClockwise() {
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
      this.array = JSON.parse(JSON.stringify([...blockArray[blockCount]]));
      this.rotations = 0;
    }

    this.piece.changeBlock(array);

    this.draw(x, y, ctx, array);
  }
}
