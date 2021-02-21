import { shouldTableResize } from "@/components/table/tableFunctions";
import { resizeHandler } from "@/components/table/table.resize";
import { createTable } from "@/components/table/table.template";
import { ExcelComponent } from "@core/ExcelComponent";

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root) {
    super($root, {
      listeners: ["mousedown"], // "mouseup", "mousemove", "click"
    });
  }

  // onClick(e) {
  //   console.log(e);
  // }

  onMousedown(e) {
    if (shouldTableResize(e)) {
      resizeHandler(e, this.$root);
    }
  }

  // onMousemove(e) {
  //   console.log(e);
  // }

  // onMouseup(e) {
  //   console.log(e);
  // }

  toHTML() {
    return createTable(50);
  }
}
