const express = require('express');
const router = express.Router();
const categories = require('../services/categories');

/* GET categories. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await categories.getMultiple());
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

/* POST category */
router.post('/', async function(req, res, next) {
  try {
    res.json(await categories.create(req.body));
  } catch (err) {
    console.error(`Error while creating category`, err.message);
    next(err);
  }
});

/* PUT category */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await categories.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating category`, err.message);
    next(err);
  }
});

/* DELETE category */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await categories.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting category`, err.message);
    next(err);
  }
});

module.exports = router;