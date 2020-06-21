export class Card {
  constructor(template, name, link) {
    this._template = template;
    this._name = name;
    this._link = link;
  }

  _getTemplate() { // создание пустой карточки из шаблона
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  }

  generateCard() { // создание карточки с контентом, используется метод создания из шаблона
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title-text').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__title-like').addEventListener('click', () => {
      this._switchLike();
    })

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteElement();
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPhoto();
    })
  }

  _switchLike() { // лайки
    this._element.querySelector('.element__title-like').classList.toggle('element__title-like_active');
  }

  _deleteElement() { // удаление карточки
    this._element.remove();
  }

  _openPhoto() { // открытие фотки
    const openPhotoElement = document.querySelector('.popup_open_photo');
    openPhotoElement.querySelector('.popup-photo__text').textContent = this._name;
    openPhotoElement.querySelector('.popup-photo__image').src = this._link;

    openPhotoElement.classList.toggle('popup_active');
  }
}
