import { combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import playerReducer from "./player/playerReducer";
import locationReducer from "./location/locationReducer";
import dashboardReducer from "./dashboard/dashboardReducer";

export default combineReducers({
    auth: authReducer,
    player: playerReducer,
    location : locationReducer,
    dashboard : dashboardReducer
});