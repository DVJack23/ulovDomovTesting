import {data} from '../support/data.js';
import Header from '../models/header.js';
import ListingsPage from '../models/listingsPage.js';
import Homepage from "../models/homepage.js";

describe('Basic tests for ulovDomov.cz', () => {
    Object.values(data.ulovDomovData).forEach((data) => {
        describe('Testing the functionality of the page that shows search results', ()=> {
            beforeEach(() => {
                Header.openHomepage()
            });
            it('TC-UDLP01: Listing page contains all required elements', () =>{
                ListingsPage.catchMapContent();
                Homepage.completeSearch(data.homepage.offerTypeOne, data.homepage.propertyTypeOne, data.homepage.basicAddress);
                ListingsPage.checkMapContent(data.homepage.basicAddress);
                ListingsPage.basicElementsCheck(data.listingsPage.orderByOne);
            })

        })
    })
});