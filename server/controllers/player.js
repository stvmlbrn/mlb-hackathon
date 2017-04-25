const appRoot = require('app-root-path');
const router = require('express').Router();
const Player = require(`${appRoot}/server/models/player`);
//---------------------------------------------------------------
router.get('/', (req, res, next) => {
  const { name } = req.query || '';

  Player.search(name)
    .then(result => res.json(result))
    .catch(err => next(err));
});
//---------------------------------------------------------------
router.get('/:id/year/:yr', (req, res, next) => {
  Player.getData(req.params.id, req.params.yr)
    .then(result => res.json(result))
    .catch(err => next(err));
});
//---------------------------------------------------------------
module.exports = router;
