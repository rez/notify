import axios from "axios";
import {
    FETCH_DEVICES,
    RESUME,
    PAUSE,
    NEXT,
    PREVIOUS,
    PLAY,
    UPDATE_TIMER,
    PLAYING,
    UPDATE_TRACK_INFO,
    GET_USER_FOLLOWS
} from "./ActionTypes";
import {getActiveDevice} from "../../selectors/PlayerSelectors";

//since were using a polling service to keep state aligned with spotify only update
//our playing status with an interface to it otherwise state will likely get janky
//technically we could just update through the  client but possibly want to collect data?
export const requestPlayerState = (accessToken) => async (dispatch, getState) => {

    let track = null;
    try{
        track = await axios({
            method : 'get',
            url : 'https://api.spotify.com/v1/me/player',
            dataType : 'json',
            headers : {
                'Authorization' : 'Bearer ' + accessToken,
                'Content-Type' : 'application/json'
            }
        });

        track = track.data;

        if(track.data === ""){
            console.log("ERRROR");
            return;
        }

        const state = getState();
        const activeDevice = getActiveDevice(state);
        const trackState = track.is_playing ? PLAYING : PAUSE;

        dispatch({ type : UPDATE_TRACK_INFO ,
            payload : {
                id: track.item.uri,
                track: track.item,
                state: trackState,
                duration: track.item.duration_ms,
                progress: track.progress_ms,
                active_device: track.device.id
            }
        });
    }catch(e){
        console.log(e.response.status);
        if(e.response.status === 401){
            //re auth
        }
        return;

    }
};

export const fetchDevices = () => async dispatch => {
    const res = await axios.get('/api/devices');
    let activeDevice = null;

    if(res.data.devices){
        activeDevice = res.data.devices.find((device) => {
            return device;
        });
    }
    dispatch({type : FETCH_DEVICES, devices:res.data.devices, active_device : activeDevice});
};

export const nextTrack = () => async dispatch => {
    const res = await axios.post('/api/next', {});
    dispatch({type : NEXT});
};

export const pauseTrack = (external = false) => async dispatch => {
    if(!external){
        const res = await axios.post('/api/pause', {});
    }
    dispatch({type : PAUSE});
};

export const resumeTrack = (external = false) => async dispatch => {
    if(!external){
        const res = await axios.post('/api/resume', {});
    }
    dispatch({type : RESUME});
};

export const previousTrack = () => async dispatch => {
    const res = await axios.post('/api/previous', {});
    dispatch({type : PREVIOUS});
};

export const playTrack = (track, external = false, isPlaying = false,device) => async dispatch => {
    const res = await axios.post('/api/play', {track : track.uri, device : device});
    dispatch({type : PLAY});
};

export const onProgress = (progress,duration_ms) => async dispatch => {
    dispatch({type : UPDATE_TIMER, duration : duration_ms, progress : progress});
};

