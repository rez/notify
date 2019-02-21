import React from 'react';
import {shallow} from 'enzyme';
import Landing from './Landing';
describe('HeaderContainer', () => {

    it('render component', () => {
        let landing = shallow(<Landing  />)
       expect(header.find('div').length).toEqual(1);
       expect(header.find('.LandingHeader').length).toEqual(1);
       expect(header.find('.siteDescription').length).toEqual(1);
    }); 
 
});