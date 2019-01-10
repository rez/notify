import {UPDATE_TRACK_INFO, NEXT, FETCH_DEVICES, PLAY, PAUSE, UNINIT, RESUME, PLAYING, UPDATE_TIMER, PREVIOUS} from "../../actions/types";
import {defaultState} from "./initialState";

export default function(state = defaultState, action){
    switch (action.type) {
        case FETCH_DEVICES:
            return {...state , devices : action.devices || false , active_device : action.active_device};
        case PLAY:
            return {...state};
        case PAUSE:
            return {...state};
        case RESUME:
            return {...state};
        case PREVIOUS:
            return {...state};
        case NEXT:
            return {...state};
        case UPDATE_TIMER:
            return {...state};
        case UPDATE_TRACK_INFO:
            return {...state, ...action.payload};
        default:
            return state;

    }
}