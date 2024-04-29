const ROW = 9;
const COL = 9;

const gameBoard = document.querySelector(".game");

const positionOfBombs = [];

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
				const position = 9 * i + j;
				positionOfBombs.push(position);
				colElement.textContent = "💣";
				colElement.dataset.condition = "bomb";
			} else {
				colElement.dataset.condition = "empty";
			}
			colElement.dataset.row = i;
			colElement.dataset.col = j;
			colElement.classList.add("cell");
			colElement.classList.add("hide");
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

	const visited = new Set();

	// reveal empty cell when user click
	cells.forEach((cell) => {
		cell.addEventListener("click", (e) => {
			const row = Number(e.target.dataset.row);
			const col = Number(e.target.dataset.col);
			if (
				cell.dataset.condition === "empty" &&
				!cell.classList.contains("reveal")
			) {
				revealEmptyCells(row, col, cells, visited);
			}
			if (cell.dataset.condition === "info") {
				cell.classList.remove("hide");
			}
			if (cell.dataset.condition === "bomb") {
				// reveal all bombs and end game
				positionOfBombs.forEach((position) =>
					cells[position].classList.remove("hide")
				);
			}
		});
	});
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
				topElement.dataset.condition = "info";
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
				bottomElement.dataset.condition = "info";
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
				leftElement.dataset.condition = "info";
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
				rightElement.dataset.condition = "info";
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
				topRightElement.dataset.condition = "info";
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
				topLeftElement.dataset.condition = "info";
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
				bottomLeftElement.dataset.condition = "info";
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
				bottomRightElement.dataset.condition = "info";
			}
		}
	}
}

function revealEmptyCells(row, col, grid, visited) {
	if (visited.has(9 * row + col)) return;

	const isRowBoundary = row >= 0 && row < ROW;
	const isColBoundary = col >= 0 && col < COL;

	if (!isRowBoundary || !isColBoundary) return;

	const order = 9 * row + col;
	visited.add(order);
	const cell = grid[order];

	if (!cell) return;

	if (cell.dataset.condition === "empty") {
		// reveal
		cell.classList.add("reveal");
		cell.classList.remove("hide");

		// check top
		revealEmptyCells(row - 1, col, grid, visited);

		//check bottom
		revealEmptyCells(row + 1, col, grid, visited);

		//check left
		revealEmptyCells(row, col - 1, grid, visited);

		//check right
		revealEmptyCells(row, col + 1, grid, visited);
	}

	return;
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
