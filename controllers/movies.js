const Movie = require('../models/movie');
const handleError = require('../utils/errorHandler');

const getSavedMovies = (req, res) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch((err) => handleError(err, res));
};

const createMovie = (req, res) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  const userId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: userId,
    movieId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => handleError(err, res));
};

const deleteMovie = (req, res) => {
  const { _id } = req.params;
  const userId = req.user._id;
  Movie.findOneAndDelete({ _id, owner: userId })
    .then((movie) => {
      if (!movie) {
        const notFoundError = { status: 404, message: 'Фильм не найден' };
        return handleError(notFoundError, res);
      }
      // Проверяем, является ли текущий пользователь владельцем фильма
      if (movie.owner.toString() !== userId) {
        const unauthorizedError = { status: 403, message: 'Недостаточно прав для удаления фильма' };
        return handleError(unauthorizedError, res);
      }
      res.send(movie);
    })
    .catch((err) => handleError(err, res));
};

module.exports = { getSavedMovies, createMovie, deleteMovie };
