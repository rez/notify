import axios from "axios";
import * as constants from '../../constants/constants'
import {getFollowsLastID, getMostPlayedOffset} from "../../selectors/DashSelectors";
import {
    GET_USER_FOLLOWS,
    GET_USER_MOST_PLAYED,
    UPDATE_ACTIVE_FILTER,
    FETCH_REQUEST
} from "./ActionTypes";
import {FOLLOWING} from "../../constants/constants";

export const getUserFollows = (latitude, longitude) => async (dispatch, getState) => {
    dispatch({type : FETCH_REQUEST});
    const state = getState();
    const res = await axios.get('/api/releases', {
        params : {
            longitude: longitude,
            latitude: latitude,
            after : getFollowsLastID(state)
        }
    });
    if(res){
        dispatch({type : GET_USER_FOLLOWS, data : res.data});
    }

};

export const getUserMostPlayed = (latitude, longitude) => async  (dispatch, getState) => {
    dispatch({type : FETCH_REQUEST});
    const state = getState();
    const res = await axios.get('/api/releases/mostplayed', {
        params : {
            longitude: longitude,
            latitude: latitude,
            offset : getMostPlayedOffset(state)
        }
    });
    if(res){
        dispatch({type : GET_USER_MOST_PLAYED, data : res.data});
    }

};
export const getUserUnseen = (latitude, longitude) => async dispatch => {
    dispatch({type : FETCH_REQUEST});
    const res = await axios.get('/api/releases/mostplayed', {
        params : {
            longitude: longitude,
            latitude: latitude
        }
    });
    if(res){
        dispatch({type : GET_USER_MOST_PLAYED, data : res.data});
    }

};
export const updateActiveFilter = (filter) => {
    return({type : UPDATE_ACTIVE_FILTER, filter : filter});
};

