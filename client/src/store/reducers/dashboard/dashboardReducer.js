import {
    GET_USER_FOLLOWS, GET_USER_MOST_PLAYED, UPDATE_ACTIVE_FILTER, FETCH_REQUEST
} from "../../actions/ActionTypes";
import {defaultState} from "./initialState";
import * as constants from "../../../constants/constants";

export default function(state = defaultState, action){
    switch (action.type) {
        case  GET_USER_FOLLOWS:
            return{...state, follows : action.data, fetching: false, activeGrid: constants.FOLLOWING};
        case GET_USER_MOST_PLAYED:
            return{...state, mostPlayed : action.data,fetching: false, activeGrid : constants.MOST_PLAYED_ARTIST};
        case UPDATE_ACTIVE_FILTER:
            return{...state, activeGrid : action.filter};
        case FETCH_REQUEST:
            return{...state, fetching : true};
        default:
            return state;

    }
}