let db = require('./index.js');

let getCurrentSong = function(req, res) {
  db.query(
    `SELECT * FROM songs WHERE id = "${req.params.id}"`,
    (err, song) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(song);
      }
    }
  );
};

let getRelatedTracks = function(req, res) {
  db.query(
    `SELECT * FROM songs WHERE tag = (SELECT tag FROM songs WHERE id = "${req.params.id}")`,
    (err, songs) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(songs);
      }
    }
  );
};

let getUsersLiked = function(req, res) {
  db.query(
    `SELECT * FROM users WHERE id = (SELECT user FROM song_likes WHERE song_id = ${req.params.id})`,
    (err, users) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    }
  );
};

let getUsersRepost = function(req, res) {
  db.query(
    `SELECT * FROM users WHERE id = (SELECT reposter FROM song_reposts WHERE song_id = ${req.params.id})`,
    (err, users) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    }
  );
};

let getInclusivePlaylists = function(req, res) {
  db.query(
    `SELECT * FROM playlists WHERE id = (SELECT playlist_id FROM playlist_songs where song_id = ${req.params.id})`,
    (err, playlists) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(playlists);
      }
    }
  );
};

let getInclusiveAlbums = function(req, res) {
  db.query(
    `SELECT * FROM albums WHERE id = (SELECT album FROM album_songs WHERE song_id = ${req.params.id})`,
    (err, albums) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(albums);
      }
    }
  );
};

module.exports.getRelatedTracks = getRelatedTracks;
module.exports.getUsersLiked = getUsersLiked;
module.exports.getUsersRepost = getUsersRepost;
module.exports.getInclusivePlaylists = getInclusivePlaylists;
module.exports.getInclusiveAlbums = getInclusiveAlbums;
module.exports.getCurrentSong = getCurrentSong;
