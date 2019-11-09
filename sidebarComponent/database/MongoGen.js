const fs = require ('fs');
var faker = require('faker');

// COUNTS
var userCount = 100;
var songsCount = 100;
var albumsCount = 10;
var playlistsCount = 10;
var followersCount = 0;
var album_songsCount = 0;
var playlist_songsCount = 0;
var song_likesCount = 0;
var song_repostCount = 0;
var playlist_likesCount = 0;
var playlist_repostsCount = 0;
// TESTS
var TotalTime;
var start = new Date;


//USER GENERATOR
let usersStream = fs.createWriteStream(__dirname + '/MongoData/userList.json');
function writeUsers(writer, encoding, callback) {
  let i = userCount;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const uString = "{ id: " + i + ", username: "(faker.name.findName()).slice(0,25) + ', location : ' + faker.fake("{{address.state}} {{address.country}}").slice(0,25) + ', avatar: ' + faker.image.avatar() + '\n';





      if (i === 0) {
        writer.write(uString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(uString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//SONG GENERATOR
let songsStream = fs.createWriteStream(__dirname + '/MongoData/songList.json')
function writeSongs(writer, encoding, callback) {
  let i = songsCount;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const sString = faker.lorem.words().slice(0,25) + ',' + faker.name.findName().slice(0,25) + ',' + "#" + (faker.hacker.adjective()).toUpperCase().slice(0,24) + '\n';
      if (i === 0) {
        writer.write(sString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(sString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//ALBUM GENERATOR
let albumsStream = fs.createWriteStream(__dirname + '/MongoData/album_songs.json')
function writeAlbums(writer, encoding, callback) {
  let i = albumsCount;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const aString = faker.company.bs().slice(0,25) + ',' + faker.image.fashion() + ',' + faker.name.findName().slice(0,25) + ',' + faker.date.between('1950-01-01', '2020-12-31').toDateString() + '\n';
      if (i === 0) {
        writer.write(aString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(aString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//PLAYLIST GENERATOR
var poster = () => {
    return Math.floor(userCount * Math.random())
}
let playlistStream = fs.createWriteStream(__dirname + '/MongoData/playLists.json')
function writePlaylists(writer, encoding, callback) {
  let i = playlistsCount;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const pString = faker.company.bsNoun() + ',' + faker.image.abstract() + ',' + poster() + '\n';
      if (i === 0) {
        writer.write(pString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(pString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//FOLLOWER GENERATOR
let followerStream = fs.createWriteStream(__dirname + '/MongoData/followersList.json')
function writeFollowers(writer, encoding, callback) {
  let i = userCount;
  var x = 0;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      followers = []
      var fString = '';
      while(Math.random() > 0.8 && followers.length < userCount){
        var f = poster();
        if(!followers.includes(f) || f === i){
          followersCount += 1;
          followers.push(f);
          fString += x + ',' + f + '\n';
          }
      }
      if (i === 0) {
        writer.write(fString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(fString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//SONGS IN ALBUM GENERATOR
let album_songStream = fs.createWriteStream(__dirname + '/MongoData/album_songs.json')
function writeAlbumSongs(writer, encoding, callback) {
  let i = albumsCount;
  var x = 0;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      songs = [];
      var asString = '';
      while(songs.length ==  0 || Math.random > 0.5 || songs.length < 12){
        var s = Math.floor(songsCount * Math.random()) + 1;
        if(!songs.includes(s)){
            album_songsCount += 1;
            songs.push(s);
            asString += x + ',' + s + '\n';
        }
      }
      if (i === 0) {
        writer.write(asString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(asString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//SONGS IN PLAYLIST GENERATOR
let playlist_songStream = fs.createWriteStream(__dirname + '/MongoData/playlist_songs.json')
function writePlaylistSongs(writer, encoding, callback) {
  let i = playlistsCount;
  var x = 0;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      var psString = '';
      songs = []
      while(songs.length < 15 && Math.random() > 0.25 || songs.length < 1){
        var s = Math.floor(songsCount * Math.random()) + 1;
        if(!songs.includes(s)){
            playlist_songsCount += 1;
            songs.push(s);
            psString += x + ',' + s + '\n';
        }
    }
      if (i === 0) {
        writer.write(psString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(psString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}


//SONG LIKE GENERATOR
let song_likeStream = fs.createWriteStream(__dirname + '/MongoData/songLikersList.json')
function writeSongLikes(writer, encoding, callback) {
  let i = songsCount;
  var x = 0;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      var slString = '';
    //   if(Math.random() > 0.5){
        likers = []
        while(Math.random() > 0.3 && likers.length < userCount){
            var f = poster() + 1;
            if(!likers.includes(f)){
                song_likesCount += 1;
                likers.push(f);
                slString += x + ',' + f + '\n';
            }
        }
    //   }
      if (i === 0) {
        writer.write(slString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(slString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//SONG REPOST GENERATOR
let song_repostStream = fs.createWriteStream(__dirname + '/MongoData/songRepostersList.json')
function writeSongReposts(writer, encoding, callback) {
  let i = songsCount;
  var x = 0;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      var srString = '';
    //   if(Math.random() > 0.5){
        reposters = []
        while(Math.random() > 0.3 && reposters.length < userCount){
            var f = poster();
            if(!reposters.includes(f)){
                song_repostCount += 1;
                reposters.push(f);
                srString += x + ',' + f + '\n';
            }
        }
    // }
      if (i === 0) {
        writer.write(srString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(srString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//PLAYLIST LIKE GENERATOR
let playlist_likeStream = fs.createWriteStream(__dirname + '/MongoData/playlistLikersList.json')
function writePlaylistLikes(writer, encoding, callback) {
  let i = playlistsCount;
  var x = 0;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
    //   if(Math.random() > 0.5){
        likers = []
        while(Math.random() > 0.3 && likers.length < userCount){
            var f = poster();
            if(!likers.includes(f)){
                playlist_likesCount += 1;
                likers.push(f);
                plString += x + ',' + f + '\n';
            }
        }
    //   }
      var plString = '';
      if (i === 0) {
        writer.write(plString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(plString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

//PLAYLIST REPOST GENERATOR
let playlist_repostStream = fs.createWriteStream(__dirname + '/MongoData/playlistRepostersList.json')
function writePlaylistReposts(writer, encoding, callback) {
  let i = playlistsCount;
  var x = 0;
//   let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      prString = '';
    //   if(Math.random() > 0.5){
        reposters = []
        while(Math.random() > 0.3 && reposters.length < userCount){
            var f = poster();
            if(!reposters.includes(f)){
                playlist_repostsCount += 1;
                reposters.push(f);
                prString += x + ',' + f + '\n';
            }
        }
    //   }
      if (i === 0) {
        writer.write(prString, encoding, callback);
        // writer.end();
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(prString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}


writeUsers(usersStream, 'utf-8',
    writeSongs(songsStream, 'utf-8',
        writeAlbums(albumsStream, 'utf-8',
            writePlaylists(playlistStream, 'utf-8',
                writeFollowers(followerStream, 'utf-8',
                    writeAlbumSongs(album_songStream, 'utf-8',
                        writePlaylistSongs(playlist_songStream, 'utf-8',
                            writeSongLikes(song_likeStream, 'utf-8',
                                writeSongReposts(song_repostStream, 'utf-8',
                                    writePlaylistLikes(playlist_likeStream, 'utf-8',
                                        writePlaylistReposts(playlist_repostStream, 'utf-8')))))))))))


//COUNT LOGGER
console.log('\n users : ' + userCount + '\n songs : ' + songsCount + '\n albums : ' + albumsCount + '\n playlist : ' + playlistsCount + '\n fc : ' + followersCount + '\n as : ' + album_songsCount + '\n ps : ' + playlist_songsCount + '\n sl : ' + song_likesCount + '\n sr : ' + song_repostCount + '\n pl : ' + playlist_likesCount + '\n pr : ' + playlist_repostsCount)

TotalTime = new Date - start;
console.log(TotalTime);