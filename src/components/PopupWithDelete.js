import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(selector, {handleDelete}) {
    super (selector); //this._popupForm
    this._delete = handleDelete;
    this._deleteElement = this._deleteElement.bind(this);
  }

  close() {
    super.close();

    this._popupForm.removeEventListener('submit', this._deleteElement);
  }

  _deleteElement(evt) {
    evt.preventDefault();
    this._delete();
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', this._deleteElement);
  }
}
