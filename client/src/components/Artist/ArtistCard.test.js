import React from 'react';
import {mount} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../data/fixtures'
import ArtistCard from './ArtistCard';

const props = {
    releases : fixtures.releases,
    sets :  fixtures.releases,
    showNewReleases : stub(), 
    name : "Joe Jon James",
    showSetMap: stub(),
    img : "/img"
}; 
describe('ArtistCard', () => {
    
    let artistCard = mount(<ArtistCard {...props} />)
    
    it('render artist image', () => {
       expect(artistCard.find('img').prop('src')).toEqual(props.img);
    }); 
    it('render artist title', () => {
        expect(artistCard.find('.card-title').text()).toEqual(props.name);
    });
    it('render artist releases length', () => {
        expect(artistCard.find('.release-btn').text()).toEqual(`${props.releases.length} release(s)`);
    });
    it('render artist release', () => {
        expect(artistCard.find('.card-content p span').length).toEqual(2);
    }); 
    it('render artist sets length', () => {
        expect(artistCard.find('.sets-btn').text()).toEqual(`${props.releases.length} show(s) near you`);
    });
    
    describe('Click events', () =>{
        it("Click releases happens", () => {
            artistCard.find('.release-btn').first().simulate('click');
            expect(props.showNewReleases.calledOnce).toEqual(true);
        });
        it("Click releases passes correct item", () => {
            expect(props.showNewReleases.calledWith(props.name, props.releases)).toEqual(true);
        });
        it("click sets happens", () => {
            artistCard.find('.sets-btn').first().simulate('click');
            expect(props.showSetMap.calledOnce).toEqual(true);
        });
        it("Click sets passes correct item", () => {
            expect(props.showSetMap.calledWith(props.name, props.releases)).toEqual(true);
        });
    });
});