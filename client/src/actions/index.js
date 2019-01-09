import axios from 'axios';
import {FETCH_DEVICES, FETCH_USER, PLAY_ITEM} from './types';

export const fetchUser = () => async dispatch => {
      const res = await axios.get('/api/current_user');
      dispatch({type : FETCH_USER, payload:res});
};

export const fetchDevices = () => async dispatch => {
      const res = await axios.get('/api/devices');
      dispatch({type : FETCH_DEVICES, payload:res.data.devices});
};
