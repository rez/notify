import React from 'react';
import { Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as fixtures from '../....//data/fixtures';
import {stub} from 'sinon';
import configureStore from 'redux-mock-store'
import {DashboardContainer} from './PlayerContainer'
import {defaultState} from '../../../store/reducers/player/initialState';
import * as TimeConstants from '../../constants/TimeConstants';
import { MOST_PLAYED_ARTIST, MOST_PLAYED_LINK } from '../../constants/constants';
import Player from '../../../components/Player/Player';
const mockStore = configureStore()

const props = {

}; 

describe('Private Route HOC', () => {

    const wrapper = shallow(<Player {...props} auth={{auth : fixtures.user}} player={defaultState} />);

    it('should render dashboard', () => {
        expect(wrapper.find('Player').exists()).toBe(true);
    });   
});