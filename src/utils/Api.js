class Api {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _fetch(path, method, headers, bodyObject, renderLoading) {
    console.log(this._baseUrl, path)
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
    return res.json().then((data) => {
      const validationError = Object.values(data)[3]?.body?.message;
      validationError && console.log(validationError)
      throw new Error(data.error)
    });
  }

}

export default Api;
