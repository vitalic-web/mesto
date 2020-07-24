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

  _handleResponseError(err) {
    return Promise.reject(err.message)
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: this._method,
      headers: this._headers
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: this._method,
      headers: this._headers
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
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
    .catch(this._handleResponseError)
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
    .catch(this._handleResponseError)
  }

  deleteCard(card) {
    return fetch(`${this._url}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  addLike(card) {
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  removeLike(card) {
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
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
    .catch(this._handleResponseError)
  }
}
