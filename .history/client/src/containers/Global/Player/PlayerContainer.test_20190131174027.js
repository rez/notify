import React from 'react';
import { Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as fixtures from '../../../data/fixtures';
import {stub} from 'sinon';
import configureStore from 'redux-mock-store'
import {PlayerContainer} from './PlayerContainer'
import {defaultState} from '../../../store/reducers/player/initialState';
import Player from '../../../components/Player/Player';
const mockStore = configureStore()

const props = {
    onProgress : stub(),
    pauseTrack : stub(),
    resumeTrack : stub(),
    nextTrack : stub(),
    previousTrack : stub(),
    playTrack : stub(),
    calcProgressPercentage : stub(),
    requestPlayerState: stub()
}; 

describe('Private Route HOC', () => {

    const wrapper = shallow(<PlayerContainer {...props} auth={{auth : fixtures.user}} player={defaultState} />);

    it('should render dashboard', () => {
        console.log(wrapper.debug());
        expect(wrapper.find('Player').exists()).toBe(true);
    });   

    it('should start up player state service', () => {
        wrapper.instance().startSpotifyPoll();
        expect(props.requestPlayerState().toHaveBeenCalled()).toBe(true);
    });
});