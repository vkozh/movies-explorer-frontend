import { IMovie } from "../components/types/types";
import { Api, ApiParams } from "./Api";

class MoviesApi extends Api {
  baseUrl!: string

  constructor({ baseUrl, ...options }: ApiParams) {
    super({ baseUrl, ...options })
  }

  getMovies(renderLoading: (isLoading: boolean) => void) {
    return super._fetch('/', "GET", {}, undefined, renderLoading)
  }

  saveMovie(body: IMovie) {
    return super._fetch('/', "POST", {}, body)
  }

  removeMovie(id: number) {
    return super._fetch(`/${id}`, "DELETE")
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: `https://api.filmopoisk.nomoredomains.xyz/movies`,
  withCredentials: true,
  credentials: 'include',
});

export const beatfilmMoviesApi = new MoviesApi({
  baseUrl: `https://api.nomoreparties.co/beatfilm-movies`,
})


