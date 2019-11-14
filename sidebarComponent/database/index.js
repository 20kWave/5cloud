const { Client } = require('pg');
// why the {}?
const client = new Client({
  user: 'matthiasfore',
  host: '127.0.0.1',
  database: 'whoami',
  password: null,
  port: '5432',
});

client.connect((err) => {
  if (err) {
    console.log('connection error: ', err.stack);
  }else {
    console.log('connected to psql');
  }
});

module.exports = client;


// let mysql = require('mysql');

// let connection = mysql.createConnection({
//   user: 'root',
//   password: 'password',
//   database: '5cloud'
// });

// connection.connect();

// module.exports = connection;
