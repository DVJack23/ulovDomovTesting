import {data} from '../support/data.js'
import {catchReq, checkReq, checkUrl, createStep} from "../support/utilities.js";

const homepageData = data.ulovDomovData[0].homepage;
const listingsData = data.ulovDomovData[0].listingsPage;
let buttonLoadMore = listingsData.buttonLoadMore;
let buttonSearchInMap = listingsData.buttonSearchInMap;
let buttonShowLeasesDetail = listingsData.buttonShowLeasesDetail;

class ListingsPage {
    searchScroller = () => cy.get('#search-scroller');
    mapOfLeases = () => cy.get('[data-test="mapOfLeases"]')
    mapCanvas = () => cy.get('canvas[aria-label="Map"]');
    scrollerTopSection = () => cy.get('[data-test="searchTopSection"]');
    scrollerHeadingSection = () => cy.get('h1.chakra-heading').parent('div');
    buttonFilter = () => cy.get('[data-test="editSearchButton"]');
    buttonFilterOption = (option) => this.scrollerHeadingSection().contains('p', option);
    buttonWatchdog = () => this.scrollerTopSection().get('[data-test="dogSetupButton"]').first();
    countOfOffers = () => cy.get('[data-test="countOfOffers"]');
    selectOrderBy = (text) => cy.contains('select', text);
    firstPreviewOfLeases = () => cy.get('[data-test="previewOfferLeases"]').first();
    secondPreviewOfLeases = () => cy.get('[data-test="previewOfferLeases"]').eq(1);
    headingLeasesPreview = () => cy.get('[data-test="headingOfLeasesPreview"]');
    anchorLeasesDetail = () => this.headingLeasesPreview().parent();
    spanLeasesPrice = () => this.anchorLeasesDetail().get('span');
    buttonsPreviewOfLease = () =>  cy.get('[data-test="actionButtonsOnPreview"]');
    buttonShowLeasesDetail = () => cy.contains('a', buttonShowLeasesDetail);
    buttonContact = () => cy.get('[data-test="contactButton"]');
    buttonSaveOffer = () => cy.get('[data-test="saveOfferFromPreview"]');
    buttonCreateWatchdog = () => cy.get('[data-test="watchDogPromoButtonVariable"]')
    buttonSearchInMap = () => this.mapOfLeases().contains('button', buttonSearchInMap);
    buttonLoadMore = () => this.searchScroller().contains('button', buttonLoadMore);
    buttonMapZoomIn = () => cy.get('button[title="Zoom in"]');
    buttonMapZoomOut = () => cy.get('button[aria-label="Zoom out"]');
    buttonMapReset = () => cy.get('button[aria-label="Reset bearing to north"]');
    saveFavouriteAlertModal = () => cy.get('[data-test="alertModal"]');

    openFilterPanel = () => {
        createStep('Open the filter panel window');
        this.buttonFilter().should('be.visible');
        this.buttonFilter().click();
    }


    checkSearchResult = (offerType, propertyType, address) => {
        createStep('Check search results page')
        address = address.toLowerCase();
        if (propertyType === homepageData.propertyTypeOne) {
            propertyType = listingsData.propertySearchOne
        } else {
            propertyType = listingsData.propertySearchTwo
        }
        if (offerType === 'Spolubydlení') {
            offerType = 'spolubydleni'
            checkUrl(`/${offerType}/${address}`);
        } else if (offerType === 'Pronájem') {
            offerType = 'pronajem'
            checkUrl(`/${offerType}/${propertyType}/${address}`);
        }
        else {
            offerType = offerType.toLowerCase();
            checkUrl(`/${offerType}/${propertyType}/${address}`);
        }
        this.countOfOffers().should('be.visible');
        this.firstPreviewOfLeases().should('be.visible');
    }

