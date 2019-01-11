import axios from "axios";
import {
    GET_USER_FOLLOWS
} from "./ActionTypes";

export const getUserFollows = (latitude, longitude) => async dispatch => {
    const res = await axios.get('/api/releases', {
        params : {
            longitude: longitude,
            latitude: latitude
        }
    });
    console.log("GET FOLLOWS");
    console.log(res);
    if(res){
        dispatch({type : GET_USER_FOLLOWS, follows : res.data});
    }

};

