import {checkUrl, createStep} from "../support/utilities.js";
import ListingPage from '../models/listingsPage.js'


class HomePage {
    buttonSearchOffers = () => cy.get('a[aria-label="Hledat bydlení"]');
    buttonPropertyType = (propertyType) => cy.contains('p', propertyType);
    boxSearchBar = () => this.buttonSearchOffers().closest('div');
    inputAddress = () => cy.get('input[placeholder="Město, ulice..."]');
    selectAddress = (address) => cy.contains('p', address);
    inputOfferType = () => cy.get('[data-test="global.writeBox"]').find('input');
    selectOfferType = (offerType) => cy.contains('p', offerType);


    generalSearch = () => {
        createStep('Click the search offer button')
        this.boxSearchBar().should('be.visible');
        this.buttonSearchOffers().should('be.visible');
        this.buttonSearchOffers().click();
        createStep('Check search results page');
        checkUrl('/pronajem/nemovitosti');
        ListingPage.countOfOffers().should('be.visible');
        ListingPage.firstPreviewOfLeases().should('be.visible');

    }

    completeSearch = (offerType, propertyType, address) => {
        createStep('Select desired offer type')
        this.boxSearchBar().should('be.visible');
        this.buttonSearchOffers().should('be.visible');
        this.inputOfferType().should('be.visible');
        this.inputOfferType().click();
        this.selectOfferType(offerType).should('be.visible');
        this.selectOfferType(offerType).click();
        this.inputOfferType().should('have.value', offerType);
        createStep('Fill the address input field')
        this.inputAddress().should('be.visible');
        this.inputAddress().type(address);
        this.selectAddress(address).should('be.visible');
        this.selectAddress(address).click();
        this.inputAddress().should('have.value', address);
        if (propertyType !== 'Spolubydlení') {
            createStep('Click the desired property type button')
            this.buttonPropertyType(propertyType).should('be.visible');
            this.buttonPropertyType(propertyType).click();
        }
        createStep('Confirm search and click the show offers button')
        this.buttonSearchOffers().click();
        ListingPage.checkSearchResult(offerType, propertyType, address);
    }
}

module.exports = new HomePage();