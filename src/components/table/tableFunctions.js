import { CODES } from "@/components/table/table.template";
import { range } from "@helpers/utils";

export function shouldTableResize(e) {
  return e.target.dataset.resize;
}

export function isCellPressed(e) {
  return e.target.dataset.type === "cell";
}

export function matrixSelection($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);

  const columns = range(current.cell, target.cell);
  const rows = range(current.row, target.row);

  return columns.reduce((acc, curr) => {
    rows.forEach((el) => acc.push(`${el}:${curr}`));
    return acc;
  }, []);
}

export function nextSelector(key, { cell, row }, totalRows) {
  const cellsCount = CODES.Z - CODES.A;
  switch (key) {
    case "ArrowRight":
    case "Tab":
      cell = cell + 1 > cellsCount ? cell : cell + 1;
      break;
    case "ArrowDown":
    case "Enter":
      row = row >= totalRows ? row : row + 1;
      break;
    case "ArrowLeft":
      cell = cell - 1 < 0 ? cell : cell - 1;
      break;
    case "ArrowUp":
      row = row <= 1 ? row : row - 1;
      break;
  }

  return `[data-id="${row}:${cell}"]`;
}
