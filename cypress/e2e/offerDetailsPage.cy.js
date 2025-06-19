import {data} from '../support/data.js';
import Header from '../models/header.js';
import Homepage from "../models/homepage.js";
import ListingsPage from "../models/listingsPage.js";
import OfferDetailsPage from "../models/offerDetailsPage.js";

describe('Basic tests for ulovDomov.cz', () => {
    Object.values(data.ulovDomovData).forEach((data) => {
        describe('Testing the functionality of the offer details page', () => {
            beforeEach(() => {
                Header.openHomepage();
            });
            it('TC-UDOD01: Offer details page opens and displays selected offer', () =>{
                Homepage.completeSearch(data.homepage.offerTypeOne, data.homepage.propertyTypeOne, data.homepage.basicAddress);
                ListingsPage.showFirstLeaseDetail();
                OfferDetailsPage.checkOfferTitle();
                OfferDetailsPage.checkOfferPrice(data.offerDetailsPage.offerPrice);
            });
            it('TC-UDOD02: Offer details page contains all required elements',() => {
                Homepage.completeSearch(data.homepage.offerTypeOne, data.homepage.propertyTypeOne, data.homepage.basicAddress);
                OfferDetailsPage.catchMapContent();
                ListingsPage.showFirstLeaseDetail();
                OfferDetailsPage.checkPhotoGallery();
                OfferDetailsPage.checkOfferTitle();
                OfferDetailsPage.checkOfferPrice(data.offerDetailsPage.offerPrice);
                OfferDetailsPage.checkContactPanel();
                OfferDetailsPage.checkWatchdogPanel();
                OfferDetailsPage.checkReportButton();
                OfferDetailsPage.checkShareButton();
                OfferDetailsPage.checkDescription();
                OfferDetailsPage.checkInfoDetails();
                OfferDetailsPage.checkMap();
            })
        })
    })
})