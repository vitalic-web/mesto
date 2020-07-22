export class Popup {
  constructor(selector) {
    this._popupForm = document.querySelector(selector);
    this._closeIcon = this._popupForm.querySelector('.popup__close-icon');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popupForm.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._popupForm.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_active')) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeIcon.addEventListener('click', () => {
      console.log('close-icon')
      this.close();
    })
  }
}
