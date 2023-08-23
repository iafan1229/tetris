// board.js
import { constant } from './constant.js';
import { initPiece as piece } from './piece.js';

export function drawBoard(x, y, ctx) {
	ctx.clearRect(
		0,
		0,
		constant.ROW * constant.double,
		constant.COLUMN * constant.double
	);
	piece.forEach((row, columnIdx) => {
		row.forEach((el, rowIdx) => {
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
