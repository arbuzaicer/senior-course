export class TableSelection {
  static className = "selected";
  static classGroupName = "group-selected";

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el, focusable = true) {
    this.clear();
    this.current = $el;
    this.group.push($el);
    if (!focusable) {
      $el.addClass(TableSelection.className);
    } else {
      $el.focus().addClass(TableSelection.className);
    }
  }

  clear() {
    this.group.forEach(($el) => {
      $el.removeClass(TableSelection.className);
      $el.removeClass(TableSelection.classGroupName);
    });
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => {
      $el.addClass(TableSelection.classGroupName);
    });
  }

  mouseMoveSelection(group = []) {
    console.log(group);
    this.group = group;
    this.group.forEach(($el) => $el.toggleClass(TableSelection.classGroupName));
  }
}
