const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Sidebar');
const db = mongoose.connection;
db.on('err', console.error.bind(console, 'cannot connect to db'));
db.once('open', () => { console.log('db connected'); });

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  avatar: String,
  followers: Array,
});
const songSchema = new mongoose.Schema({
  id: Number,
  name: String,
  tag: String,
  likes: Array,
  reposts: Array,
});
const albumSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  published: Date,
  songs: Array,
});
const playlistSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  poster: Number,
  likes: Array,
  reposts: Array,
});

const user = mongoose.model('users', userSchema);
const song = mongoose.model('songs', songSchema);
const album = mongoose.model('albums', albumSchema);
const playlist = mongoose.model('playlists', playlistSchema);

module.exports = {
  db,
  user,
  song,
  album,
  playlist,
}
;