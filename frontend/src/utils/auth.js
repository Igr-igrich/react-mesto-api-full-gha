class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _validateResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => this._validateResponse(res));
  };

  login = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => this._validateResponse(res))
      .then(data => {
        const token = data.token;
        localStorage.setItem('jwt', token);
        return data;
      });
  };

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      return this._validateResponse(res);
    });
  }
}

export const auth = new Auth({
  baseUrl: 'https://api.igor.nomoredomainsmonster.ru'
});
