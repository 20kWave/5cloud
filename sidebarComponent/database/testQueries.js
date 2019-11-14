const { Client } = require('pg');
// why the {}?
const client = new Client({
  user: 'matthiasfore',
  host: '127.0.0.1',
  database: 'whoami',
  password: null,
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log('connection error: ', err.stack);
  } else {
    console.log('connected to psql');
  }
});

client.query(
  `SELECT * FROM songs WHERE id = 1`,
  (err, song) => {
    if (err) {
      console.log(err);
    } else {
      console.log(song.rows[0]);
    }
    client.end();
  }
);
