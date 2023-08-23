import { constant } from './constant.js';
import { initPiece } from './piece.js';

function board(ctx, color, initPiece) {
	initPiece.forEach((row, columnIdx) => {
		row.forEach((el, rowIdx) => {
			console.log(el);
			if (el >= 1) {
				const colorVariable = Object.values(constant.colors[el - 1])[0];
				ctx.fillStyle = colorVariable;
				ctx.fillRect(
					(rowIdx + 2) * constant.double,
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

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

setBoard(canvas);
export default board(ctx, 'blue', initPiece);
