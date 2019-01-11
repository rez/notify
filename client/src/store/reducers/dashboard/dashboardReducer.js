import {
    GET_USER_FOLLOWS
} from "../../actions/ActionTypes";
import {defaultState} from "./initialState";

export default function(state = defaultState, action){
    switch (action.type) {
        case  GET_USER_FOLLOWS:
            return{...state, follows : action.follows}
        default:
            return state;

    }
}