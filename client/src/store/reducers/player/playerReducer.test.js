import playerReducer from './playerReducer';
import * as actions from '../../actions/ActionTypes';
import {defaultState} from './initialState';
import * as fixtures from '../../../data/fixtures'
import * as constants from "../../../constants/constants";

describe('dash reducer', () => {
    it('returns the initial state', () => {
        expect(playerReducer(undefined, {})).toEqual(defaultState);
    });
    it('set state of available spotify devices', () => {
        expect(playerReducer(undefined,{type:actions.FETCH_DEVICES, 
            devices: fixtures.devices, active_device : null}))
            .toEqual({...defaultState, devices : fixtures.devices});
    });

    it("update state on player controls", ()=>{
        expect(playerReducer({}, {})).toEqual({});
    });
    it("update timer", ()=>{
        expect(playerReducer(undefined, {type : actions.UPDATE_TIMER})).toEqual(defaultState);
    });

    it("update state with current track info", ()=>{
        expect(playerReducer(undefined, {type:actions.UPDATE_TRACK_INFO, payload : fixtures.newTrackInfo}))
            .toEqual({...defaultState, ...fixtures.newTrackInfo}); 
    });
});