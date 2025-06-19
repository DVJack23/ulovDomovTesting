import {data} from '../support/data.js'
import {createStep} from "../support/utilities.js";

const offerDetailData = data.ulovDomovData[0].offerDetailsPage;
let offerPriceText = offerDetailData.offerPriceText;
let buttonCreateWatchdog = offerDetailData.buttonCreateWatchdog;
let buttonReportOffer = offerDetailData.buttonReportOffer;
let buttonShareOffer = offerDetailData.buttonShareOffer;
let listOfDetails = offerDetailData.listOfDetails;

class OfferDetailsPage {
    photoGallery = () => cy.get('div[data-test="offerDetail.photoGallery"]');
    imgOfferContact = () => cy.get('[data-test="offerDetail.contact.owner.photo"]').first();
    navPanelRight = () => cy.get('div[data-test="offerDetail.rightPanel"]');
    panelOfferContact = () => cy.get('[data-test="offerDetail.contact"]').first();
    panelWatchdog = () => cy.get('[data-test="offerDetail.watchdogBanner"]')
    panelDescription = () => cy.get('[data-test="offerDetail.description"]').first();
    panelDetailsInfo = () => cy.get('[data-test="offerDetail.keyValueInfo"]')
    panelMap = () => cy.get('[data-test="offerDetail.locality"]');
    titleOfferDetail = () => cy.get('h1[data-test="offerDetail.perex.title"]');
    headingOfferPrice = () => cy.get('[data-test="offerDetail.price"]').first().find('span:visible');
    headingOfferContact = () => cy.get('[data-test="offerDetail.contact.owner"]').first();
    buttonOfferContact = () => cy.get('[data-test="offerDetail.contact.button"]').first();
    buttonCreateWatchdog = () => cy.contains('button', buttonCreateWatchdog);
    buttonReportOffer = () => cy.contains('button', buttonReportOffer);
    buttonShareOffer = () => cy.contains('button', buttonShareOffer);

    checkOfferPrice = (offerPrice) => {
        createStep('Check that price shown is correct');
        this.headingOfferPrice()
            .invoke('text')
            .then((text) => {
                if (text !== offerPriceText) {
                    const cleaned = text.replace(/\s/g, '');
                    const price = parseInt(cleaned.split('Kč')[0]);
                    expect(price).to.be.greaterThan(offerPrice);
                } else {
                    expect(text).to.be.eql(offerPriceText);
                }
            });
    };

    checkOfferTitle = () => {
        createStep('Check that title is correct');
        this.headingOfferPrice().should('be.visible');
        cy.get('@leaseTitle').then((leaseTitle) => {
            this.navPanelRight().within(() => {
                this.titleOfferDetail().should('be.visible');
                this.titleOfferDetail().should('have.text', leaseTitle);
            });
        })
    }

    checkContactPanel = () => {
        createStep('Check that contact panel is visible and contains required elements')
        this.panelOfferContact().should('be.visible');
        this.panelOfferContact().within(() => {
            this.headingOfferContact().should('be.visible');
            this.imgOfferContact().should('be.visible');
            this.buttonOfferContact().should('be.visible');
            this.buttonOfferContact().should('not.be.disabled');
        })
    }

    checkWatchdogPanel = () => {
        createStep('Check that watchdog panel is visible and contains required elements')
        this.panelWatchdog().should('be.visible');
        this.panelWatchdog().within(() => {
            this.buttonCreateWatchdog().should('be.visible');
            this.buttonCreateWatchdog().should('not.be.disabled');
        })
    }

    checkReportButton = () => {
        createStep('Check that reports button is visible');
        this.buttonReportOffer().should('be.visible');
        this.buttonReportOffer().should('not.be.disabled');
    }

    checkShareButton = () => {
        createStep('Check that share button is visible');
        this.buttonShareOffer().should('be.visible');
        this.buttonShareOffer().should('not.be.disabled');
    }

    checkPhotoGallery = () => {
        createStep('Check that photo gallery is visible and contains images');
        this.photoGallery().should('be.visible');
        this.photoGallery()
            .find('img')
            .should('have.length.greaterThan', 0);
        this.photoGallery().find('img').each(($img)=> {
            const src = $img.attr('src');
            expect(src).not.to.be.empty;
        });
    }

    checkDescription = () => {
        createStep('Check that description is visible and is not empty');
        this.panelDescription().should('be.visible');
        this.panelDescription()
            .invoke('text')
            .should('not.be.empty');
    }

    checkInfoDetails = () => {
        createStep('Check that info details is visible and contains required elements');
        this.panelDetailsInfo().should('be.visible');
        this.panelDetailsInfo().within(() => {
            listOfDetails.forEach((detail) => {
                cy.contains('p', detail).should('be.visible');
            })
        })
    }

    catchMapContent = () => {
        createStep('Catch GET request for map JSON data');
        return cy.intercept('GET', '**/data/v3.json').as('detailMapData');
    }

    checkMap = () => {
        createStep('Check that map  is visible');
        this.panelMap().should('be.visible');
        this.panelMap().find('canvas').should('be.visible');

        createStep('Check that map marker is visible');
        this.panelMap().find('[aria-label="Map marker"]').should('be.visible');

        createStep('Check that map JSON response contains expected data')
        cy.wait('@detailMapData').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.have.property('tiles');
            expect(response.body).to.have.property('name', 'OpenMapTiles');
            expect(response.body).to.have.property('id', 'openmaptiles');
            expect(response.body).to.have.property('format', 'pbf');
        });
    }




}

module.exports = new OfferDetailsPage()