    basicElementsCheck = (selectOrderByText, buttonSearchInMapAreaText, buttonLoadMoreText) => {
        createStep('Check that scroller window is visible');
        this.searchScroller()
            .should('be.visible');

        createStep('Check that filter button is visible');
        this.buttonFilter()
            .should('be.visible');

        createStep('Check that create watchdog button is visible');
        this.buttonWatchdog()
            .should('be.visible');

        createStep('Check that scroller heading section is visible');
        this.scrollerHeadingSection()
            .should('be.visible');

        createStep('Check that count of offers is visible');
        this.countOfOffers()
            .should('be.visible');

        createStep('Check that filter select is visible');
        this.selectOrderBy(selectOrderByText)
            .should('be.visible');

        createStep('Check that first preview of Leases is visible');
        this.firstPreviewOfLeases()
            .should('be.visible');

        createStep('Check that preview of leases contains a heading');
        this.firstPreviewOfLeases().within(() => this.headingLeasesPreview()
            .should('be.visible'));

        createStep('Check that preview of leases contains href to leases detail');
        this.firstPreviewOfLeases().within(() => this.anchorLeasesDetail()
            .should('be.visible').should('have.attr', 'href'));

        createStep('Check that preview of leases contains price');
        this.spanLeasesPrice()
            .should('be.visible');

        createStep('Chect that preview of leases contains area with buttons');
        this.firstPreviewOfLeases().within(() => this.buttonsPreviewOfLease()
            .should('be.visible'));

        createStep('Check that preview of leases contains button show leases detail');
        this.firstPreviewOfLeases().within(() => this.buttonShowLeasesDetail()
            .should('be.visible'));

        createStep('Check that preview of leases contains the contact button');
        this.firstPreviewOfLeases().within(() => this.buttonContact()
            .should('be.visible'));

        createStep('Check that preview of leases contains the save offer button');
        this.buttonSaveOffer()
            .should('be.visible');

        createStep('Check that first preview of leases contains the create Watchdog button');
        this.firstPreviewOfLeases().within(() => this.buttonCreateWatchdog()
            .should('be.visible'));

        createStep('Check that second preview of Leases is visible');
        this.secondPreviewOfLeases()
            .should('be.visible');

        createStep('Check that load more leases button is visible');
        this.buttonLoadMore(buttonLoadMoreText)
            .scrollIntoView()
            .should('be.visible');

        createStep('Check that map of leases od visible');
        this.mapOfLeases()
            .should('be.visible');

        createStep('Check that map canvas is visible');
        this.mapCanvas()
            .should('be.visible');

        createStep('Check that map contains the search in this area button');
        this.buttonSearchInMap(buttonSearchInMapAreaText)
            .should('be.visible');

        createStep('Check that map contains the zoom in button');
        this.buttonMapZoomIn()
            .should('be.visible');

        createStep('Check that map contains the zoom out button');
        this.buttonMapZoomOut()
            .should('be.visible');

        createStep('Check that map contains the reset map button');
        this.buttonMapReset()
            .should('be.visible');
    }

    changeLeasesOrder = (currentValue, newValue, newValueUrl) => {
        createStep('Check that order of leases select button is visible');
        this.selectOrderBy(currentValue)
            .should('be.visible');

        createStep('Prepare intercepts for network requests');
        catchReq('POST', `**sorting=${newValueUrl}`)
            .as('orderValue');

        createStep('Select order of leases');
        this.selectOrderBy(currentValue)
            .select(newValue);

        createStep('Check that network requests were successful ');
        checkReq('orderValue', 200);
    }


    loadMoreLeases = (buttonText) => {
        createStep('Scroll the load more leases button into view');
        this.buttonLoadMore(buttonText)
            .scrollIntoView();

        createStep('Check that load more leases button is visible');
        this.buttonLoadMore(buttonText)
            .should('be.visible');

        createStep('Prepare intercepts for network requests');
        catchReq('POST', '**/offer/find?page*')
            .as('nextPageData');

        createStep('Click the load more lease button');
        this.buttonLoadMore(buttonText)
            .click();

        createStep('Check that network requests were successful');
        checkReq('nextPageData', 200);
    }

