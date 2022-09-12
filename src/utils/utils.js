export const formatMovies = (movies) => {

  //check is critical values
  movies = movies.filter(movie => {
    const { image, trailerLink, duration, nameRU, nameEN, country } = movie;
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

  return movies.map(movie => {
    let { country, director, duration, year, description, image, trailerLink,
      nameRU, nameEN, id, thumbnail } = movie

    //check is not critical values
    director = director && typeof director === 'string' ? director : '';
    description = description && typeof description === 'string' ? description : '';
    year = year && typeof year === 'string' ? year : '';

    // format values
    let movieId = id;
    thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
    image = `https://api.nomoreparties.co${image.url}`;

    return {
      country, director, duration, year, description, image, trailerLink,
      nameRU, nameEN, movieId, thumbnail
    }
  })
}

export const checkIsSaved = (movies, savedMovies) =>
  movies.map(m => {
    m.isSaved = false;

    savedMovies.forEach(sm => {
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
}) => (
  {
    country, director, duration, year, description, image, trailerLink,
    nameRU, nameEN, id, thumbnail, movieId
  }
)

export const fillAllIsSaved = (movies) =>
  movies.map(m => {
    m.isSaved = true;
    return m;
  })

export const filledLikeMovies = (movies, movie) =>
  movies.map(m => {
    if (m.movieId === movie.movieId) {
      m.isSaved = true;
      m._id = movie._id
    }
    return m
  })


export const removedLikeMovies = (movies, movie) =>
  movies.map(m => {
    if (m.movieId === movie.movieId)
      m.isSaved = false;
    return m
  })


export const filterMovies = (pageTitle, movies) => {
  const mIds = JSON.parse(localStorage.getItem(`${pageTitle}-searchResult`));
  return !movies.length ? movies.filter(m => mIds.includes(m.movieId)) : []
}

