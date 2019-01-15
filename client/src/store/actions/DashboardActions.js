import axios from "axios";
import * as constants from '../../constants/constants'
import {
    GET_USER_FOLLOWS,
    GET_USER_MOST_PLAYED,
    UPDATE_ACTIVE_FILTER,
    FETCH_REQUEST
} from "./ActionTypes";

export const getUserFollows = (latitude, longitude) => async dispatch => {
    dispatch({type : FETCH_REQUEST});
    const res = await axios.get('/api/releases', {
        params : {
            longitude: longitude,
            latitude: latitude
        }
    });
    if(res){
        dispatch({type : GET_USER_FOLLOWS, data : res.data});
    }

};

export const getUserMostPlayed = (latitude, longitude) => async dispatch => {
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
export const updateActiveFilter = (filter) => async dispatch => {
    dispatch({type : UPDATE_ACTIVE_FILTER, filter : filter});
};

