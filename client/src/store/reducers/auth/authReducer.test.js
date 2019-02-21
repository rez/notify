import authReducer from './authReducer';
import * as actions from '../../actions/ActionTypes';
import {defaultState} from './initialState';
import * as fixtures from '../../../data/fixtures'

describe('auth reducer', () => {
    it('returns the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(defaultState);
    });
    it('fetches user', () => {
        expect(authReducer(undefined,{type:actions.FETCH_USER, payload:fixtures.user}))
            .toEqual({fetching : false, auth : fixtures.user});
    });
    it('set state of fetching user true', () => {
        expect(authReducer(undefined,{type:actions.FETCH_USER_IN_PROGRESS}))
            .toEqual({...defaultState, fetching : true});
    });
});