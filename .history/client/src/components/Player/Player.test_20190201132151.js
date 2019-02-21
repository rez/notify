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
        expect(player.find('.Player').exists()).toBe(true);
    });
    it('no meta IMG rendered', () => {
        expect(player.find('.MetaImg img').exists()).toBe(false);
    });
    it('no meta title rendered', () => {
        expect(player.find('.MetaTitle').html()).toEqual('<span class="MetaTitle"></span>');
    });
    it('no meta artist rendered', () => {
        expect(player.find('.MetaArtist').html()).toEqual('<span class="MetaArtist"></span>');
    });
    it('no progress rendered', () => {
        expect(player.find('.TimeWrap').exists()).toBe(false);
    });

    describe('when track is available', () =>{
        it('progress rendered', () => {
            player.setProps({...props, player : fixtures.track});
            expect(player.find('.TimeWrap').exists()).toBe(true);
        });
        it('artist name rendered', () => {
            player.setProps({...props, player : fixtures.track});
            expect(player.find('.MetaArtist').html()).toEqual(`<span class="MetaArtist">${fixtures.track.track.name}</span>`);
        });
        it('title rendered', () => {
            player.setProps({...props, player : fixtures.track});
            expect(player.find('.MetaTitle').html()).toEqual(`<span class="MetaTitle">${fixtures.track.track.album.artists[0].name}</span>`);
        });
        it('no meta IMG rendered', () => {
            player.setProps({...props, player : fixtures.track});
            expect(player.find('.MetaImg img').exists()).toBe(true);
        });
    });

    describe("click events happen", ()=>{
        it("resume happens", () => {
            player.find('.ControlPLY img').first().simulate('click');
            expect(props.playTrack.calledOnce).toEqual(true);
        });
        it("pause happens", () => {
            player.setProps({...props, player : {...fixtures.track, state : "play"}});
            player.find('.ControlPLY img').first().simulate('click');
            expect(props.resumeTrack.calledOnce).toEqual(true);
        });
        it("back happens", () => {
            player.find('.ControlBCK').first().simulate('click');
            expect(props.previousTrack.calledOnce).toEqual(true);
        });
        it("next track happens", () => {
            player.find('.ControlFWD').first().simulate('click');
            expect(props.nextTrack.calledOnce).toEqual(true);
        });
    });
  
});