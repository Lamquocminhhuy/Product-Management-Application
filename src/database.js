const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ElectronApp",
});

function getConnection() {

  return connection;
  
}

module.exports = { getConnection };
