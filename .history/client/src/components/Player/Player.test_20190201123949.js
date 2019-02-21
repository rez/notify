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
describe('Player', () => {

    let player = shallow(<Player {...props} />)

    it('render player', () => {
        expect(player.find('.global__player').exists()).toBe(true);
    });
    it('no meta IMG rendered', () => {
        expect(player.find('.player__meta__img').exists()).toBe(false);
    });
    it('no meta title rendered', () => {
        expect(player.find('.MetaTitle').html()).toEqual("");
    });
    it('no meta artist rendered', () => {
        expect(player.find('.MetaArtist').html()).toEqual('<span class="MetaArtist"></span>');
    });
  
});