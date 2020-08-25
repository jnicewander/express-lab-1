const { Pool } = require('pg');

const credentials = new Pool({
  user: "postgres",
  password: "GC_PASSWORD",
  host: "localhost",
  port: 5433,
  database: "ExpressShopDB",
  ssl: false,
});

module.exports = credentials;