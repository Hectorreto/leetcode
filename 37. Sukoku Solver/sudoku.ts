/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
  const rows = Array(9).fill(undefined).map<{ [key: number]: boolean }>(() => ({}));
  const cols = Array(9).fill(undefined).map<{ [key: number]: boolean }>(() => ({}));
  const boxes = Array(9).fill(undefined).map<{ [key: number]: boolean }>(() => ({}));
  let remaining = 0;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j];
      if (value === ".") {
        remaining++;
        continue;
      }

      rows[i][value] = true;
      cols[j][value] = true;

      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      boxes[boxIndex][value] = true;
    }
  }

  const findNext = () => {
    let current: { i: number; j: number; values: number[] } | undefined;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== ".") continue;

        const values: number[] = [];
        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        for (let value = 1; value <= 9; value++) {
          if (rows[i][value]) continue;
          if (cols[j][value]) continue;
          if (boxes[boxIndex][value]) continue;
          values.push(value);
        }
        if (values.length === 0) return;

        if (!current || values.length < current.values.length) {
          current = { i, j, values };
        }
        // if (values.length === 1) return current;
      }
    }

    return current;
  };

  const solve = () => {
    if (remaining === 0) return true;

    const current = findNext();
    if (!current) return;

    const { i, j, values } = current;
    const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

    for (const value of values) {
      board[i][j] = String(value);
      rows[i][value] = true;
      cols[j][value] = true;
      boxes[boxIndex][value] = true;
      remaining--;

      const solved = solve();
      if (solved) return true;

      board[i][j] = ".";
      rows[i][value] = false;
      cols[j][value] = false;
      boxes[boxIndex][value] = false;
      remaining++;
    }
  };

  solve();
}

const input = [
  [".", ".", "1",   ".", ".", ".",   ".", ".", "."],
  [".", ".", ".",   ".", ".", "1",   ".", ".", "."],
  [".", ".", ".",   ".", ".", ".",   "2", ".", "."],

  [".", ".", ".",   ".", ".", ".",   ".", "1", "."],
  [".", ".", ".",   ".", ".", ".",   ".", ".", "."],
  [".", ".", ".",   ".", ".", ".",   ".", ".", "."],

  [".", ".", ".",   ".", ".", ".",   ".", ".", "1"],
  [".", ".", ".",   ".", ".", ".",   ".", ".", "."],
  [".", ".", ".",   ".", ".", ".",   ".", ".", "."],
];
solveSudoku(input);
for (let i = 0; i < 9; i++) {
  const row = input[i];
  console.log(`${row[0]} ${row[1]} ${row[2]} | ${row[3]} ${row[4]} ${row[5]} | ${row[6]} ${row[7]} ${row[8]}`);
  if ([2, 5].includes(i)) {
    console.log("------+-------+------");
  }
}
