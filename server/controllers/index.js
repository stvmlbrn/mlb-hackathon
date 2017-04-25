const router = require('express').Router();

router.use('/player', require('./player'));

router.get('/', (req, res, next) => res.render('index'));

module.exports = router;
