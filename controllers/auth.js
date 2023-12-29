// controllers/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const User = require('../models/user');
const handleError = require('../utils/errorHandler');

const createUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const validationError = { status: 400, message: 'Все поля обязательны для заполнения' };
    return handleError(validationError, res);
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => handleError(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const validationError = { status: 400, message: 'Все поля обязательны для заполнения' };
    return handleError(validationError, res);
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const notFoundError = { status: 401, message: 'Неправильные почта или пароль' };
        return handleError(notFoundError, res);
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const authError = { status: 401, message: 'Неправильные почта или пароль' };
            return handleError(authError, res);
          }

          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch((err) => handleError(err, res));
};

module.exports = { createUser, login };
