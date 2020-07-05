import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super (selector); //this._popupForm
  }

  open(name, link) {
    super.open();

    const photoText = this._popupForm.querySelector('.popup-photo__text');
    const photoImage = this._popupForm.querySelector('.popup-photo__image');

    photoText.textContent = name;
    photoImage.src = link;
    photoImage.alt = name;
  }
}

