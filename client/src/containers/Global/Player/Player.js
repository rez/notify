import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Player.module.css';
import play from './images/play.png';
import pause from './images/pause.png';
import forward from './images/fwd.png';
import back from './images/bck.png';
import axios from "axios";
import {PLAY, RESUME, PAUSE, UNINIT, UPDATE_TIMER, PREVIOUS, NEXT} from "../../../actions/types";

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
    }
    onChangeTrackHandler = (action) => {
        switch(action) {
            case NEXT:
                this.nextTrack();
                break;
            case PREVIOUS:
                this.previousTrack();
                break;

            default :
                return;
        }
    }
    onPlayHandler = (action) => {
        switch (action) {
            case PLAY :
                this.resumeTrack();
                break;
            case PAUSE :
                this.pauseTrack();
                break;
            default :
                return;
        }
    }

    nextTrack = async () => {
        const devices = this.props.player.devices;
        const device = devices.find((device) => {
            return device.is_active;
        })

        if(!device) return;

        const res = await axios.post('/api/next', {track : this.props.player.playing.uri,
            device : device.id});

        if(res.error){
            console.log(res.error);
            return
        }

        this.props.onResume();
    }
    previousTrack = async () => {
        const devices = this.props.player.devices;
        const device = devices.find((device) => {
            return device.is_active;
        })

        if(!device) return;

        const res = await axios.post('/api/previous', {track : this.props.player.playing.uri,
            device : device.id});

        if(res.error){
            console.log(res.error);
            return
        }

        this.props.onResume();
    }
    resumeTrack = async () => {
        const devices = this.props.player.devices;
        const device = devices.find((device) => {
            return device.is_active;
        })

        if(!device) return;

        const res = await axios.post('/api/resume', {track : this.props.player.playing.uri,
            device : device.id, position : this.props.player.progress});

        if(res.error){
            console.log(res.error);
            return
        }

        this.props.onResume();



    }
    pauseTrack = async () => {
        const devices = this.props.player.devices;
        const device = devices.find((device) => {
            return device.is_active;
        })

        if(!device) return;

        const res = await axios.post('/api/pause', {track : this.props.player.playing.uri,
            device : device.id});

        if(res.error){
            console.log(res.error);
            return
        }
        this.props.onPause();
    }

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

            this.updatePlayerInfo(result.data);

        }catch(e){
            console.log('eeeeee' + e);
        }
    }

    updatePlayerInfo = (info) => {
        const id = info.item.album.uri;

        if(!this.props.player.playing|| this.props.player.playing.uri !== id){
            this.props.onPlay(info.item.album);
        }

        if(!info.is_playing){
            this.props.onPause();
        }
       // const device = info.device.id;
        const is_playing = info.is_playing;
        const progress = info.progress_ms;
        const duration_ms = info.item.duration_ms;

        this.props.onProgress(progress, duration_ms);


    }
    msToMins = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    calcProgressPercentage = () => {
        const p = this.props.player.progress ? this.props.player.progress : 100;
        const d = this.props.player.duration ? this.props.player.duration : 100;

        return (p / d) * 100;
    }
    render(){
        return (
                <div className={styles.Player}>
                    <div style={{width :  this.calcProgressPercentage() + "%"}}  className={styles.ProgressBar}>

                    </div>
                    <div className={styles.MetaData}>
                        <span className={styles.MetaImg}>
                            {this.props.player.playing ? <img src={this.props.player.playing.images[0].url} /> : null}
                        </span>
                        <div className={styles.MetaText}>
                            <span className={styles.MetaTitle}>{this.props.player.playing ?this.props.player.playing.artists[0].name  : null}</span>
                            <span className={styles.MetaArtist}>{this.props.player.playing ?this.props.player.playing.name  : null}</span>
                        </div>
                    </div>
                    <div className={styles.Controls}>
                        <div>
                            <span className={styles.ControlBCK} onClick={() => this.onChangeTrackHandler(PREVIOUS)}><img src={back} /></span>
                            <span  className={styles.ControlPLY}>
                                {this.props.player.state === UNINIT ||  this.props.player.state == PAUSE ?
                                    <img onClick={() => { this.onPlayHandler(PLAY)}} src={play} /> :
                                    <img onClick={() => { this.onPlayHandler(PAUSE)}} src={pause} />
                            }</span>
                            <span className={styles.ControlFWD} onClick={() => this.onChangeTrackHandler(NEXT)}><img src={forward} /></span>
                        </div>
                    </div>
                    <div className={styles.TrackVolandTime}>
                        <div className={` white-text ${styles.TimeWrap}`}>
                            <span className={`white-text ${styles.PlayerVolume}`}>{this.msToMins(this.props.player.progress)}</span> /
                            <span className={`white-text ${styles.TrackTime}`}>{this.msToMins(this.props.player.duration)}</span>
                        </div>
                    </div>

                </div>
        );
    }
}

function mapStateToProps({auth, player}) {
    return { auth, player };
}

const mapDispatchToProps = dispatch => {
    return{
        onPlay : (track) => dispatch({type : PLAY , track : track}),
        onResume : () => dispatch({type : RESUME }),
        onPause : () => dispatch({type : PAUSE }),
        onProgress : (progress, duration) => dispatch({type : UPDATE_TIMER, duration : duration, progress : progress})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Player);