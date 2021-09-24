const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ElectronApp",
});

function getConnection() {
  console.log(connection);
  return connection;
  
}

module.exports = { 
  getConnection 
};
