class Api {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _fetch(path, method, headers, bodyObject, renderLoading) {
    if (renderLoading) renderLoading(true)
    return fetch(`${this._baseUrl}${path}`, {
      method: method,
      headers: { 'Content-Type': 'application/json', ...headers },
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
    let status = res.status;
    return res.json().then((data) => {
      const error = new Error(Object.values(data));
      error.code = status;
      throw error;
    });
  }

}

export default Api;
