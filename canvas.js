import { constant } from './constant.js';
import { array } from './board.js';
import { newBlock } from './piece.js';

class Canvas {
	piece = newBlock.initBlock;
	constructor() {
		this.reset();
		this.piece;
	}

	// 새 게임이 시작되면 보드를 초기화한다.
	reset() {
		this.grid = this.getEmptyBoard();
		return this.grid;
	}

	// 0으로 채워진 행렬을 얻는다.
	getEmptyBoard() {
		return Array.from({ length: constant.COLUMN }, () =>
			Array(constant.ROW).fill(0)
		);
	}
	freeze(x, y) {
		this.piece = [...array];
		this.piece.forEach((row, columnIdx) => {
			row.forEach((el, rowIdx) => {
				if (el >= 1) {
					// 현재 블록의 각 셀을 게임 보드에 고정
					console.table(this.piece); //0+9-3

					const boardY = Math.floor(
						(x + rowIdx * constant.double) / constant.double
					);
					console.log(boardY);
					// const boardX = Math.floor(
					// 	(y + rowIdx * constant.double) / constant.double
					// );
					// const boardY = columnI
					// 게임 보드에 값을 설정 (9는 블록이 차있는 상태를 나타냄)
					// this.grid[][] = el;
					this.grid[boardY][0] = el;
				}
			});
		});
		console.table(this.grid);
		this.piece = array;
	}
}

export const canvas = new Canvas();
