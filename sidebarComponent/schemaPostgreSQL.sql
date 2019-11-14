CREATE TABLE users
(id SERIAL PRIMARY KEY,
user_name VARCHAR(25),
location VARCHAR(25),
profile_pic VARCHAR(250));

CREATE TABLE songs
(id SERIAL PRIMARY KEY,
song_name VARCHAR(25),
artist_name VARCHAR(25),
tag VARCHAR(25));

CREATE TABLE albums
(id SERIAL PRIMARY KEY,
album_title VARCHAR(25),
album_art VARCHAR(250),
artist_name VARCHAR(25),
publish_date VARCHAR(25)
);

CREATE TABLE playlists
(id SERIAL PRIMARY KEY,
playlist_name VARCHAR(25),
playlist_art VARCHAR(250),
created_by INTEGER
    REFERENCES users(id));

CREATE TABLE followers
(followed INTEGER,
follower INTEGER,
FOREIGN KEY (follower) REFERENCES users(id),
UNIQUE (followed, follower));

CREATE TABLE album_songs
(album_id INTEGER,
song_id INTEGER
    REFERENCES songs(id),
    UNIQUE (album_id, song_id));

CREATE TABLE playlist_songs
(playlist_id INTEGER,
song_id INTEGER,
FOREIGN KEY (song_id) REFERENCES songs(id),
UNIQUE (playlist_id, song_id));

CREATE TABLE song_likes
(song_id INTEGER,
liker INTEGER,
FOREIGN KEY (liker) REFERENCES users(id),
UNIQUE (song_id, liker));

CREATE TABLE song_reposts
(songs INTEGER,
reposter INTEGER,
UNIQUE (songs, reposter));

CREATE TABLE playlist_likes
(playlists INTEGER,
liker INTEGER,
UNIQUE (playlists, liker));

CREATE TABLE playlist_reposts
(playlists INTEGER,
reposter INTEGER,
UNIQUE (playlists, reposter));