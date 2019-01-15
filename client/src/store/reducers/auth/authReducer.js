import {FETCH_USER, FETCH_USER_IN_PROGRESS} from "../../actions/ActionTypes";
import {defaultState} from "./initialState";

export default function(state = defaultState, action){
    switch (action.type) {
        case FETCH_USER_IN_PROGRESS:
            return { ...state, fetching : true };
        case FETCH_USER:
            return { ...state, auth : action.payload || false, fetching: false};
        default:
            return state;

    }
}