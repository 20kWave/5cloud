const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/5cloud');
const db = mongoose.connection;
db.on('err', console.error.bind(console, 'cannot connect to db'));
db.once('open', () => { console.log('db connected'); });

const userSchema = new mongoose.Schema({
  id: Number,
  user_name: String,
  location: String,
  profile_pic: String,
});
const songSchema = new mongoose.Schema({
  id: Number,
  song_name: String,
  artist_name: String,
});
const albumSchema = new mongoose.Schema({
  id: Number,
  album_title: String,
  album_art: String,
  artist_name: String,
  publish_date: String,
});
const playlistSchema = new mongoose.Schema({
  id: Number,
  playlist_name: String,
  playlist_art: String,
  created_by: Number,
});
const followerSchema = new mongoose.Schema({
  followed: Number,
  follower: Number,
});
const album_songSchema = new mongoose.Schema({
  album_id: Number,
  song_id: Number,
});
const playlist_songSchema = new mongoose.Schema({
  playlist_id: Number,
  song_id: Number,
});
const song_likeSchema = new mongoose.Schema({
  song_id: Number,
  liker: Number,
});
const song_repostSchema = new mongoose.Schema({
  song_id: Number,
  reposter: Number,
});
const playlist_likeSchema = new mongoose.Schema({
  playlist_id: Number,
  liker: Number,
});
const playlist_repostSchema = new mongoose.Schema({
  song_id: Number,
  reposter: Number,
});

const user = mongoose.model('users', userSchema);
const song = mongoose.model('songs', songSchema);
const album = mongoose.model('albums', albumSchema);
const playlist = mongoose.model('playlists', playlistSchema);
const follower = mongoose.model('followers', followerSchema);
const album_song = mongoose.model('album_songs', album_songSchema);
const playlist_song = mongoose.model('playlist_song', playlist_songSchema);
const song_like = mongoose.model('song_likes', song_likeSchema);
const song_repost = mongoose.model('song_reposts', song_repostSchema);
const playlist_like = mongoose.model('playlist_likes', playlist_likeSchema);
const playlist_repost = mongoose.model('playlist_reposts', playlist_repostSchema);


module.exports = {
  db,
  user,
  song,
  album,
  playlist,
  follower,
  album_song,
  playlist_song,
  song_like,
  song_repost,
  playlist_like,
  playlist_repost,
};
