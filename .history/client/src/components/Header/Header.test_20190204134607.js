import React from 'react';
import {shallow, mount} from 'enzyme';
import {stub} from 'sinon';
import Header from './Header';


const props = {
    sticky : false,
    mounted : true,
    setHeight : stub(),
    auth : {}
}; 
describe('Header', () => {
    
    let header = shallow(<Header {...props} />)
    
    it('render component', () => {
       expect(header.find('nav').length).toEqual(1);
    }); 
    it('should properly rendered logout state', () => {
       expect(header.find('.login').length).toEqual(1);
       expect(header.find('.dashboard').exists()).toBe(false);
       expect(header.find('.logout').exists()).toBe(false);
    });
    it('should properly rendered logged in state', () => {
        header.setProps({auth : {auth : {spotifyID : "xyz"}}})
        expect(header.find('.login').length).toEqual(1);
        expect(header.find('.dashboard').length).toEqual(1);
        expect(header.find('.logout').length).toEqual(1);
     });  
});