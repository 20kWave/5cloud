const fs = require ('fs');
var faker = require('faker');


var userCount = 100;
var songsCount = 1000;
var albumsCount = 100;
var playlistsCount = 1000;
var followersCount = ;
var album_songsCount = ;
var playlist_songsCount = ;
var song_likesCount = ;
var song_repostCount = ;
var playlist_likesCount = ;
var playlist_repostsCount = ;

// var userList = [];
// var x = 0;
// while(x < 100){
//     x += 1;
//     var user = {
//         user_name: (faker.name.findName()).slice(0,25),
//         location: faker.fake("{{address.state}} {{address.country}}").slice(0,25),
//         profile_pic: faker.image.avatar()
//     }
//     userList.push(user);
// }
// console.log(userList);
var uString = ""
for(var i = 0; i < userCount; i+=1){
    uString += (faker.name.findName()).slice(0,25) + ',' + faker.fake("{{address.state}} {{address.country}}").slice(0,25) + ',' + faker.image.avatar() + '\n';
}
console.log(uString)
fs.writeFile(__dirname + '/PostgresData/userList.csv', (uString), (err) => {
    if(err) throw err;
})

// var songList = [];
// var x = 0;
// while(x < 10){
//     x += 1;
//     var song = {
//         song_name: faker.lorem.words().slice(0,25),
//         artist_name: faker.name.findName().slice(0,25),
//         tag: "#" + (faker.hacker.adjective()).toUpperCase().slice(0,25)
//     }
//     songList.push(song);
// }
// console.log(songList);
var sString = ""
for(var i = 0; i < songsCount; i+=1){
    sString += faker.lorem.words().slice(0,25) + ',' + faker.name.findName().slice(0,25) + ',' + "#" + (faker.hacker.adjective()).toUpperCase().slice(0,24) + '\n';
}
// console.log(sString)
fs.writeFile(__dirname + '/PostgresData/songList.csv', (sString), (err) => {
    if(err) throw err;
})

var AlbumList = [];
var x = 0;
while(x < 10){
    x += 1;
    var album = {
        album_title: faker.company.bs().slice(0,25),
        album_art: faker.image.fashion(),
        artist_name: faker.name.findName().slice(0,25),
        publish_date: faker.date.between('1950-01-01', '2020-12-31').toDateString()
    }
    AlbumList.push(album);
}
// console.log(AlbumList);
var aString = ""
for(var i = 0; i < AlbumList.length; i+=1){
    aString += AlbumList[i]['album_title'] + ',' + AlbumList[i]['album_art'] + ',' + AlbumList[i]['artist_name'] + ',' + AlbumList[i]['publish_date'] + '\n';
}
// console.log(aString)
fs.writeFile(__dirname + '/PostgresData/AlbumList.csv', (aString), (err) => {
    if(err) throw err;
})

var playLists = [];
var x = 0;

var poster = () => {
    return Math.floor(userList.length * Math.random())
}

while(x < 10){
    x += 1;
    var playlist = {
        playlist_name: faker.company.bsNoun(),
        playlist_art: faker.image.abstract(),
        created_by: poster()
    }
    playLists.push(playlist);
}
// console.log(playLists);
var pString = ""
for(var i = 0; i < playLists.length; i+=1){
    pString += playLists[i]['playlist_name'] + ',' + playLists[i]['playlist_art'] + ',' + playLists[i]['created_by'] + '\n';
}
// console.log(pString);
fs.writeFile(__dirname + '/PostgresData/playLists.csv', (pString), (err) => {
    if(err) throw err;
})


var followersList = [];
var x = 0;

while(x < userList.length){
    x += 1;
    if(Math.random() > 0.5){
        followers = []
        while(Math.random() > 0.5 && followers.length < userList.length){
            var f = poster();
            if(!followers.includes(f) || f === x){
                followers.push(f);
            }
        }
        while(followers.length > 0){
            var follow = {
                followed: x,
                follower: followers.pop()
            }
            followersList.push(follow);
        }
    }
}
// console.log(followersList);
var fString = ""
for(var i = 0; i < followersList.length; i+=1){
    fString += followersList[i]['followed'] + ',' + followersList[i]['follower'] + '\n';
}
// console.log(fString);
fs.writeFile(__dirname + '/PostgresData/followersList.csv', (fString), (err) => {
    if(err) throw err;
})

var album_songs = [];
var x = 0;

while(x < AlbumList.length){
    x += 1;
    songs = []
    while(songs.length ==  0 || Math.random > 0.5 || songs.length < 12){
        var s = Math.floor(songList.length * Math.random()) + 1;
        if(!songs.includes(s)){
            songs.push(s);
            album_songs.push( {album_id: x, song_id: s});

        }
    }
}
// console.log(album_songs);
var asString = ""
for(var i = 0; i < album_songs.length; i+=1){
    asString += album_songs[i]['album_id'] + ',' + album_songs[i]['song_id'] + '\n';
}
// console.log(asString);
fs.writeFile(__dirname + '/PostgresData/album_songs.csv', (asString), (err) => {
    if(err) throw err;
})



