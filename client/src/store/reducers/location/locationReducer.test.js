import locationReducer from './locationReducer';
import * as actions from '../../actions/ActionTypes';
import {defaultState} from './initialState';
import * as fixtures from '../../../data/fixtures'
import * as constants from "../../../constants/constants";
import * as TimeConstants from "../../../constants/TimeConstants";

describe('dash reducer', () => {
    it('returns the initial state', () => {
        expect(locationReducer(undefined, {})).toEqual(defaultState);
    });
    it('set state when location detected', () => {
        expect(locationReducer(undefined,{type:actions.GET_LOCATION, 
            latitude:-1 , longitude : -1, init : true}))
            .toEqual({...defaultState, latitude:-1 , longitude : -1, init : true});
    });
});