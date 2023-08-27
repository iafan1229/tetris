import { newBlock as piece } from './piece.js';
import { animate, move, drawBoard, array } from './board.js';
import { constant } from './constant.js';
import { canvas } from './canvas.js';
const initiatedCanvas = document.getElementById('myCanvas');
export const ctx = initiatedCanvas.getContext('2d');

//블록 자동으로 움직이게

requestAnimationFrame(() => {
	animate(Date.now(), constant.time);
});
// 페이지가 로드될 때 canvas에 포커스를 주기
window.addEventListener('load', () => {
	canvas.reset();
	initiatedCanvas.width = constant.ROW * constant.double;
	initiatedCanvas.height = constant.COLUMN * constant.double;
	initiatedCanvas.focus();
});

// 키보드 누를 때마다 방향이 바뀌도록 이벤트 리스너를 추가합니다.
initiatedCanvas.addEventListener('keydown', (event) => {
	const { x, y } = move(event);

	if (event.key !== 'ArrowUp') {
		drawBoard(x, y, ctx, array);
	}
});
