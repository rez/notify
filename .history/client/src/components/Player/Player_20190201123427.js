import React from 'react';
import styles from './Player.module.css';
import PropTypes from 'prop-types';
import back from "./images/bck.png";
import {PAUSE, UNINIT} from "../../store/actions/ActionTypes";
import play from "./images/play.png";
import pause from "./images/pause.png";
import forward from "./images/fwd.png";
import {msToMins} from "./PlayerUtils";

const propTypes = {
    requestPlayerState: PropTypes.func.isRequired,
    onProgress: PropTypes.func.isRequired,
    pauseTrack: PropTypes.func.isRequired,
    resumeTrack: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
    previousTrack: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    calcProgressPercentage : PropTypes.func.isRequired,
    player : PropTypes.shape({}).isRequired

};

const Player = ({
        requestPlayerState,
        onProgress,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        playTrack,
        player
                }) => {
    const calcProgressPercentage = () => {
        const p = progress ? progress : 100;
        const d = duration ? duration : 100;

        return (p / d) * 100;
    }
    const { progress, track, duration, state } = player;
    return (
        <div className={`gloabl__player ${styles.Player}`}>
            <div style={{width :  calcProgressPercentage() + "%"}}  className={styles.ProgressBar}>

            </div>
            <div className={styles.MetaData}>
                        <span className={styles.MetaImg}> {/*this is a not so great hack because initial response only returns album(not individual tracks) could do better to format initially*/}
                            {track ? <img src={track.album.images[0].url  } /> : null}
                        </span>
                <div className={styles.MetaText}>
                    <span className={styles.MetaTitle}>{track ?  track.album.artists[0].name : null}</span>
                    <span className={styles.MetaArtist}>{track ? track.name  : null}</span>
                </div>
            </div>
            <div className={styles.Controls}>
                <div>
                    <span className={styles.ControlBCK} onClick={() => previousTrack()}><img src={back} /></span>
                    <span  className={styles.ControlPLY}>
                                {state === UNINIT ||  state == PAUSE ?
                                    <img onClick={() => { resumeTrack()}} src={play} /> :
                                    <img onClick={() => { pauseTrack()}} src={pause} />
                                }</span>
                    <span className={styles.ControlFWD} onClick={() => nextTrack()}><img src={forward} /></span>
                </div>
            </div>
            <div className={styles.TrackVolandTime}>
                { progress ?
                    <div className={` white-text ${styles.TimeWrap}`}>
                                <span
                                    className={`white-text ${styles.PlayerVolume}`}>{msToMins(progress)}</span> /
                        <span
                            className={`white-text ${styles.TrackTime}`}>{msToMins(duration)}</span>
                    </div> :
                    null
                }
            </div>

        </div>
    )

};

Player.propTypes = propTypes;

export default Player;