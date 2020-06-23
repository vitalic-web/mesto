import {popupOpenPhoto} from './index.js';

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
    const imageElement = this._element.querySelector('.element__image');

    imageElement.src = this._link;
    this._element.querySelector('.element__title-text').textContent = this._name;
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
      this._openPhoto();
    })
  }

  _switchLike() { // лайки
    this._element.querySelector('.element__title-like').classList.toggle('element__title-like_active');
  }

  _deleteElement() { // удаление карточки
    this._element.remove();
    this._element = null;
  }

  _openPhoto() { // заполнение данными открытой фотографии, но без фактического открытия
    popupOpenPhoto.querySelector('.popup-photo__text').textContent = this._name;
    popupOpenPhoto.querySelector('.popup-photo__image').src = this._link;
    popupOpenPhoto.querySelector('.popup-photo__image').alt = this._name;
  }
}
