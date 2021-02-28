export const CODES = {
  A: 65,
  Z: 90,
};

function createCell(rowIndex) {
  return function renderCells(content, index) {
    return `
        <div 
            class="cell" 
            contenteditable 
            data-col="${index}"
            data-type="cell"
            data-id="${rowIndex}:${index}"
            >${content}</div>
    `;
  };
}

function createCol(el, index) {
  return `
        <div 
            class="column" 
            data-type='resizable' 
            data-col=${index}
            >
          ${el}
          <div class="col-resize" data-resize='col'></div>
        </div>
    `;
}

function createRow(content, rows) {
  const resizeSection = rows
    ? "<div class='row-resize' data-resize='row'></div>"
    : "";

  return `
    <div class="row" data-type='resizable'>
        <div class="row-info">
          ${rows ? rows : ""}
          ${resizeSection}
        </div>
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
      return createCol(currentChart, index);
    })
    .join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columns)
      .fill("")
      .map(createCell(i + 1))
      .join("");

    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}
