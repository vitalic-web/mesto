import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit}) {
    super (selector); //this._popupForm
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this.inputList = this._popupForm.querySelectorAll('.popup__input');
    this.formValues = {};

    this.inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
    });

    return this.formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();

    this._popupForm.querySelector('.popup__container').reset();
  }
}
