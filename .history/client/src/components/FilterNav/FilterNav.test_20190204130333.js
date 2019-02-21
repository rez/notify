import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../../data/fixtures'
import FilterNav from './FilterNav';


const props = {
    navFilters : [{path : "/", label : "test" },{path : "/2", label : "test2" }],
    active : "1",
    basePath: "1",
}; 
describe('ArtistReleaseList', () => {
    
    let filterNav = shallow(<FilterNav {...props} />)
    
    it('render component', () => {
       expect(filterNav.find('.filter__nav').length).toEqual(1);
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
        artistMap.find('Marker').first().simulate('click');
        expect(props.onAlert.calledOnce).toBe(true);
     });
    
});