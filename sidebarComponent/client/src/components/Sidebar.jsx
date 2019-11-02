import React from 'react';
import InteractionContainer from './InteractionContainer.jsx';
import ItemsContainer from './ItemsContainer.jsx';
import axios from 'axios';
import style from './Sidebar.css';
import 'babel-polyfill';

var next = (this.props.currentSong) =>{
  axios
  .get(`/currentSong/songs/${this.state.currentSongId}`)
  .then(song => {
    this.setState({ currentSong: song.data[0] });
    console.log(song);
  });
}


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSongId: this.props.currentSong,
      currentSong: {},
      relatedTracks: [],
      playlistsInclud: [],
      albumsInclud: [],
      userLikes: [],
      userReposts: []
    };
  }

  componentDidMount() {
    axios
      .get(`/currentSong/songs/${this.state.currentSongId}`)
      .then(song => {
        this.setState({ currentSong: song.data[0] });
      });
    axios
      .get(`/relatedtracks/songs/${this.state.currentSongId}`)
      .then(songs => {
        this.setState({ relatedTracks: songs.data });
      })
      .catch(err => {
        console.log(err, 'this is the error from axios req');
      });

    axios
      .get(`/userlike/songs/${this.state.currentSongId}`)
      .then(users => {
        this.setState({ userLikes: users.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`/userrepost/songs/${this.state.currentSongId}`)
      .then(users => {
        this.setState({ userReposts: users.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`/playlistincluded/songs/${this.state.currentSongId}`)
      .then(playlists => {
        this.setState({ playlistsInclud: playlists.data });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`/albumincluded/songs/${this.state.currentSongId}`)
      .then(albums => {
        this.setState({ albumsInclud: albums.data });
      })
      .catch(err => {
        console.log(err);
      });
    //api requests to fill the app's state components
  }

  render() {
    return (
      <div className={style.container}>
        <button onClick={next}></button>
        <ItemsContainer
          id="related-tracks"
          type="relatedTracks"
          tracks={this.state.relatedTracks}
        />
        <ItemsContainer
          id="inclusive-playlists"
          type="playlists"
          playlists={this.state.playlistsInclud}
        />
        <ItemsContainer
          id="inclusive-albums"
          type="albums"
          albums={this.state.albumsInclud}
        />

        <InteractionContainer
          id="user-likes"
          type="likes"
          users={this.state.userLikes}
          song={this.state.currentSong}
          className="interaction-container"
        />
        <InteractionContainer
          id="user-reposts"
          type="reposts"
          users={this.state.userReposts}
          song={this.state.currentSong}
          className="interaction-container"
        />
      </div>
    );
  }
}

export default Sidebar;

ReactDOM.render(
  <Sidebar currentSong="1" />,
  document.getElementById('sidebar')
);
