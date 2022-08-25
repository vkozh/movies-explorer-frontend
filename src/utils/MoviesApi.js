import Api from "./Api";

class MoviesApi extends Api {
  constructor({ baseUrl, ...options }) {
    super({ baseUrl, ...options })
  }

  getMovies(setIsLoading) {
    return super._fetch('/', "GET", {}, null, setIsLoading)
  }

  saveMovie(body) {
    return super._fetch('/', "POST", {}, body)
  }

  removeMovie(id) {
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


