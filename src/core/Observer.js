export class Observer {
  constructor() {
    this.listeners = {};
  }

  // Notify entities about changes
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }

    this.listeners[event].forEach((el) => el(...args));
    return true;
  }

  // Subscribe on changes
  subscribe(event, fn) {
    // add functions into existing listener event
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (callback) => callback !== fn
      );
    };
  }
}
