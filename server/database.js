// database.js: This is the file that creates and exports a connection object to the MySQL database

// Import the mysql module
const mysql = require('mysql');

// Create a connection object with the connection parameters
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yoga'
});

// Connect to the MySQL database using the connect method
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

// Export the connection object
module.exports = connection;
