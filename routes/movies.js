// routes/movies.js
const router = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getSavedMovies);
router.post('/movies', createMovie);
router.delete('/movies/:_id', deleteMovie);

module.exports = router;
