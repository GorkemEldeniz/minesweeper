const ROW = 9;
const COL = 9;

const gameBoard = document.querySelector(".game");

window.addEventListener("load", () => {
	// generate bombs positions randomly
	const bombPositionSet = generateBombs();

	// create a grid
	for (let i = 0; i < ROW; i++) {
		const rowElement = document.createElement("ol");
		rowElement.classList.add("row");
		for (let j = 0; j < COL; j++) {
			const colElement = document.createElement("li");

			if (bombPositionSet.has(`${i},${j}`)) {
				colElement.textContent = "💣";
			}
			colElement.dataset.row = i;
			colElement.dataset.col = j;
			colElement.classList.add("cell");
			rowElement.append(colElement);
		}
		gameBoard.append(rowElement);
	}

	const cells = document.querySelectorAll(".cell");

	// place info cells
	for (let pos of bombPositionSet) {
		const [row, col] = pos.split(",").map(Number);
		generateInfos(row, col);
	}
});

function generateBombs(bombsNumber = 10) {
	const positionsOfBomb = new Set();

	while (positionsOfBomb.size < bombsNumber) {
		const posRow = getRandomNumber(0, 9);
		const posCol = getRandomNumber(0, 9);

		positionsOfBomb.add(`${posRow},${posCol}`);
	}

	return positionsOfBomb;
}

function generateInfos(row, col) {
	const cells = document.querySelectorAll(".cell");

	// check top
	if (row > 0) {
		const order = 9 * (row - 1) + col;
		const topElement = cells[order];
		if (topElement) {
			const content = topElement.textContent;
			if (content && content !== "💣") {
				topElement.textContent = Number(content) + 1;
			} else if (!content) {
				topElement.textContent = 1;
			}
		}
	}

	// check bottom
	if (row < 8) {
		const order = 9 * (row + 1) + col;
		const bottomElement = cells[order];
		if (bottomElement) {
			const content = bottomElement.textContent;
			if (content && content !== "💣") {
				bottomElement.textContent = Number(content) + 1;
			} else if (!content) {
				bottomElement.textContent = 1;
			}
		}
	}

	// check left
	if (col > 0) {
		const order = row * 9 + (col - 1);
		const leftElement = cells[order];
		if (leftElement) {
			const content = leftElement.textContent;
			if (content && content !== "💣") {
				leftElement.textContent = Number(content) + 1;
			} else if (!content) {
				leftElement.textContent = 1;
			}
		}
	}

	// check right
	if (col < 8) {
		const order = row * 9 + (col + 1);
		const rightElement = cells[order];
		if (rightElement) {
			const content = rightElement.textContent;
			if (content && content !== "💣") {
				rightElement.textContent = Number(content) + 1;
			} else if (!content) {
				rightElement.textContent = 1;
			}
		}
	}

	// top right cross
	if (col < 8 && row > 0) {
		const order = (row + 1) * 9 + (col + 1);
		const topRightElement = cells[order];
		if (topRightElement) {
			const content = topRightElement.textContent;
			if (content && content !== "💣") {
				topRightElement.textContent = Number(content) + 1;
			} else if (!content) {
				topRightElement.textContent = 1;
			}
		}
	}

	// top left cross
	if (col > 0 && row > 0) {
		const order = (row + 1) * 9 + (col - 1);
		const topLeftElement = cells[order];
		if (topLeftElement) {
			const content = topLeftElement.textContent;
			if (content && content !== "💣") {
				topLeftElement.textContent = Number(content) + 1;
			} else if (!content) {
				topLeftElement.textContent = 1;
			}
		}
	}

	// bottom left cross
	if (row < 8 && col > 0) {
		const order = (row - 1) * 9 + (col - 1);
		const bottomLeftElement = cells[order];
		if (bottomLeftElement) {
			const content = bottomLeftElement.textContent;
			if (content && content !== "💣") {
				bottomLeftElement.textContent = Number(content) + 1;
			} else if (!content) {
				bottomLeftElement.textContent = 1;
			}
		}
	}

	// bottom right cross
	if (row < 8 && col < 8) {
		const order = (row - 1) * 9 + (col + 1);
		const bottomRightElement = cells[order];
		if (bottomRightElement) {
			const content = bottomRightElement.textContent;
			if (content && content !== "💣") {
				bottomRightElement.textContent = Number(content) + 1;
			} else if (!content) {
				bottomRightElement.textContent = 1;
			}
		}
	}
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
