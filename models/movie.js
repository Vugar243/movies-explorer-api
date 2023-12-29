// models/movie.js
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" обязательно для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" обязательно для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" обязательно для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" обязательно для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" обязательно для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" обязательно для заполнения'],
    validate: {
      validator: (v) => validator.isURL(v), // Проверка на URL-адрес
      message: 'Некорректный формат URL-адреса для изображения',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" обязательно для заполнения'],
    validate: {
      validator: (v) => validator.isURL(v), // Проверка на URL-адрес
      message: 'Некорректный формат URL-адреса для трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" обязательно для заполнения'],
    validate: {
      validator: (v) => validator.isURL(v), // Проверка на URL-адрес
      message: 'Некорректный формат URL-адреса для миниатюры',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Поле "owner" обязательно для заполнения'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" обязательно для заполнения'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" обязательно для заполнения'],
  },
}, { versionKey: false });

module.exports = mongoose.model('Movie', movieSchema);
