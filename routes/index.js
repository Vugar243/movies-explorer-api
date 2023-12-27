// routes/index.js
const express = require('express');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRoutes = require('./auth');
const authMiddleware = require('../middlewares/auth'); // Переместили import сюда

const router = express.Router();

router.use('/', authRoutes);

router.use(authMiddleware);

router.use('/', usersRouter);
router.use('/', moviesRouter);

module.exports = router;
