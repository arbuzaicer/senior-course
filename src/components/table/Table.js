import {
  isCellPressed,
  matrixSelection,
  nextSelector,
  shouldTableResize,
} from "@/components/table/tableFunctions";
import { resizeHandler } from "@/components/table/table.resize";
import { createTable } from "@/components/table/table.template";
import { TableSelection } from "@/components/table/TableSelection";
import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@helpers/domCreation";

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"], // "mouseup", "mousemove",
      ...options,
    });
    this.totalRows = 50;
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.emit("table:select", $cell);
  }

  init() {
    // наследование метода родителя - полиморфизм в методе для наследника
    super.init();

    const $cell = this.$root.find("[data-id='1:0']");
    this.selectCell($cell);

    this.on("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.on("formula:done", () => {
      this.selection.current.focus();
    });
  }

  onMousedown(e) {
    if (shouldTableResize(e)) {
      resizeHandler(e, this.$root);
    }

    if (isCellPressed(e)) {
      const isControlPressed = e.ctrlKey;
      const $target = $(e.target);
      if (isControlPressed) {
        const $selectedElements = matrixSelection(
          $target,
          this.selection.current
        ).map((el) => this.$root.find(`[data-id="${el}"]`));

        this.selection.selectGroup($selectedElements);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(e) {
    const { code } = e;
    const $current = this.selection.current;
    const current = $current.id(true);

    const buttons = [
      "ArrowRight",
      "ArrowLeft",
      "ArrowDown",
      "ArrowUp",
      "Tab",
      "Enter",
    ];

    if (buttons.includes(code) && !e.shiftKey) {
      e.preventDefault();
      const $target = this.$root.find(
        nextSelector(code, current, this.totalRows)
      );
      this.selection.select($target);
      this.emit("table:select", $target);
    }
  }

  onInput(event) {
    this.emit("table:input", $(event.target));
  }

  toHTML() {
    return createTable(this.totalRows);
  }
}
