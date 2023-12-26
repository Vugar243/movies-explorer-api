// utils/errorHandler.js

const handleError = (err, res) => {
  let statusCode;
  let errorMessage;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorMessage = err.message || 'Некорректные данные';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    errorMessage = 'Некорректный формат данных';
  } else if (err.code === 11000) {
    statusCode = 409;
    errorMessage = 'Данные уже существуют';
  } else if (err.status === 401) {
    statusCode = 401;
    errorMessage = 'Недостаточно прав для выполнения операции';
  } else if (err.status === 403) {
    statusCode = 403;
    errorMessage = 'Доступ запрещен';
  } else if (err.status === 404) {
    statusCode = 404;
    errorMessage = 'Ресурс не найден';
  } else {
    statusCode = 500;
    errorMessage = 'На сервере произошла ошибка';
  }
  res.status(statusCode).send({ message: `Ошибка: ${errorMessage}` });
};

module.exports = handleError;
