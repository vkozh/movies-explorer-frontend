export const formatMovies = (movies) => {

  //check is critical values
  movies = movies.filter(movie => {
    const { image, trailerLink, duration, nameRU } = movie;
    const regExpIsImg = /^\/uploads\/[\d\w]*\.jpeg/
    const regExpIsYoutubeLink = /^[https://]+(www\.youtube\.com\/watch\?v=)?(youtu\.be\/)?[-\d\w]*/

    if (!image.url
      || !regExpIsImg.test(image.url)
      || !trailerLink
      || !regExpIsYoutubeLink.test(trailerLink)
      || !nameRU
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
    country = country && typeof country === 'string' ? country : '';
    director = director && typeof director === 'string' ? director : '';
    description = description && typeof description === 'string' ? description : '';
    year = year && typeof year === 'string' ? year : '';
    nameEN = nameEN && typeof nameEN === 'string' ? nameEN : '';

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
    savedMovies.forEach(sm => {
      if (sm.movieId === m.movieId) {
        m.isSaved = true;
        m._id = sm._id
      }
    })
    return m;
  })

