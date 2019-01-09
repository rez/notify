import axios from "axios";
import {FETCH_DEVICES, RESUME, PAUSE, NEXT, PREVIOUS} from "./types";

export const fetchDevices = () => async dispatch => {
    const res = await axios.get('/api/devices');
    dispatch({type : FETCH_DEVICES, payload:res.data.devices});
};

export const nextTrack = (device) => async dispatch => {
    const res = await axios.post('/api/next', {
        device : device.id});
    dispatch({type : NEXT});
};

export const pauseTrack = (device) => async dispatch => {
    const res = await axios.post('/api/pause', {
        device : device.id});
    dispatch({type : PAUSE});
};
export const resumeTrack = (uri, device,progress) => async dispatch => {
    const res = await axios.post('/api/resume', {track :uri,
        device : device.id, position :progress});
    dispatch({type : RESUME});
};
export const previousTrack = (device) => async dispatch => {
    const res = await axios.post('/api/previous', {
        device : device.id});
    dispatch({type : PREVIOUS});
};