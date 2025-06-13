import {data} from '../support/data.js';
import Header from '../models/header.js'
import Homepage from '../models/homepage.js'

describe('Basic tests for ulovdomov.cz', () => {
    Object.values(data.ulovDomovData).forEach((data)=> {
        describe('Tests for search bar', () => {
            beforeEach(() => {
                Header.openHomepage();
            });
            it('TC-UDSB01: Search for predefined property offers', () => {
                Homepage.generalSearch();
            });
            it('TC-UDSB02: Search with all parameters set', () => {
                Homepage.completeSearch(data.homepage.offerTypeTwo, data.homepage.propertyTypeTwo, data.homepage.basicAddress);
            })
        })
    })
})