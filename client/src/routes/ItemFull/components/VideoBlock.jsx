import React from 'react';
import axios from 'axios';

import { Loader } from 'components/UI';

const API_KEY = 'acf4573044c691934aba5502699434db';

export default class VideoBlock extends React.Component {
  state = {
    game_trailers: [],
    currentVideo: 0,
  };

  componentDidMount() {
    const { gameTitle } = this.props;
    this.getGameTrailers(gameTitle);
  }

  getGameTrailers(title) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // var proxyUrl = ''
    this.setState({ loadingVideo: true });
    axios({ // get all ids
      url: `${proxyUrl}https://api-v3.igdb.com/games`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'user-key': API_KEY,
      },
      data: `fields name, videos; search "${title} ";`,
    })
      .then((response) => {
        if (response && response.data.length > 0 && response.data[0].videos) {
          return response.data; // all video ids
        }
        throw new Error('No data found');
      })
      .then((data) => { // get all videos by ids
        axios({
          url: `${proxyUrl}https://api-v3.igdb.com/game_videos`,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'user-key': API_KEY,
          },
          data: `fields *; where id = (${data[0].videos});`,
        })
          .then((response) => {
            this.setState({
              game_trailers: response.data,
              loadingVideo: false,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loadingVideo: false });
      });
  }

  render() {
    const { game_trailers, loadingVideo, currentVideo } = this.state;
    return (
      <div>
        {loadingVideo
          ? <Loader />
          : game_trailers && game_trailers.length > 0
            ? (
              <>
                <iframe width="100%" height="400px" title="trailer" src={`https://www.youtube.com/embed/${game_trailers[this.state.currentVideo].video_id}`} />
                {game_trailers.length > 1
                  ? game_trailers.map((trailer, i) => (
                    <button
                      key={trailer.id}
                      className={`btn btn-sm mr-2 ${currentVideo === i ? 'btn-warning' : 'btn-info'}`}
                      onClick={() => this.setState({ currentVideo: i })}
                    >
                      {i}
                    </button>
                  ))
                  : null}
              </>
            )
            : null}
      </div>
    );
  }
}
