// board.js
import { constant } from './constant.js';
import { initPiece as piece } from './piece.js';

export function setCanvas(canvas, ctx) {
	let x = 0;
	let y = 0;
	canvas.width = constant.ROW * constant.double;
	canvas.height = constant.COLUMN * constant.double;
	drawBoard(x, y, ctx);
}

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

export function move() {
	// 화살표 키 입력을 감지하고 블록을 이동합니다.
	// (이 부분은 원하는 게임 논리로 변경해야 합니다)
	let x = 0;
	let y = 0;
	return function moveClosure(event) {
		if (event.key === 'ArrowLeft') {
			x -= 10; // 왼쪽으로 이동
		} else if (event.key === 'ArrowRight') {
			x += 10; // 오른쪽으로 이동
		} else if (event.key === 'ArrowUp') {
			y -= 10; // 위로 이동
		} else if (event.key === 'ArrowDown') {
			y += 10; // 아래로 이동
		}
		return { x, y };
	};
}
