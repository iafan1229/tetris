// canvas.js
import { constant } from './constant.js';
import { drawBoard } from './board.js';

export function setCanvas(canvas, ctx) {
	let x = 0;
	let y = 0;
	canvas.width = constant.ROW * constant.double;
	canvas.height = constant.COLUMN * constant.double;
	drawBoard(x, y, ctx);
}

export function move(event, ctx) {
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

// export function drawBlock(x, y, ctx) {
// ctx.clearRect(
// 	0,
// 	0,
// 	constant.ROW * constant.double,
// 	constant.COLUMN * constant.double
// );

// 	// 블록을 그립니다.
// 	ctx.fillStyle = blockColor[0]; // 블록 색상
// 	ctx.fillRect(
// 		x,
// 		y,
// 		blockColor[1] * constant.double,
// 		blockColor[2] * constant.double
// 	); // 블록 크기와 위치
// }
