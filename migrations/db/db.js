const PG = require('pg') ;
const { Pool } = PG;
const dotenv = require('dotenv');

dotenv.config();
const PoolConnection = new Pool();

module.exports = PoolConnection;