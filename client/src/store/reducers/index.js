import { combineReducers} from 'redux';
import authReducer from './authReducer';
import playerReducer from "./playerReducer";

export default combineReducers({
    auth: authReducer,
    player: playerReducer
});