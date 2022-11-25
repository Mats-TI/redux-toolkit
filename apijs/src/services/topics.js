const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM topics LIMIT ${offset},${config.listPerPage}`
  );
  const totalCount = await db.query(
    `SELECT count(id) as "results"
    FROM topics`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page, totalCount};

  return {
    data,
    meta
  }
}

async function create(topic){
  const result = await db.query(
    `INSERT INTO programming_languages 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    (${topic.title}, ${topic.description}, ${topic.post_type}, ${topic.post_status} )`
  );

  let message = 'Error in creating topic';

  if (result.affectedRows) {
    message = 'Topic created successfully';
  }

  return {message};
}

async function update(id, topic){
  const result = await db.query(
    `UPDATE topics 
    SET title="${topic.title}", description=${topic.description}, post_status=${topic.post_status}  
    WHERE id=${id}` 
  );

  let message = 'Error in updating topic';

  if (result.affectedRows) {
    message = 'Topic updated successfully';
  }
  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM topics WHERE id=${id}`
  );
  let message = 'Error in deleting topic';

  if (result.affectedRows) {
    message = 'Topic deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}