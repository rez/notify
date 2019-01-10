import { combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import playerReducer from "./player/playerReducer";

export default combineReducers({
    auth: authReducer,
    player: playerReducer
});