var playlist_songs = [];
var x = -1;

while(x < playLists.length){
    x += 1;
    songs = []
    while(songs.length < 15 && Math.random() > 0.25 || songs.length < 1){
        var s = Math.floor(songList.length * Math.random()) + 1;
        if(!songs.includes(s)){
            songs.push(s);
            playlist_songs.push( {playlist_id: x, song_id: s});

        }
    }
}
// console.log(playlist_songs);
var psString = ""
for(var i = 0; i < playlist_songs.length; i+=1){
    psString += playlist_songs[i]['playlist_id'] + ',' + playlist_songs[i]['song_id'] + '\n';
}
// console.log(psString);
fs.writeFile(__dirname + '/PostgresData/playlist_songs.csv', (psString), (err) => {
    if(err) throw err;
})

var songLikersList = [];
var x = 0;

while(x < songList.length){
    x += 1;
    if(Math.random() > 0.5){
        likers = []
        while(Math.random() > 0.3 && likers.length < userList.length){
            var f = poster() + 1;
            if(!likers.includes(f)){
                likers.push(f);
            }
        }
        while(likers.length > 0){
            var like = {
                liked: x,
                liker: likers.pop()
            }
            songLikersList.push(like);
        }
    }
}
// console.log(songLikersList);
var slString = ""
for(var i = 0; i < songLikersList.length; i+=1){
    slString += songLikersList[i]['liked'] + ',' + songLikersList[i]['liker'] + '\n';
}
// console.log(slString);
fs.writeFile(__dirname + '/PostgresData/songLikersList.csv', (slString), (err) => {
    if(err) throw err;
})

var songRepostersList = [];
var x = 0;

while(x < songList.length){
    x += 1;
    if(Math.random() > 0.5){
        reposters = []
        while(Math.random() > 0.3 && reposters.length < userList.length){
            var f = poster();
            if(!reposters.includes(f)){
                reposters.push(f);
            }
        }
        while(reposters.length > 0){
            var repost = {
                reposted: x,
                reposter: reposters.pop()
            }
            songRepostersList.push(repost);
        }
    }
}
// console.log(songRepostersList);
var srString = ""
for(var i = 0; i < songRepostersList.length; i+=1){
    srString += songRepostersList[i]['reposted'] + ',' + songRepostersList[i]['reposter'] + '\n';
}
// console.log(srString);
fs.writeFile(__dirname + '/PostgresData/songRepostersList.csv', (srString), (err) => {
    if(err) throw err;
})

var playlistLikersList = [];
var x = 0;


while(x < playLists.length){
    x += 1;
    if(Math.random() > 0.5){
        likers = []
        while(Math.random() > 0.3 && likers.length < userList.length){
            var f = poster();
            if(!likers.includes(f)){
                likers.push(f);
            }
        }
        while(likers.length > 0){
            var like = {
                liked: x,
                liker: likers.pop()
            }
            playlistLikersList.push(like);
        }
    }
}
// console.log(playlistLikersList);
var plString = ""
for(var i = 0; i < playlistLikersList.length; i+=1){
    plString += playlistLikersList[i]['liked'] + ',' + playlistLikersList[i]['liker'] + '\n';
}
// console.log(plString)
fs.writeFile(__dirname + '/PostgresData/playlistLikersList.csv', (plString), (err) => {
    if(err) throw err;
})


var playlistRepostersList = [];
var x = 0;


while(x < playLists.length){
    x += 1;
    if(Math.random() > 0.5){
        reposters = []
        while(Math.random() > 0.3 && reposters.length < userList.length){
            var f = poster();
            if(!reposters.includes(f)){
                reposters.push(f);
            }
        }
        while(reposters.length > 0){
            var repost = {
                reposted: x,
                reposter: reposters.pop()
            }
            playlistRepostersList.push(repost);
        }
    }
}
// console.log(playlistRepostersList);
var prString = ""
for(var i = 0; i < playlistRepostersList.length; i+=1){
    prString += playlistRepostersList[i]['reposted'] + ',' + playlistRepostersList[i]['reposter'] + '\n';
}
// console.log(prString)
fs.writeFile(__dirname + '/PostgresData/playlistRepostersList.csv', (prString), (err) => {
    if(err) throw err;
})


/*
1) users (1M)
2) songs (10M)
3) albums (1M)
4) playlists(1M) - depend on users
5) followers - depend on users
    - random amount of followers
    - some don't have followers
6) album - song
    - for (var i = 1; i < albums; i +=1){
        album[i] = songs[j](random amount)
    }
7) playlist
8) song likes
9) etc
*/