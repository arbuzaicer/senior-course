import { Observer } from "@core/Observer";
import { $ } from "@helpers/domCreation";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components ?? [];
    this.observer = new Observer();
  }

  getRoot() {
    const $root = $.create("div", "excel");
    const componentOptions = { observer: this.observer };

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.map((comp) => comp.init());
  }

  destroy() {
    this.components.forEach((comp) => comp.destroy());
  }
}
