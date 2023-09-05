function shuffle() {
  const tetrisBlocks = [
    // 직사각형 블록
    [
      [9, 9],
      [9, 9],
    ],

    // I 블록
    [[9, 9, 9, 9]],

    // L 블록
    [
      [9, 0],
      [9, 0],
      [9, 9],
    ],

    // J 블록
    [
      [0, 9],
      [0, 9],
      [9, 9],
    ],

    // T 블록
    [
      [9, 9, 9],
      [0, 9, 0],
    ],

    // Z 블록
    [
      [9, 9, 0],
      [0, 9, 9],
    ],

    // S 블록
    [
      [0, 9, 9],
      [9, 9, 0],
    ],
  ];
  const randomNumber = Math.floor(Math.random() * tetrisBlocks.length);

  return tetrisBlocks[randomNumber];
}

export class Piece {
  originalArray = shuffle();
  randomNumber = Math.floor(Math.random() * 3) + 1;

  constructor(num) {
    this.initBlock = this.originalArray.map((row) =>
      row.map((value) => (value === 9 ? this.randomNumber : value))
    );
  }
  // generateRandomBlock() {
  //   // 무작위 블록 생성 로직 (shuffle 함수 등 사용)
  //   const randomNumber = Math.floor(Math.random() * 3) + 1;
  //   return new Piece(randomNumber);
  // }

  changeBlock(array) {
    this.initBlock = [...array];
  }
}
// export const newBlock = new Piece(randomNumber());
// export const initPiece = a.initBlock;
