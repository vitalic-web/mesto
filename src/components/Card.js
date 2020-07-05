export class Card {
  constructor(template, name, link, {handleCardClick}) {
    this._template = template;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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
    const imageElement = this._element.querySelector('.element__image');
    const textElement = this._element.querySelector('.element__title-text');

    imageElement.src = this._link;
    textElement.textContent = this._name;
    imageElement.alt = this._name;

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
      this._handleCardClick();
    })
  }

  _switchLike() { // лайки
    this._element.querySelector('.element__title-like').classList.toggle('element__title-like_active');
  }

  _deleteElement() { // удаление карточки
    this._element.remove();
    this._element = null;
  }
}
