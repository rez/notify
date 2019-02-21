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
    
    let artistMap = mount(<ArtistSetsMap {...props} />)
    
    it('render component', () => {
       expect(artistMap.find('div').length).toEqual(1);
    }); 
    it('render google map', () => {
       expect(artistMap.find('GoogleMap').length).toEqual(1);
    });
    it('render Cluster', () => {
       expect(artistMap.find('MarkerClusterer').length).toEqual(1);
    }); 
    it('render markers', () => {
        expect(artistMap.find('Marker').length).toEqual(fixtures.sets.length);
     }); 

     it('handles event alert', ()=>{
        const spy = spyOn(artistMap.instance(), 'eventAlert');
        artistMap.find('Marker').first().simulate('click');
        expect(spy).toHaveBeenCalled();
     });
    
});