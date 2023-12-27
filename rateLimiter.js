const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимальное количество запросов с одного IP в заданный интервал
  message: 'Превышен лимит запросов, попробуйте позже.',
});

module.exports = limiter;
