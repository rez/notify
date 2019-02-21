import React from 'react';
import {shallow} from 'enzyme';
import {stub} from 'sinon';
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
       expect(filterNav.find('Link').length).toEqual(props.navFilters.length);
    });    
});