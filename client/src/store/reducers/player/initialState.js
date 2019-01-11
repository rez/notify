import {UNINIT} from "../../actions/ActionTypes";

export const defaultState = {
    active_device : null,
    devices : [],
    duration : 0,
    progress : 0,
    state : UNINIT
};