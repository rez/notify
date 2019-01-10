import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './Player.module.css';
import play from './images/play.png';
import pause from './images/pause.png';
import forward from './images/fwd.png';
import back from './images/bck.png';
import axios from "axios";
import {UPDATE_TRACK_INFO, PAUSE, UNINIT, PREVIOUS, NEXT, PLAYING} from "../../../store/actions/types";
import {onProgress, pauseTrack, resumeTrack, nextTrack, previousTrack, playTrack, updateTrackInfo} from "../../../store/actions";

class Player extends Component {
    state = {
        timer : null,
        position : 0
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.startSpotifyPoll();

    }

    startSpotifyPoll = () => {
        if(this.props.auth.auth && !this.state.timer) {
            let timer = setInterval(this.pollSpotifyStatus, 1000);
            this.setState({timer});
        }
    };

    pollSpotifyStatus = async () =>{
        try {
            const result = await axios({
                method : 'get',
                url : 'https://api.spotify.com/v1/me/player',
                dataType : 'json',
                headers : {
                    'Authorization' : 'Bearer ' + this.props.auth.auth.data.spotifyAccessToken,
                    'Content-Type' : 'application/json'
                }
            });

            this.props.updateTrackInfo(result.data);

        }catch(e){
            console.log('eeeeee' + e);
        }
    };

    msToMins = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    calcProgressPercentage = () => {
        const p = this.props.player.progress ? this.props.player.progress : 100;
        const d = this.props.player.duration ? this.props.player.duration : 100;

        return (p / d) * 100;
    };

    render(){
        return (
                <div className={styles.Player}>
                    <div style={{width :  this.calcProgressPercentage() + "%"}}  className={styles.ProgressBar}>

                    </div>
                    <div className={styles.MetaData}>
                        <span className={styles.MetaImg}> {/*this is a not so great hack because initial response only returns album(not individual tracks) could do better to format initially*/}
                            {this.props.player.track ? <img src={this.props.player.track.album.images[0].url  } /> : null}
                        </span>
                        <div className={styles.MetaText}>
                            <span className={styles.MetaTitle}>{this.props.player.track ?  this.props.player.track.album.artists[0].name : null}</span>
                            <span className={styles.MetaArtist}>{this.props.player.track ? this.props.player.track.name  : null}</span>
                        </div>
                    </div>
                    <div className={styles.Controls}>
                        <div>
                            <span className={styles.ControlBCK} onClick={() => this.props.previousTrack()}><img src={back} /></span>
                            <span  className={styles.ControlPLY}>
                                {this.props.player.state === UNINIT ||  this.props.player.state == PAUSE ?
                                    <img onClick={() => { this.props.resumeTrack()}} src={play} /> :
                                    <img onClick={() => { this.props.pauseTrack()}} src={pause} />
                            }</span>
                            <span className={styles.ControlFWD} onClick={() => this.props.nextTrack()}><img src={forward} /></span>
                        </div>
                    </div>
                    <div className={styles.TrackVolandTime}>
                        { this.props.player.progress ?
                            <div className={` white-text ${styles.TimeWrap}`}>
                                <span
                                    className={`white-text ${styles.PlayerVolume}`}>{this.msToMins(this.props.player.progress)}</span> /
                                <span
                                    className={`white-text ${styles.TrackTime}`}>{this.msToMins(this.props.player.duration)}</span>
                            </div> :
                            null
                        }
                    </div>

                </div>
        );
    }
}

function mapStateToProps({auth, player}) {
    return { auth, player };
}
export default connect(mapStateToProps,{updateTrackInfo, onProgress, pauseTrack, resumeTrack, nextTrack, previousTrack, playTrack})(Player);