import { FETCH_USER} from "../../actions/types";
import {defaultState} from "./initialState";

export default function(state = defaultState, action){
    switch (action.type) {
        case FETCH_USER:
            return { ...state, auth : action.payload || false};
        default:
            return state;

    }
}