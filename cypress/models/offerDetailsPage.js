import {data} from '../support/data.js'
import {checkUrl, createStep} from "../support/utilities.js";

const offerDetailData = data.ulovDomovData[0].offerDetailsPage

class OfferDetailsPage {
    photoGallery = () => cy.get('div[data-test="offerDetail.photoGallery"]');
    navPanelRight = () => cy.get('div[data-test="offerDetail.rightPanel"]');
    titleOfferDetail = () => cy.get('h1[data-test="offerDetail.perex.title"]');
    headingOfferPrice = () => cy.get('[data-test="offerDetail.price"]').children('span');
    boxOfferContact = () => cy.get('[data-test="offerDetail.contact"]');


    checkOfferPrice = (offerPrice) => {
        this.headingOfferPrice()
            .invoke('text')
            .then((text) => {
                const cleaned = text.replace(/\s/g, '');
                const price = parseInt(cleaned.split('Kč')[0]);
                expect(price).to.be.greaterThan(offerPrice);
            });
    };

    checkOfferTitle = () => {
        this.headingOfferPrice().should('be.visible');
        cy.get('@leaseTitle').then((leaseTitle) => {
            this.navPanelRight().within(() => {
                this.titleOfferDetail().should('be.visible');
                this.titleOfferDetail().should('have.text', leaseTitle);
            });
        })
    }

}

module.exports = new OfferDetailsPage()