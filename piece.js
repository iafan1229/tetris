function randomNumber() {
	const randomNumber = Math.floor(Math.random() * 3) + 1;
	return randomNumber;
}

class Piece {
	constructor(num) {
		this.initBlock = [
			[num, num, num],
			[0, num, 0],
			[0, 0, 0],
		];
	}
}

const a = new Piece(randomNumber());
console.log(a);
export const initPiece = a.initBlock;
