const fs = require('fs');
const faker = require('faker');

// COUNTS
const userCount = 10000;
const songsCount = 10000000;
const albumsCount = 1000000;
const playlistsCount = 10;
const followersCount = 0;
let album_songsCount = 0;
const playlist_songsCount = 0;
const song_likesCount = 0;
const song_repostCount = 0;
const playlist_likesCount = 0;
const playlist_repostsCount = 0;
// TESTS
let TotalTime;
const start = new Date();

// // ALBUM GENERATOR
// const albumsStream = fs.createWriteStream(`${__dirname}/PostgresData/AlbumList.csv`);
// function writeAlbums(writer, encoding, callback) {
//   let idA = 0;
//   const oldPercent = ((idA / albumsCount * 100).toFixed(0));
//   let i = albumsCount;
//   function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       idA += 1;
//       const aString = `${faker.company.bs().slice(0, 25)},${faker.image.fashion()},${faker.name.findName().slice(0, 25)},${faker.date.between('1950-01-01', '2020-12-31').toDateString()}\n`;
//       if (i === 0) {
//         writer.write(aString, encoding, callback);
//         TotalTime = new Date() - start;
//         process.stdout.clearLine();
//         process.stdout.cursorTo(0);
//         process.stdout.write(`Albums ${(idA / albumsCount * 100).toFixed(0)}%` + ` generated and took ${msToTime(TotalTime)}\n `);
//       } else {
//         ok = writer.write(aString, encoding);
//         const newPercent = (idA / albumsCount * 100).toFixed(0);
//         if (newPercent !== oldPercent) {
//           TotalTime = new Date() - start;
//           process.stdout.clearLine();
//           process.stdout.cursorTo(0);
//           process.stdout.write(`Albums ${((idA / albumsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)} `);
//         }
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       writer.once('drain', write);
//     }
//   }
//   write();
// }


// SONGS IN ALBUM GENERATOR
const album_songStream = fs.createWriteStream(`${__dirname}/PostgresData/album_songs.csv`);
function writeAlbumSongs(writer, encoding, callback) {
  let i = songsCount;
  let idAS = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      idAS += 1;
      let asString = '';
      const a = Math.floor(albumsCount * Math.random()) + 1;
      asString += `${a},${idAS}\n`;
      if (i === 0) {
        writer.write(asString, encoding, callback);
        TotalTime = new Date() - start;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Album songs ${((idAS / albumsCount) * 100).toFixed(0)}% generated and took ${msToTime(TotalTime)}\n `);
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

// writeAlbums(albumsStream, 'utf-8',
writeAlbumSongs(album_songStream, 'utf-8', null);
// );
