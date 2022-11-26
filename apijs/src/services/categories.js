const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(currentPage = 1){
  const offset = helper.getOffset(currentPage, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM categories ` // LIMIT ${offset},${config.listPerPage}
  );
  const totalCount = await db.query(
    `SELECT count(id) as "results"
    FROM categories`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {currentPage, totalCount};

  return {
    data,
    meta
  }
}

async function create(category){
  const result = await db.query(
    `INSERT INTO categories 
    (title, description ) 
    VALUES 
    (${category.title}, ${category.description} )`
  );

  let message = 'Error in creating category';

  if (result.affectedRows) {
    message = 'Category created successfully';
  }

  return {message};
}

async function update(id, category){
  const result = await db.query(
    `UPDATE categories 
    SET title="${category.title}", description=${category.description} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating category';

  if (result.affectedRows) {
    message = 'Category updated successfully';
  }
  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM categories WHERE id=${id}`
  );
  let message = 'Error in deleting category';

  if (result.affectedRows) {
    message = 'Category deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}