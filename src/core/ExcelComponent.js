import { DOMListener } from "./DOMListener";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.observer = options.observer;

    this.subscriptions = [];
    this.prepare();
  }

  // Notify listeners about events
  emit(event, ...args) {
    this.observer.emit(event, ...args);
  }

  // Subscribing on events
  on(event, fn) {
    const unsub = this.observer.subscribe(event, fn);

    // add subscriptions
    this.subscriptions.push(unsub);
  }

  // adjusting component before init method calling
  prepare() {}

  // initializing component and all methods, listeners
  init() {
    this.initDOMListeners();
  }

  // remove component, listeners
  destroy() {
    this.removeDOMListeners();

    // removing all subscriptions
    this.subscriptions.forEach((sub) => sub());
  }

  toHTML() {
    return "";
  }
}
