import { capitalize } from "@helpers/utils";

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No $root provided for DOMListener class");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listen) => {
      const method = getMethodName(listen);
      const name = this.name || "";
      if (!this[method]) {
        throw new Error(
          `Method ${method} isn't implemented in ${name} Component`
        );
      }
      this[method] = this[method].bind(this);

      this.$root.on(listen, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listen) => {
      const method = getMethodName(listen);
      this.$root.off(listen, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}
