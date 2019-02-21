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
    
    it('should start up player state service', () => {
        const spy = spyOn(PlayerContainer.prototype,'startSpotifyPoll');
        const wrapper = shallow(<PlayerContainer {...props} auth={{auth : fixtures.user}} player={defaultState} />);

       // const spy2 = spyOn(wrapper.instance(),'requestPlayerState');
        //force update to get component did update to fire
        wrapper.setProps({ auth: { auth: fixtures.user } });
        wrapper.update();
        expect(wrapper.instance().startSpotifyPoll).toBeCalled();
        expect(wrapper.instance().props.requestPlayerState).toBeCalled();
    });

    it('should render dashboard', () => {
        const wrapper = shallow(<PlayerContainer {...props} auth={{auth : fixtures.user}} player={defaultState} />);
        expect(wrapper.find('Player').exists()).toBe(true);
    });   
    // it('should start up player state service', () => {
    //     wrapper.instance().startSpotifyPoll();
    //     expect(props.requestPlayerState.toHaveBeenCalled()).toBe(true);
    // });
});