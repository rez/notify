import React from 'react';
import {shallow, mount} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../../data/fixtures'
import ArtistSetsMap from './ArtistSetsMap';


const props = {
    sets : fixtures.sets,
    lon : "1",
    lat: "1",
    onMarkerClustererClick : stub()
}; 
describe('ArtistReleaseList', () => {
    
    let artistMap = shallow(<ArtistSetsMap {...props} />)
    
    it('render component', () => {
        console.log(artistMap.debug());
       expect(artistMap.find('div').length).toEqual(1);
    }); 
    it('render google map', () => {
        console.log(artistMap.debug());
       expect(artistMap.find('GoogleMap').length).toEqual(1);
    });
    it('render Cluster', () => {
        console.log(artistMap.debug());
       expect(artistMap.find('GoogleMap').length).toEqual(1);
    }); 
    
    // describe('rendering the list', () =>{
    //     it('renders release list', () => {
    //         expect(artistList.find('ul').length).toEqual(1);
    //     });
    //     it('renders release image', () => {
    //         artistList.find('.collection-item').forEach((node, index) => {
    //             console.log(index);
    //             expect(node.find('img').prop('src')).toEqual(props.releases[index].images[0].url);
    //         });
    //     });
    //     it('renders release artist name', () => {
    //         artistList.find('.collection-item').forEach((node, index) => {
    //             console.log(index);
    //             expect(node.find('.black-text').text()).toEqual(props.releases[index].name);
    //         });
    //     });
    // });
   
    // describe('Clicking a release list item', () =>{
    //     beforeEach(() => {
    //         artistList.find('li').first().simulate('click');
    //     });
    //     it("click happens", () => {
    //         expect(props.play.calledOnce).toEqual(true);
    //     });
    //     it("uses correct item passed as props", () => {
    //         expect(props.play.calledWith(props.releases[0])).toEqual(true);
    //     });
    // });
});