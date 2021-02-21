import { $ } from "@helpers/domCreation";

export function resizeHandler(e, $root) {
  if (e.target.dataset.resize) {
    // determine which type of the resize elements were pressed: column or row
    const isCol = e.target.dataset.resize === "col";
    // get parent element with event target attribute we clicked
    const $target = $(e.target);
    const $parent = $target.closest("[data-type='resizable']");
    const dataAttrs = $parent.dataAttrs;
    const targetCoords = $parent.getCoords();

    const cells = $root.findAll(`[data-col="${dataAttrs.col}"]`);

    // initialize moving value for calculate resize position
    let value;

    // UI changes

    // add unlimited length of resize item
    $target.css({
      opacity: 1,
      [isCol ? "bottom" : "right"]: "-5000px",
    });

    // add listeners
    document.onmousemove = (e) => {
      const delta = isCol
        ? e.pageX - targetCoords.right
        : e.pageY - targetCoords.bottom;
      value = (isCol ? targetCoords.width : targetCoords.height) + delta;

      $target.css({
        [isCol ? "right" : "bottom"]: -delta + "px",
      });
    };

    // clear previously created mousemove listeners
    document.onmouseup = () => {
      // clear documents mouse events
      document.onmousemove = null;
      document.onmouseup = null;

      $target.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });

      cells.forEach((cel) => (cel.style.width = value + "px"));
      $parent.css({
        [isCol ? "width" : "height"]: value + "px",
      });
    };
  }
}
