import axios from "axios";
import {FETCH_USER, FETCH_USER_IN_PROGRESS} from './ActionTypes';

export const fetchUser = () => async dispatch => {
    dispatch({type : FETCH_USER_IN_PROGRESS});
    const res = await axios.get('/api/current_user');
    dispatch({type : FETCH_USER, payload:res});
};