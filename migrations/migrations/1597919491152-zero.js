'use strict'
const db = require('../db/db');
const fs = require('fs');
const path = process.cwd();

module.exports.up = async function (next) {
  const sqlFile = fs.readFileSync(path + '/db/initDB.sql');
  const result = await db.query(sqlFile.toString());
  console.log(result);
  // const result = await db.query
  next()
}

module.exports.down = function (next) {
  next()
}
