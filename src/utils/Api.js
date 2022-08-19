class Api {
  constructor({ baseUrl, headers, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _fetch(path, method, bodyObject, renderLoading) {
    if (renderLoading) renderLoading(true)
    return fetch(`${this._baseUrl}${path}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: bodyObject ? JSON.stringify(bodyObject) : undefined,
      ...this._options
    })
      .then(this._checkResponse)
      .finally(() => {
        if (renderLoading) renderLoading(false)
      });
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res.status)
  }

}

export default Api;
