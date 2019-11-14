import React from 'react';
import style from './Album.css';

const Album = (props) => (
    <div className={style.container}>
      <img src={props.album.album_art} className={style.art} />
      <div className={style.info}>
        <div className={style.username}>{props.artist_name}</div>
        <div className={style.title}>{props.album.album_title}</div>
        <div className={style.year}>Album {props.album.publish_date}</div>
      </div>
    </div>
);

export default Album;
