class Piece {
  initBlock = [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ];
  constructor() {
    this.initBlock;
  }

  init() {
    this.initBlock.forEach((row, column) => {
      console.log(row);
    });
  }
}

export const initPiece = new Piece().initBlock;
