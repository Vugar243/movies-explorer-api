// config.js
const config = {
  development: {
    mongoUri: 'mongodb://127.0.0.1:27017/bitfilmsdb',
    // Другие конфигурационные параметры для разработки
  },
  production: {
    mongoUri: process.env.MONGODB_URI,
    // Другие конфигурационные параметры для продакшена
  },
};

module.exports = config;
