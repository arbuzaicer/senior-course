const CODES = {
  A: 65,
  Z: 90,
};

function createCell(content) {
  return `
        <div class="cell" contenteditable>${content}</div>
    `;
}

function createCol(el) {
  return `
        <div class="column">${el}</div>
    `;
}

function createRow(content, rows) {
  return `
    <div class="row">
        <div class="row-info">${rows ? rows : ""}</div>
        <div class="row-data">${content}</div>
    </div>`;
}

export function createTable(rowsCount = 15) {
  const columns = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(columns)
    .fill("")
    .map((_, index) => {
      const currentChart = String.fromCharCode(CODES.A + index);
      return createCol(currentChart);
    })
    .join("");

  const cells = new Array(columns).fill("").map(createCell).join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}
