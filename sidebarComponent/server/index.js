require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../database/methods.js');

const app = express();

const PORT = 5000;

app.use(express.json());

app.use('/songs/:id', express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/currentSong/songs/:id', (req, res) => {
  console.log('being hit with GET req for current song info');
  db.getCurrentSong(req, res);
});

app.get('/relatedtracks/songs/:id', (req, res) => {
  console.log('being hit with GET req for related tracks');
  db.getRelatedTracks(req, res);
});

app.get('/userlike/songs/:id', (req, res) => {
  console.log('being hit with GET req for user likes');
  db.getUsersLiked(req, res);
});

app.get('/userrepost/songs/:id', (req, res) => {
  console.log('being hit with GET req for user reposts');
  db.getUsersRepost(req, res);
});

app.get('/playlistincluded/songs/:id', (req, res) => {
  console.log('being hit with GET req for playlists');
  db.getInclusivePlaylists(req, res);
});

app.get('/albumincluded/songs/:id', (req, res) => {
  console.log('being hit with GET req for albums with song in them');
  db.getInclusiveAlbums(req, res);
});

// app.use(
//   '/app.js',
//   express.static(path.join(__dirname, '../public/dist/bundle.js'))
// );

// new idea: use one route that accepts the song_id and it GETs all of the above information by
// calling each of the premade mysql methods

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
