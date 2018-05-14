import React, { Component } from 'react';
import Songs from './Songs';
import axios from 'axios';

export default class Playlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: {}
    }
    this.queryPlaylist = this.queryPlaylist.bind(this);
  }

  componentDidMount() {
    this.queryPlaylist(this.props.match.params.playlistId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.playlistId !== nextProps.match.params.playlistId) {
      this.queryPlaylist(nextProps.match.params.playlistId);
    }
  }

  queryPlaylist(id) {
    axios.get(`/api/playlists/${id}`)
    .then(data => data.data)
    .then(playlist => {
      this.setState({ playlist })
    })
  }

  render() {
    let playlist = this.state.playlist
    return (
      <div>
        <h3>{ playlist.name }</h3>
          <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
            { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
          <hr />
      </div>
    )
  }
}
