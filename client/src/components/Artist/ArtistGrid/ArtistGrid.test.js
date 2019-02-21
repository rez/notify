import React from 'react';
import {mount} from 'enzyme';
import {stub} from 'sinon';
import * as fixtures from '../../../data/fixtures'
import ArtistGrid from './ArtistGrid';

const props = {
    show : false,
    items : fixtures.releases,
    showNewReleases: stub(),
    showSetMap : stub()
}; 
describe('ArtistGrid', () => {
    
    let artistGrid = mount(<ArtistGrid {...props} />)
    
    it('renders the grid', () => {
       expect(artistGrid.find('Card').length).toEqual(props.items.length);
    }); 
    
});