const express = require('express');
const router = express.Router();
const topics = require('../services/topics');

/* GET topics. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await topics.getMultiple(req.query.currentPage, req.query.currentCategory ));
    // console.log(`IDs routes `, req.query, req.query.currentPage, req.query.currentCategory);
  } catch (err) {
    console.error(`Error while getting topics `, err.message);
    next(err);
  }
});

/* POST topic */
router.post('/', async function(req, res, next) {
  try {
    res.json(await topics.create(req.body));
  } catch (err) {
    console.error(`Error while creating topic`, err.message);
    next(err);
  }
});

/* PUT topic */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await topics.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating topic`, err.message);
    next(err);
  }
});

/* DELETE topic */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await topics.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting topic`, err.message);
    next(err);
  }
});

module.exports = router;