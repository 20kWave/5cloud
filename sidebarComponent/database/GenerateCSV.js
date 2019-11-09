const fs = require('fs');
const faker = require('faker');

// COUNTS
const userCount = 100;
const songsCount = 100000000;
const albumsCount = 10;
const playlistsCount = 10;
let followersCount = 0;
let album_songsCount = 0;
let playlist_songsCount = 0;
let song_likesCount = 0;
let song_repostCount = 0;
let playlist_likesCount = 0;
let playlist_repostsCount = 0;
// TESTS
let TotalTime;
const start = new Date();


// USER GENERATOR
const usersStream = fs.createWriteStream(`${__dirname}/PostgresData/userList.csv`);
function writeUsers(writer, encoding, callback) {
  let i = userCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      const uString = `${(faker.name.findName()).slice(0, 25)},${faker.fake('{{address.state}} {{address.country}}').slice(0, 25)},${faker.image.avatar()}\n`;
      if (i === 0) {
        writer.write(uString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Users ${(x / userCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(uString, encoding);
        const newPercent = (x / userCount * 100).toFixed(0);
        if (newPercent !== oldPercent) {
          var oldPercent = ((x / userCount * 100).toFixed(0));
          TotalTime = new Date() - start;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Users ${(x / userCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)} `);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// SONG GENERATOR
const songsStream = fs.createWriteStream(`${__dirname}/PostgresData/songList.csv`);
function writeSongs(writer, encoding, callback) {
  const oldPercent = ((x / songsCount * 100).toFixed(0));
  let i = songsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      const sString = `${faker.lorem.words().slice(0, 25)},${faker.name.findName().slice(0, 25)},` + `#${(faker.hacker.adjective()).toUpperCase().slice(0, 24)}\n`;
      if (i === 0) {
        writer.write(sString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Songs ${(x / songsCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(sString, encoding);
        const newPercent = (x / songsCount * 100).toFixed(0);
        if (newPercent !== oldPercent) {
          TotalTime = new Date() - start;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Songs ${(x / songsCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)} `);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// ALBUM GENERATOR
const albumsStream = fs.createWriteStream(`${__dirname}/PostgresData/album_songs.csv`);
function writeAlbums(writer, encoding, callback) {
  const oldPercent = ((x / albumsCount * 100).toFixed(0));
  let i = albumsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      const aString = `${faker.company.bs().slice(0, 25)},${faker.image.fashion()},${faker.name.findName().slice(0, 25)},${faker.date.between('1950-01-01', '2020-12-31').toDateString()}\n`;
      if (i === 0) {
        writer.write(aString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Albums ${(x / albumsCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(aString, encoding);
        const newPercent = (x / albumsCount * 100).toFixed(0);
        if (newPercent !== oldPercent) {
          TotalTime = new Date() - start;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Albums ${((x / albumsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)} `);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// PLAYLIST GENERATOR
const poster = () => Math.floor(userCount * Math.random());
const playlistStream = fs.createWriteStream(`${__dirname}/PostgresData/playLists.csv`);
function writePlaylists(writer, encoding, callback) {
  let i = playlistsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      const pString = `${faker.company.bsNoun()},${faker.image.abstract()},${poster()}\n`;
      if (i === 0) {
        writer.write(pString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Playlists ${((x / playlistsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(pString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// FOLLOWER GENERATOR
const followerStream = fs.createWriteStream(`${__dirname}/PostgresData/followersList.csv`);
function writeFollowers(writer, encoding, callback) {
  let followers;
  let i = userCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      followers = [];
      let fString = '';
      while (Math.random() > 0.8 && followers.length < userCount) {
        const f = poster();
        if (!followers.includes(f) || f === i) {
          followersCount += 1;
          followers.push(f);
          fString += `${x},${f}\n`;
        }
      }
      if (i === 0) {
        writer.write(fString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Followers ${((x / userCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(fString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// SONGS IN ALBUM GENERATOR
const album_songStream = fs.createWriteStream(`${__dirname}/PostgresData/album_songs.csv`);
function writeAlbumSongs(writer, encoding, callback) {
  let songs;
  let i = albumsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      songs = [];
      let asString = '';
      while (songs.length === 0 || Math.random > 0.5 || songs.length < 12) {
        const s = Math.floor(songsCount * Math.random()) + 1;
        if (!songs.includes(s)) {
          album_songsCount += 1;
          songs.push(s);
          asString += `${x},${s}\n`;
        }
      }
      if (i === 0) {
        writer.write(asString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Album songs ${((x / albumsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(asString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// SONGS IN PLAYLIST GENERATOR
const playlist_songStream = fs.createWriteStream(`${__dirname}/PostgresData/playlist_songs.csv`);
function writePlaylistSongs(writer, encoding, callback) {
  let songs;
  let i = playlistsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      let psString = '';
      songs = [];
      while ((songs.length < 15 && Math.random() > 0.25) || songs.length < 1) {
        const s = Math.floor(songsCount * Math.random()) + 1;
        if (!songs.includes(s)) {
          playlist_songsCount += 1;
          songs.push(s);
          psString += `${x},${s}\n`;
        }
      }
      if (i === 0) {
        writer.write(psString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Playlist songs ${((x / playlistsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(psString, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}


// SONG LIKE GENERATOR
const song_likeStream = fs.createWriteStream(`${__dirname}/PostgresData/songLikersList.csv`);
function writeSongLikes(writer, encoding, callback) {
  let x = 0;
  const oldPercent = ((x / playlistsCount) * 100).toFixed(0);
  let likers;
  let i = songsCount;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      let slString = '';
      likers = [];
      while (Math.random() > 0.3 && likers.length < userCount) {
        const f = poster() + 1;
        if (!likers.includes(f)) {
          song_likesCount += 1;
          likers.push(f);
          slString += `${x},${f}\n`;
        }
      }
      if (i === 0) {
        writer.write(slString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Songs ${((x / songsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(slString, encoding);
        const newPercent = (x / playlistsCount * 100).toFixed(0);
        if (newPercent !== oldPercent) {
          TotalTime = new Date() - start;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Songs ${((x / songsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)} `);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// SONG REPOST GENERATOR
const song_repostStream = fs.createWriteStream(`${__dirname}/PostgresData/songRepostersList.csv`);
function writeSongReposts(writer, encoding, callback) {
  const oldPercent = ((x / songsCount) * 100).toFixed(0));
  let reposters;
  let i = songsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      let srString = '';
      reposters = [];
      while (Math.random() > 0.3 && reposters.length < userCount) {
        const f = poster();
        if (!reposters.includes(f)) {
          song_repostCount += 1;
          reposters.push(f);
          srString += `${x},${f}\n`;
        }
      }
      if (i === 0) {
        writer.write(srString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Songs reposts ${((x / songsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(srString, encoding);
        const newPercent = (x / songsCount * 100).toFixed(0);
        if (newPercent !== oldPercent) {
          TotalTime = new Date() - start;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Songs ${(x / songsCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)} `);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// PLAYLIST LIKE GENERATOR
const playlist_likeStream = fs.createWriteStream(`${__dirname}/PostgresData/playlistLikersList.csv`);
function writePlaylistLikes(writer, encoding, callback) {
  let i = playlistsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      likers = [];
      while (Math.random() > 0.3 && likers.length < userCount) {
        const f = poster();
        if (!likers.includes(f)) {
          playlist_likesCount += 1;
          likers.push(f);
          plString += `${x},${f}\n`;
        }
      }
      var plString = '';
      if (i === 0) {
        writer.write(plString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Playlists likes ${(x / playlistsCount * 100).toFixed(0)}%` + ` generateed and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(plString, encoding);
        const newPercent = (x / playlistsCount * 100).toFixed(0);
        if (newPercent !== oldPercent) {
          var oldPercent = ((x / playlistsCount * 100).toFixed(0));
          TotalTime = new Date() - start;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Playlist likes ${(x / playlistsCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)} `);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// PLAYLIST REPOST GENERATOR
const playlist_repostStream = fs.createWriteStream(`${__dirname}/PostgresData/playlistRepostersList.csv`);
function writePlaylistReposts(writer, encoding, callback) {
  let i = playlistsCount;
  let x = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      x += 1;
      prString = '';
      reposters = [];
      while (Math.random() > 0.3 && reposters.length < userCount) {
        const f = poster();
        if (!reposters.includes(f)) {
          playlist_repostsCount += 1;
          reposters.push(f);
          prString += `${x},${f}\n`;
        }
      }
      if (i === 0) {
        writer.write(prString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Playlists reposts ${(x / playlistsCount * 100).toFixed(0)}%` + ` generateed and took ${msToTime(TotalTime)}\n `);
      } else {
        ok = writer.write(prString, encoding);
        const newPercent = (x / playlistsCount * 100).toFixed(0);
        if (newPercent !== oldPercent) {
          var oldPercent = ((x / playlistsCount * 100).toFixed(0));
          TotalTime = new Date() - start;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Playlist reposts ${(x / playlistsCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)} `);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
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
                    writePlaylistReposts(playlist_repostStream, 'utf-8')))))))))));


// COUNT LOGGER
// console.log('\n users : ' + userCount + '\n songs : ' + songsCount + '\n albums : ' + albumsCount + '\n playlist : ' + playlistsCount + '\n fc : ' + followersCount + '\n as : ' + album_songsCount + '\n ps : ' + playlist_songsCount + '\n sl : ' + song_likesCount + '\n sr : ' + song_repostCount + '\n pl : ' + playlist_likesCount + '\n pr : ' + playlist_repostsCount)

// TotalTime = new Date - start;
// console.log(TotalTime);

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
