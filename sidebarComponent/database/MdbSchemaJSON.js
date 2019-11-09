let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Sidebar')
let db = mongoose.connection;
db.on('err', console.error.bind(console, 'cannot connect to db'));
db.once('open', () => { console.log('db connected'); });

let userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    address: String,
    avatar: String,
    followers: Array
})
let songSchema = new mongoose.Schema({
    id: Number,
    name: String,
    tag: String,
    likes: Array,
    reposts: Array
})
let albumSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    published: Date,
    songs: Array
})
let playlistSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    poster: Number,
    likes: Array,
    reposts: Array
})

let user = mongoose.model('users', userSchema);
let song = mongoose.model('songs', songSchema);
let album = mongoose.model('albums', albumSchema);
let playlist = mongoose.model('playlists', playlistSchema);

module.exports = {
    db,
    user,
    song,
    album,
    playlist,
}