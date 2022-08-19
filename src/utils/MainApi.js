import Api from "./Api";

class MainApi extends Api {
  constructor({ baseUrl, ...options }) {
    super({ baseUrl, ...options })
  }

  register(body) {
    return super._fetch('/signup', 'POST', body)
  }

  login(body) {
    return super._fetch('/signin', 'POST', body)
  }

  logout() {
    return super._fetch('/signout', 'POST')
  }

  updateProfile(body) {
    return super._fetch('/users/me', 'PATCH', body)
  }

  getUser() {
    return super._fetch('/users/me', 'GET')
  }

}

const mainApi = new MainApi({
  baseUrl: 'https://api.filmopoisk.nomoredomains.xyz',
  withCredentials: true,
  credentials: 'include',
});

export default mainApi;
