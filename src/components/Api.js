export class Api {
  constructor(options){
    this._url = options.url;
    this._method = options.method;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: this._method,
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: this._method,
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  setProfileInfo(inputValues) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about
      })
    })
    .then(this._handleResponse)
  }

  addCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.place,
        link: card.link
      })
    })
    .then(this._handleResponse)
  }

  deleteCard(card) {
    return fetch(`${this._url}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  addLike(card) {
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  removeLike(card) {
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  editAvatar(inputValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValue.avatar
      })
    })
    .then(this._handleResponse)
  }
}
