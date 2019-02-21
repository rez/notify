import dashboardReducer from './dashboardReducer';
import * as actions from '../../actions/ActionTypes';
import {defaultState} from './initialState';
import * as fixtures from '../../../data/fixtures'
import * as constants from "../../../constants/constants";
import * as TimeConstants from "../../../constants/TimeConstants";

describe('dash reducer', () => {
    it('returns the initial state', () => {
        expect(dashboardReducer(undefined, {})).toEqual(defaultState);
    });
    it('set state when fetching follows grid', () => {
        expect(dashboardReducer(undefined,{type:actions.GET_USER_FOLLOWS, 
            data:fixtures.releases}))
            .toEqual({...defaultState, fetching : false, follows : fixtures.releases, activeGrid : constants.FOLLOWING});
    });
    it('set state when fetching most played grid', () => {
        expect(dashboardReducer(undefined,{type:actions.GET_USER_MOST_PLAYED, 
            data:fixtures.releases}))
            .toEqual({...defaultState, fetching : false, mostPlayed : fixtures.releases, activeGrid : constants.MOST_PLAYED_ARTIST});
    });
    it('set state while fetching is active', () => {
        expect(dashboardReducer(undefined,{type:actions.FETCH_REQUEST}))
            .toEqual({...defaultState, fetching : true});
    });
    it('set state when time filter updated', () => {
        expect(dashboardReducer(undefined,{type:actions.SET_TIME_SPAN, timeSpan : TimeConstants.TIME_3_MONTHS}))
            .toEqual({...defaultState, timeSpan : TimeConstants.TIME_3_MONTHS});
    });
});