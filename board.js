// board.js
import { constant } from './constant.js';
import { initPiece as piece } from './piece.js';

let direction = [];
let key;
//키 누를시 마다 1로 변함
let keyFlag = [0, 0, 0, 0];

function isValid() {
	if (
		direction.some((el) => Math.abs(el) === 10) ||
		direction.some((el) => Math.abs(el) === 430)
	) {
		return false;
	}

	return true;
}

export function setCanvas(canvas, ctx) {
	let x = 0;
	let y = 0;
	canvas.width = constant.ROW * constant.double;
	canvas.height = constant.COLUMN * constant.double;
	drawBoard(x, y, ctx);
}

export function drawBoard(x, y, ctx) {
	console.log(isValid());
	// console.log(keyFlag);
	if (isValid()) {
		ctx.clearRect(
			0,
			0,
			constant.ROW * constant.double,
			constant.COLUMN * constant.double
		);
		direction = [];
		piece.forEach((row, columnIdx) => {
			row.forEach((el, rowIdx) => {
				direction.push(x + (rowIdx + 4) * constant.double);
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
	let x = 0;
	let y = 0;
	return function moveClosure(event) {
		if (event.key === 'ArrowLeft') {
			keyFlag = [1, 0, 0, 0];
			if (keyFlag[0]) {
				x -= 10;
			} // 왼쪽으로 이동
		} else if (event.key === 'ArrowRight') {
			keyFlag = [0, 1, 0, 0];
			if (keyFlag[1]) {
				x += 10; // 오른쪽으로 이동
			}
		} else if (event.key === 'ArrowUp') {
			if (keyFlag[2]) y -= 10; // 위로 이동
		} else if (event.key === 'ArrowDown') {
			if (keyFlag[3]) y += 10; // 아래로 이동
		}
		key = event.key;
		console.log(key);
		return { x, y };
	};
}
