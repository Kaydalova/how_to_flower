import { bazeUrl } from './constants.js';

export class Api {
  constructor(bazeUrl) {
    this._bazeUrl = bazeUrl;
  }

  _handleResult(res) {
    if (res.ok) {
        return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getAllPlants() {
    return fetch(`${this._bazeUrl}/flowers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(this._handleResult)
  }

  signUp(data) {
    return fetch(`${bazeUrl}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify(data)
      })
    .then(this._handleResult)
  }

  signIn(data) {
    return fetch(`${bazeUrl}/auth/token/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //credentials: 'include',
      body: JSON.stringify({
        'email': data.email,
        'password': data.password
        })
    })
    .then(this._handleResult)
  }

  getUserRequest() {
    return fetch(`${bazeUrl}/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
    })
    .then(this._handleResult)
  }

  getUserPlantsRequest() {
    return fetch(`${bazeUrl}/my_flowers/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
    })
    .then(this._handleResult)
  }

  /*updateUser(data) {
    return fetch(`${bazeUrl}/auth/user/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
      //credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._handleResult)
  }*/

  editUserInfo(data) {
    return fetch(`${this._bazeUrl}/users/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }

  addNewFlower(data) {
    return fetch(`${this._bazeUrl}/my_flowers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }

  /*editFlowerInfo(flowerID, data) {
    return fetch(`${this._bazeUrl}/my_flowers/${flowerID}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }*/

  editFlowerInfo(flowerID, data) {
    console.log(flowerID, data);
    return fetch(`${this._bazeUrl}/my_flowers/${flowerID}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }

  removeFlower(flowerID) {
    return fetch(`${this._bazeUrl}/my_flowers/${flowerID}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      }
    }).then(this._handleResult)
  }

  signOut() {
    return fetch(`${bazeUrl}/signout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
  }

  checkToken() {
    return fetch(`${bazeUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._handleResult)
  }
}

export const api = new Api(bazeUrl);
