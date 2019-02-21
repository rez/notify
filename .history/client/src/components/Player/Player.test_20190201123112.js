import React from 'react';
import {mount, shallow} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../data/fixtures'
import {defaultState} from '../../store/reducers/player/initialState';
import Player from './Player';

const props = {
    requestPlayerState: stub(),
    onProgress : stub(),
    pauseTrack : stub(),
    resumeTrack: stub(),
    nextTrack: stub(),
    previousTrack: stub(),
    playTrack: stub(),
    calcProgressPercentage: stub(),
    player: defaultState,

};
describe('Dashboard', () => {

    let dashboard = shallow(<Dashboard {...props} />)

    it('render dashboard', () => {
        expect(dashboard.find('div').exists()).toBe(true);
    });
    it('renders modals', () => {
        expect(dashboard.find('Modal').length).toEqual(2);
    });
    it('renders Filter Nav', () => {
        expect(dashboard.find('FilterNav').exists()).toBe(true);
    });
    it('renders Dropdown', () => {
        expect(dashboard.find('Dropdown').exists()).toBe(true);
    });
    it('renders Infinite Scroll', () => {
        expect(dashboard.find('InfiniteScroll').exists()).toBe(true);
    });
    it('does not render Follow Grid', () => {
        expect(dashboard.find('ArtistGrid').exists()).toBe(false);
    });
    it('does render 1 follow grid', () => {
        dashboard.setProps({...props, dashboard : { ...defaultState, follows : fixtures.releases}});
        expect(dashboard.find('ArtistGrid').length).toEqual(1);
    });
    it('does render 2 grids', () => {
        console.log(dashboard.props());
        dashboard.setProps({...props, dashboard : { ...defaultState, mostPlayed : fixtures.releases}});
        expect(dashboard.find('ArtistGrid').length).toEqual(1);
    });
});