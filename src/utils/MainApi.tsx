import { IUser } from "../components/types/types";
import { Api, ApiParams } from "./Api";

class MainApi extends Api{
 baseUrl!: string;

  constructor({ baseUrl, ...options }: ApiParams) {
    super({ baseUrl, ...options })
  }

  register(body: IUser) {
    return super._fetch('/signup', 'POST', {}, body, undefined);
  }

  login(body: IUser) {
    return super._fetch('/signin', 'POST', {}, body, undefined);
  }

  logout() {
    return super._fetch('/signout', 'POST', {}, undefined, undefined);
  }

  updateProfile(body: IUser) {
    return super._fetch('/users/me', 'PATCH', {}, body, undefined);
  }

  getUser() {
    return super._fetch('/users/me', 'GET')//, { 'Cache-Control': 'public, max-age=0' })
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.filmopoisk.nomoredomains.xyz',
  withCredentials: true,
  credentials: 'include',
});

export default mainApi;
