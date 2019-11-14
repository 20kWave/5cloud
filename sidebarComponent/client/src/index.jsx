import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import 'babel-polyfill';


const splits = document.URL.split('/');
const song_id = splits[splits.length - 2];


ReactDOM.render(
  <App currentSong={song_id} />,
  document.getElementById('sidebar')
);
