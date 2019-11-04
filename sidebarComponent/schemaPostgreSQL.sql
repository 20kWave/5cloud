

CREATE TABLE users
(id SERIAL PRIMARY KEY,
user_id VARCHAR(25),
user_name VARCHAR(25),
location VARCHAR(25),
profile_pic VARCHAR(250)
);

CREATE TABLE songs
(id SERIAL PRIMARY KEY,
song_id VARCHAR(25),
song_name VARCHAR(25),
artist_name VARCHAR(25),
tag VARCHAR(25)
);

CREATE TABLE albums
(id SERIAL PRIMARY KEY,
album_id VARCHAR(25),
album_title VARCHAR(25),
album_art VARCHAR(25),
artist_name VARCHAR(25),
publish_date VARCHAR(25)
);

CREATE TABLE playlists
(id SERIAL PRIMARY KEY,
playlist_id VARCHAR(25),
playlist_name VARCHAR(25),
playlist_art VARCHAR(250),
user_name VARCHAR(25)
);

CREATE TABLE followers
(followed VARCHAR(25) PRIMARY KEY,
follower INTEGER,
FOREIGN KEY (follower) REFERENCES users(id));

CREATE TABLE album_songs
(album VARCHAR(25) PRIMARY KEY,
songs INTEGER,
FOREIGN KEY (song) REFERENCES songs(id));

CREATE TABLE playlist_songs
(playlist VARCHAR(25) PRIMARY KEY,
songs INTEGER,
FOREIGN KEY (song) REFERENCES songs(id));;

CREATE TABLE song_likes
(songs VARCHAR(25) PRIMARY KEY,
liker INTEGER,
FOREIGN KEY (liker) REFERENCES users(id));

CREATE TABLE song_reposts
(songs VARCHAR(25) PRIMARY KEY,
reposter INTEGER,
FOREIGN KEY (reposter) REFERENCES users(id));

CREATE TABLE playlist_likes
(playlists VARCHAR(25) PRIMARY KEY,
liker INTEGER,
FOREIGN KEY (liker) REFERENCES users(id));

CREATE TABLE playlist_reposts
(playlists VARCHAR(25) PRIMARY KEY,
reposter INTEGER,
FOREIGN KEY (reposter) REFERENCES users(id));