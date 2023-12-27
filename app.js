// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('./rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const allRoutes = require('./routes/index');
const config = require('./config');
const { PORT } = require('./constants');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
app.use(cors());

mongoose.connect(process.env.NODE_ENV === 'production' ? config.production.mongoUri : config.development.mongoUri);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// Подключение роутов для пользователей
app.use(requestLogger); // Подключаем логгер запросов

app.use('/', allRoutes);

app.use(errorLogger); // Подключаем логгер ошибок

app.listen(PORT);
