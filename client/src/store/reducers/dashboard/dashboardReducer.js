import {
    GET_USER_FOLLOWS, GET_USER_MOST_PLAYED, UPDATE_ACTIVE_FILTER, FETCH_REQUEST, SET_TIME_SPAN
} from "../../actions/ActionTypes";
import {defaultState} from "./initialState";
import * as constants from "../../../constants/constants";

export default function(state = defaultState, action){
    switch (action.type) {
        case  GET_USER_FOLLOWS:
            const follows = [...state.follows, ...action.data];
            return{...state, follows : follows, fetching: false, activeGrid: constants.FOLLOWING};
        case GET_USER_MOST_PLAYED:
            const mostPlayed = [...state.mostPlayed, ...action.data];
            return{...state, mostPlayed : mostPlayed,fetching: false, activeGrid : constants.MOST_PLAYED_ARTIST};
        case UPDATE_ACTIVE_FILTER:
            return{...state, activeGrid : action.filter};
        case FETCH_REQUEST:
            return{...state, fetching : true};
        case SET_TIME_SPAN:
            return{...state, timeSpan : action.timeSpan};
        default:
            return state;

    }
}