import { ImageMovie, IMovie } from "../components/types/types";

export const formatMovies = (movies: IMovie[]): Partial<IMovie>[] => {

  //check is critical values
  let myMovies = movies.filter(movie => {
    const { trailerLink, duration, nameRU, nameEN, country } = movie;
    const image = movie.image as ImageMovie;
    const regExpIsImg = /^\/uploads\/[\d\w]*\.jpeg/
    const regExpIsYoutubeLink = /^[https://]+(www\.youtube\.com\/watch\?v=)?(youtu\.be\/)?[-\d\w]*/

    if (!image.url
      || !regExpIsImg.test(image.url)
      || !trailerLink
      || !regExpIsYoutubeLink.test(trailerLink)
      || !nameRU
      || !nameEN
      || !country
      || typeof nameRU !== 'string'
      || typeof duration !== 'number'
    ) {
      return false
    }
    return true
  })

  return myMovies.map(movie => {
    let { country, director, duration, year, description, trailerLink,
      nameRU, nameEN, id, thumbnail } = movie
      let image = movie.image as ImageMovie;

    //check is not critical values
    director = director && typeof director === 'string' ? director : '';
    description = description && typeof description === 'string' ? description : '';
    year = year && typeof year === 'string' ? year : '';

    // format values
    let movieId = id;
    thumbnail = `https://api.nomoreparties.co${image?.formats?.thumbnail?.url}`;
    const imageStr = `https://api.nomoreparties.co${image.url}`;

    return {
      country, director, duration, year, description, image: imageStr, trailerLink,
      nameRU, nameEN, movieId, thumbnail
    }
  })
}

export const checkIsSaved = (movies: IMovie[], savedMovies: IMovie[]) =>
  movies.map((m) => {
    m.isSaved = false;

    savedMovies.forEach((sm) => {
      if (m.movieId === sm.movieId) {
        m.isSaved = true;
        m._id = sm._id
      }
    })
    return m;
  })

export const getDataForDB = ({
  country, director, duration, year, description, image, trailerLink,
  nameRU, nameEN, id, thumbnail, movieId
}: IMovie) => (
  {
    country, director, duration, year, description, image, trailerLink,
    nameRU, nameEN, id, thumbnail, movieId
  }
)

export const fillAllIsSaved = (movies: IMovie[]): IMovie[] =>
  movies.map(m => {
    m.isSaved = true;
    return m;
  })

export const filledLikeMovies = (movies: IMovie[], movie: IMovie): IMovie[] =>
  movies.map(m => {
    if (m.movieId === movie.movieId) {
      m.isSaved = true;
      m._id = movie._id
    }
    return m;
  })


export const removedLikeMovies = (movies: IMovie[], movie: IMovie): IMovie[] =>
  movies.map(m => {
    if (m.movieId === movie.movieId)
      m.isSaved = false;
    return m;
  })

  export const getDataLS = (str: string) => {
    const data = localStorage.getItem(str);
    if(data)
     return JSON.parse(data)
    else return null;
  }

export const filterMovies = (pageTitle: string, movies: IMovie[]): IMovie[] => {
  const movieIds = getDataLS(`${pageTitle}-searchResult`);
  return !movies.length
    ? movies.filter(m => movieIds.includes(m.movieId))
    : []
}

