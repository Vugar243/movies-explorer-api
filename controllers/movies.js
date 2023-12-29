// controllers/movies.js
const Movie = require('../models/movie');
const handleError = require('../utils/errorHandler');

const getSavedMovies = (req, res) => {
  const userId = req.user._id;
  // Валидация: проверка, существует ли у пользователя _id
  if (!userId) {
    const validationError = { status: 400, message: 'Некорректный идентификатор пользователя' };
    return handleError(validationError, res);
  }
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch((err) => handleError(err, res));
};

const createMovie = (req, res) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;
  // Проверка наличия всех обязательных полей
  if (!country || !director || !duration || !year || !description
    || !image || !trailerLink || !nameRU || !nameEN || !thumbnail || !movieId) {
    const validationError = { status: 400, message: 'Все поля обязательны для заполнения' };
    return handleError(validationError, res);
  }
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
  // Валидация: проверка, существует ли у пользователя _id
  if (!userId) {
    const validationError = { status: 400, message: 'Некорректный идентификатор пользователя' };
    return handleError(validationError, res);
  }
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
