import { GET_LOCATION} from "../../actions/types";
import {defaultState} from "./initialState";

export default function(state = defaultState, action){
    switch (action.type) {
        case GET_LOCATION:
            return { ...state, latitude : action.latitude, longitude : action.longitude , init : action.init};
        default:
            return state;
    }
}