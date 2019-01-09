import {FETCH_DEVICES, PLAY, PAUSE, UNINIT, RESUME, PLAYING, UPDATE_TIMER} from "../actions/types";

export default function(state = {state : UNINIT}, action){
    switch (action.type) {
        case FETCH_DEVICES:
            return {...state , devices : action.payload || false };
        case PLAY:
            return {...state, playing : action.track, state : PLAYING };
        case PAUSE:
            return {...state, state : PAUSE};
        case RESUME:
            return {...state, state : PLAYING};
        case UPDATE_TIMER:
            return {...state, progress : action.progress, duration : action.duration};
        default:
            return state;

    }
}