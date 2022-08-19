export const formatMovies = (movies) => {
  return movies.map(movie => {
    let { country, director, duration, year, description, image, trailerLink,
      nameRU, nameEN, id, thumbnail } = movie

    thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
    image = `https://api.nomoreparties.co${image.url}`;
    let movieId = id;

    return {
      country, director, duration, year, description, image, trailerLink,
      nameRU, nameEN, movieId, thumbnail
    }
  })
}

export const formatSavedMovies = (movies) => {
  return movies.map(({
    country, director, duration, year, description, image, trailerLink,
    nameRU, nameEN, movieId, thumbnail
  }) => ({
    country, director, duration, year, description, image, trailerLink,
    nameRU, nameEN, movieId, thumbnail
  }))
}


export const checkIsSaved = (movies, savedMovies) =>
  movies.map(m => {
    savedMovies.forEach(sm => {
      if (sm.movieId === m.movieId) {
        return m['isSaved'] = true
      }
    })
    return m
  })

