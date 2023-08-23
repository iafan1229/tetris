// main.js
import { setCanvas, move } from './canvas.js';
import { constant } from './constant.js';
import { initPiece } from './piece.js';
import { drawBoard } from './board.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

setCanvas(canvas, ctx);

const saveMovefunction = move();
// 키보드 누를 때마다 방향이 바뀌도록 이벤트 리스너를 추가합니다.
canvas.addEventListener('keydown', (event) => {
	const { x, y } = saveMovefunction(event, ctx);
	console.log(x);
	drawBoard(x, y, ctx);
});
