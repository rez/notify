import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme'
import {DashboardContainer} from './DashboardContainer';
import Dashboard from '../../components/Dashboard/Dashboard';

configure({adapter: new Adapter});

describe('DashboardContainer', ()=>{
    let wrapper;

    beforeEach(() =>{
        wrapper = shallow(<DashboardContainer/>)
    });

    it('should render dash component', () => {
        wrapper.setProps({})
    });
});