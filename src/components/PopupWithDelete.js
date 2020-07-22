import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(selector) {
    super (selector); //this._popupForm
  }

  setEventListeners({del}) {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      del();
      this.close();
    })
  }
}
