import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector, photoText, photoImage) {
    super (selector); //this._popupForm
    this._photoText = this._popupForm.querySelector(photoText);
    this._photoImage = this._popupForm.querySelector(photoImage);
  }

  open(name, link) {
    this._photoText.textContent = name;
    this._photoImage.src = link;
    this._photoImage.alt = name;

    super.open();
  }
}

