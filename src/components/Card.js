export class Card {
  constructor(template, cardElement, {handleCardClick, handleLikeOn, handleLikeOff, errorPopupOpen, deleteCard}) {
    this._template = template;
    this._name = cardElement.name;
    this._link = cardElement.link;
    this._likes = cardElement.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleLikeOn = handleLikeOn;
    this._handleLikeOff = handleLikeOff;
    this._errorPopupOpen = errorPopupOpen;
    this._deleteCard = deleteCard;
    this._checkLike = this._checkLike.bind(this);
    this._errorPopup = this._errorPopup.bind(this);
    this._element = this._getTemplate();
    this._textElement = this._element.querySelector('.element__title-text');
    this._likeAmount = this._element.querySelector('.element__like-amount');
    this._likeElement = this._element.querySelector('.element__title-like');
    this._imageElement = this._element.querySelector('.element__image');
    this._deleteElement = this._element.querySelector('.element__delete');
  }

  _getTemplate() { // создание пустой карточки из шаблона
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() { // создание карточки с контентом
    this._setEventListeners();

    this._imageElement.src = this._link;
    this._textElement.textContent = this._name;
    this._imageElement.alt = this._name;
    this._likeAmount.textContent = this._likes;

    return this._element;
  }

  _checkLike(evt) {
    if(evt.target.classList.contains('element__title-like_active')) {
      this._handleLikeOff();
    } else {
      this._handleLikeOn();
    }
  }

  _errorPopup() {
    this._errorPopupOpen();
    this._deleteCard();
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', this._checkLike);
    this._imageElement.addEventListener('click', this._handleCardClick);
    this._deleteElement.addEventListener('click', this._errorPopup);
  }

  _removeEventListeners() {
    this._likeElement.removeEventListener('click', this._checkLike);
    this._imageElement.removeEventListener('click', this._handleCardClick);
    this._deleteElement.removeEventListener('click', this._errorPopup);
  }

  addLike() { // лайки
    this._likeElement.classList.add('element__title-like_active');
  }

  removeLike() {
    this._likeElement.classList.remove('element__title-like_active');
  }

  addLikeAmount() {
    this._likeAmount.textContent++;
  }

  removeLikeAmount() {
    this._likeAmount.textContent--;
  }

  deleteElement() { // удаление карточки
    this._removeEventListeners();
    this._element.remove();
    this._element = null;
  }
}
