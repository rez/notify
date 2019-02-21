import React, {Component} from 'react';
import {connect} from 'react-redux';
import Player from '../../../components/Player/Player';
import axios from "axios";

import {requestPlayerState,
        onProgress,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        playTrack
        } from "../../../store/actions";

export class PlayerContainer extends Component {
    state = {
        timer : null,
        position : 0
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.startSpotifyPoll();
    }

    startSpotifyPoll = () => {
        if(this.props.auth.auth && !this.state.timer) {
            let timer = setInterval(() => {this.props.requestPlayerState(this.props.auth.auth.spotifyAccessToken)}, 1000);
            this.setState({timer});
        }
    };

    render(){
        return (
               <Player {...this.props}/>
        );
    }
}

function mapStateToProps({auth, player}) {
    return { auth, player };
}
export default connect(mapStateToProps,{requestPlayerState, onProgress, pauseTrack, resumeTrack, nextTrack, previousTrack, playTrack})(PlayerContainer);