    contactFirstLease = () => {
        createStep('Check that contact lease button is visible');
        this.firstPreviewOfLeases()
            .should('be.visible');

        createStep('Prepare intercepts for network requests');
        catchReq('GET', '**/offer/contact-info/*')
            .as('contactInfo');

        createStep('Click the contact button');
        this.firstPreviewOfLeases().within(() => this.buttonContact()
            .click());

        createStep('Check that network requests were successful');
        checkReq('contactInfo', 200);
    }


    showFirstLeaseDetail = (buttonShowLeasesDetailText) => {
        createStep('Check that show lease button is visible');
        this.firstPreviewOfLeases().within(() => this.buttonShowLeasesDetail()
            .should('be.visible'));

        createStep('Get the first lease offer id number');

        let leaseId = this.firstPreviewOfLeases().invoke('attr','id').then((val) => {
            leaseId = val.split('.')[1];
        });

        createStep('Click the show lease button');
        this.firstPreviewOfLeases().within(() => this.buttonShowLeasesDetail(buttonShowLeasesDetailText)
            .click());

        createStep('Check that leases detail page was opened');
        cy.then(() => {
            checkUrl(leaseId);
        });
    }


    saveFirstLeaseAsFavourite = () => {
        createStep('Check that save favourite lease button is visible');
        this.firstPreviewOfLeases().within(() => this.buttonSaveOffer()
            .should('be.visible'));

        createStep('Prepare intercepts for network requests');
        catchReq('POST', '**/fe-api/favorite/add')
            .as('addFavourite');

        createStep('Click the add favourite lease button');
        this.firstPreviewOfLeases().within(() => this.buttonSaveOffer().click());

        createStep('Check that alert pop up is visible');
        this.saveFavouriteAlertModal().should('be.visible');

        createStep('Check that network requests were successful');
        checkReq('addFavourite', 200);
    }

    mapZoomIn = () => {
        createStep('Check that map is loaded');
        this.mapCanvas()
            .should('be.visible');

        createStep('Check that map zoom in button is visible');
        this.buttonMapZoomIn()
            .should('be.visible');

        createStep('Click the map zoom in button');
        this.buttonMapZoomIn()
            .click();
    }

    mapZoomOut = () => {
        createStep('Check that map is loaded');
        this.mapCanvas()
            .should('be.visible');

        createStep('Check that map zoom out button is visible');
        this.buttonMapZoomOut()
            .should('be.visible');

        createStep('Click the map zoom out button');
        this.buttonMapZoomOut()
            .click();
    }

    mapReset = () => {
        createStep('Check that map is loaded');
        this.mapCanvas().should('be.visible');

        createStep('Check that reset to north button is visible');
        this.buttonMapReset().should('be.visible');

        createStep('Simulate right click drag to rotate map');
        this.mapCanvas().trigger('mousedown', {
            button: 2,
            buttons: 2,
            clientX: 1000,
            clientY: 400,
            force: true
        });
        const steps = 10;
        for (let i = 1; i <= steps; i++) {
            const x = 1000 - i * 90;
            const y = 400 + i * 40;
            this.mapCanvas().trigger('mousemove', {
                buttons: 2,
                clientX: x,
                clientY: y,
                force: true
            });
            cy.wait(20);
        }
        this.mapCanvas().trigger('mouseup', {
            button: 2,
            buttons: 0,
            clientX: 100,
            clientY: 800,
            force: true
        });

        createStep('Click the reset map to north button');
        this.buttonMapReset().click();
    }

    catchMapContent = () => {
        createStep('Catch GET request for map JSON data');
        return cy.intercept('GET', '**/_next/data/**/*.json*').as('mapData');
    }


    checkMapContent = (location) => {
        createStep('Check that map JSON response contains expected data');
        cy.wait('@mapData').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.have.property('pageProps');
            expect(response.body.pageProps).to.have.property('count');
            expect(response.body.pageProps.count).to.be.greaterThan(0);
            expect(response.body.pageProps.location).to.eq(location);
        });
    }
}

module.exports = new ListingsPage();