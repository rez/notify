import {
    UPDATE_TRACK_INFO,
    NEXT,
    FETCH_DEVICES,
    PLAY,
    PAUSE,
    RESUME,
    UPDATE_TIMER,
    PREVIOUS,
} from "../../actions/ActionTypes";
import {defaultState} from "./initialState";

export default function(state = defaultState, action){
    switch (action.type) {
        case FETCH_DEVICES:
            return {...state , devices : action.devices || false , active_device : action.active_device};
        case PLAY:
        case PAUSE:
        case RESUME:
        case PREVIOUS:
        case NEXT:
        case UPDATE_TIMER:
            return {...state};
            break;
        case UPDATE_TRACK_INFO:
            return {...state, ...action.payload};
        default:
            return state;

    }
}