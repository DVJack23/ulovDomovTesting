import {data} from '../support/data.js';
import Header from '../models/header.js';
import ListingsPage from '../models/listingsPage.js';
import Homepage from "../models/homepage.js";
import FilterPanel from '../models/filterPanel.js'

describe('Basic tests for ulovDomov.cz', () => {
    Object.values(data.ulovDomovData).forEach((data) => {
        describe('Testing the functionality of filter panel for the listings page', () => {
            beforeEach(() => {
                Header.openHomepage()
            });
            it('TC-UDFP01: Check that basic filter options on the listings page work when searching for flat rentals', ()=> {
                Homepage.completeSearch(data.homepage.offerTypeOne, data.homepage.propertyTypeOne, data.homepage.basicAddress);
                ListingsPage.openFilterPanel();
                FilterPanel.setFilterForFlatRents(data.filterPanel.layoutTypeOne,data.filterPanel.minPrice,data.filterPanel.maxPrice,data.filterPanel.minArea,data.filterPanel.maxArea)
            })
        })
    })
})