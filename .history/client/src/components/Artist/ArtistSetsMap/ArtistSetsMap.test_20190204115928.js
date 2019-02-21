import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../../data/fixtures'
import ArtistSetsMap from './ArtistSetsMap';

const props = {
    releases : fixtures.releases,
    artist : "Joe Jon James",
    play: stub()
}; 
describe('ArtistReleaseList', () => {
    
    let artistList = mount(<ArtistReleaseList {...props} />)
    
    it('render release list artist name', () => {
       expect(artistList.find('h4').text()).toEqual(props.artist);
    }); 
    
    describe('rendering the list', () =>{
        it('renders release list', () => {
            expect(artistList.find('ul').length).toEqual(1);
        });
        it('renders release image', () => {
            artistList.find('.collection-item').forEach((node, index) => {
                console.log(index);
                expect(node.find('img').prop('src')).toEqual(props.releases[index].images[0].url);
            });
        });
        it('renders release artist name', () => {
            artistList.find('.collection-item').forEach((node, index) => {
                console.log(index);
                expect(node.find('.black-text').text()).toEqual(props.releases[index].name);
            });
        });
    });
   
    describe('Clicking a release list item', () =>{
        beforeEach(() => {
            artistList.find('li').first().simulate('click');
        });
        it("click happens", () => {
            expect(props.play.calledOnce).toEqual(true);
        });
        it("uses correct item passed as props", () => {
            expect(props.play.calledWith(props.releases[0])).toEqual(true);
        });
    });
});