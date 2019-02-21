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
    requestPlayerState: jest.fn()
}; 

describe('Private Route HOC', () => {
    
    const wrapper = shallow(<PlayerContainer {...props} auth={{auth : fixtures.user}} player={defaultState} />);
    
    it('should render dashboard', () => {
        expect(wrapper.find('Player').exists()).toBe(true);
    });   
    it('should start up player state service', () => {
        jest.useFakeTimers();
        const spy = spyOn(wrapper.instance(),'startSpotifyPoll');
       // const spy2 = spyOn(wrapper.instance(),'requestPlayerState');
        jest.runOnlyPendingTimers();
        //force update to get component did update to fire
        wrapper.instance().setProps({ auth: { auth: fixtures.user } });
        expect(wrapper.instance().startSpotifyPoll).toBeCalled();
        expect(wrapper.instance().props.requestPlayerState).toBeCalled();
        jest.useRealTimers();
    });
    // it('should start up player state service', () => {
    //     wrapper.instance().startSpotifyPoll();
    //     expect(props.requestPlayerState.toHaveBeenCalled()).toBe(true);
    // });
});