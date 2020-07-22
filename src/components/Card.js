export class Card {
  constructor(template, name, link, likes, {handleCardClick, handleLikeOn, handleLikeOff}) {
    this._template = template;
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._handleCardClick = handleCardClick;
    this._handleLikeOn = handleLikeOn;
    this._handleLikeOff = handleLikeOff;
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
    const likeAmount = this._element.querySelector('.element__like-amount');

    imageElement.src = this._link;
    textElement.textContent = this._name;
    imageElement.alt = this._name;
    likeAmount.textContent = this._likes;

    return this._element;
  }

  _setEventListeners() {
    const likeAmount = this._element.querySelector('.element__like-amount');

    this._element.querySelector('.element__title-like').addEventListener('click', (evt) => {
      if(evt.target.classList.contains('element__title-like_active')) {
        this._handleLikeOff();
        this._removeLike();
        likeAmount.textContent--;
      } else {
        this._handleLikeOn();
        this._addLike();
        likeAmount.textContent++;
      }
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  _addLike() { // лайки
    this._element.querySelector('.element__title-like').classList.add('element__title-like_active');
  }

  _removeLike() {
    this._element.querySelector('.element__title-like').classList.remove('element__title-like_active');
  }

  _deleteElement() { // удаление карточки
    this._element.remove();
    this._element = null;
  }
}
