const db = require('./index.js');

const getCurrentSong = function (req, res) {
  db.query(
    `SELECT * FROM songs WHERE id = ${req.params.id}`,
    (err, song) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(song);
      }
    },
  );
//   console.log(req.params.id)
};

const getRelatedTracks = function (req, res) {
  db.query(
    `SELECT * FROM songs WHERE tag = (SELECT tag FROM songs WHERE id = ${req.params.id}) LIMIT 3 OFFSET 2`,
    (err, songs) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(songs);
      }
    },
  );
};

const getUsersLiked = function (req, res) {
  db.query(
    `SELECT * FROM users WHERE id IN (SELECT liker FROM song_likes WHERE song_id =  ${req.params.id})`,
    (err, users) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    },
  );
};

const getUsersRepost = function (req, res) {
  db.query(
    `SELECT * FROM users WHERE id = (SELECT reposter FROM song_reposts WHERE songs = ${req.params.id})`,
    (err, users) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    },
  );
};

const getInclusivePlaylists = function (req, res) {
  db.query(
    `SELECT * FROM playlists WHERE id = (SELECT playlist_id FROM playlist_songs WHERE song_id =${req.params.id})`,
    (err, playlists) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(playlists);
      }
    },
  );
};

const getInclusiveAlbums = function (req, res) {
  db.query(
    `SELECT * FROM albums INNER JOIN album_songs
    ON album_songs.album_id = albums.id
    AND album_songs.song_id = ${req.params.id}`,
    (err, albums) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(albums);
      }
    },
  );
};

module.exports.getRelatedTracks = getRelatedTracks;
module.exports.getUsersLiked = getUsersLiked;
module.exports.getUsersRepost = getUsersRepost;
module.exports.getInclusivePlaylists = getInclusivePlaylists;
module.exports.getInclusiveAlbums = getInclusiveAlbums;
module.exports.getCurrentSong = getCurrentSong;
