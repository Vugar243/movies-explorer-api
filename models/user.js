// models/users.js
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" обязательно для заполнения'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" обязательно для заполнения'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "name" обязательно для заполнения'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
