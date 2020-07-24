export class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(method, element) {
    if (method === 'append') {
      this._container.append(element);
    } else this._container.prepend(element);
  }
}
