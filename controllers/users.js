const User = require('../models/user');
const handleError = require('../utils/errorHandler');

const getUserInfo = (req, res) => {
  const userId = req.user._id; // Assuming user information is available through req.user
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const notFoundError = { status: 404, message: 'Пользователь не найден' };
        return handleError(notFoundError, res);
      }
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};

const updateUserInfo = (req, res) => {
  const { name, email } = req.body;

  // Проверка обязательных полей
  if (!name || !email) {
    const validationError = { status: 400, message: 'Поля "name" и "email" обязательны для заполнения' };
    return handleError(validationError, res);
  }

  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        const notFoundError = { status: 404, message: 'Пользователь не найден' };
        return handleError(notFoundError, res);
      }
      res.send(user);
    })
    .catch((err) => handleError(err, res));
};

module.exports = { getUserInfo, updateUserInfo };
