import React from 'react'
import igdb from 'igdb-api-node'
import axios from 'axios';
import Loader from '../../common/Loader'

const API_KEY = 'acf4573044c691934aba5502699434db'

export default class VideoBlock extends React.Component {
    constructor() {
        super()
        this.state = {
            game_trailers: [],
            currentVideo: 0
        }
    }
    getGameTrailers(title) {
        console.log('getGameTrailers')
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        // var proxyUrl = ''
        this.setState({ loadingVideo: true })
        axios({ //get all ids
            url: proxyUrl + "https://api-v3.igdb.com/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': API_KEY
            },
            data: `fields name, videos; search "${title} ";`
        })
            .then(response => {
                if (response && response.data.length > 0 && response.data[0].videos) {
                    return response.data //all video ids
                } else throw new Error('No data found')
            })
            .then(data => { // get all videos by ids
                axios({
                    url: proxyUrl + "https://api-v3.igdb.com/game_videos",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'user-key': API_KEY
                    },
                    data: `fields *; where id = (${data[0].videos});`
                })
                    .then(response => { 
                        this.setState({
                            game_trailers: response.data,
                            loadingVideo: false
                        })
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
                this.setState({ loadingVideo: false })
            });
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.gameTitle !== this.props.gameTitle) {
    //         console.log(prevProps.gameTitle, '|', this.props.gameTitle)
    //         this.getGameTrailers(this.props.gameTitle)
    //     }
    // }

    componentDidMount() {
        this.getGameTrailers(this.props.gameTitle)
    }

    render() {
        const { game_trailers } = this.state
        return (
            <div>
                {this.state.loadingVideo ?
                    <React.Fragment>
                        Loading video...
                        <Loader />
                    </React.Fragment>
                    :
                    game_trailers && game_trailers.length > 0 ?
                        <React.Fragment>
                            <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${game_trailers[this.state.currentVideo].video_id}`}></iframe>
                            {game_trailers.length > 1 ?
                                game_trailers.map((trailer, i) => (
                                    <button
                                        key={trailer.id}
                                        className={`btn btn-sm mr-2 ${this.state.currentVideo === i ? 'btn-warning' : 'btn-info'}`}
                                        onClick={() => this.setState({ currentVideo: i })}>{i}</button>
                                    // <iframe key={trailer.id} width="100%" height="400px" src={`https://www.youtube.com/embed/${trailer.video_id}`}></iframe>
                                ))
                                : null}
                        </React.Fragment>
                        : null
                }
            </div>
        )
    }
}