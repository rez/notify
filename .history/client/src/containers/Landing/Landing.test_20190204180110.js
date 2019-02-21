import React from 'react';
import {shallow} from 'enzyme';
import Landing from './Landing';
describe('HeaderContainer', () => {

    it('render component', () => {
        let landing = shallow(<Landing  />)
       expect(landing.find('div').length).toEqual(1);
       expect(landing.find('.LandingHeader').length).toEqual(1);
       expect(landing.find('.siteDescription').length).toEqual(1);
    }); 
 
});