import {data} from '../support/data.js'
import {checkUrl, createStep} from "../support/utilities";
import ListingsPage from '../models/listingsPage.js';

const filterData = data.ulovDomovData[0].filterPanel;
let headerFilter = filterData.headerFilter;
let buttonDeleteFilters = filterData.buttonDeleteFilters;

class FilterPanel {
    boxFilterPanel = () => this.headerFilter().parent('div');
    headerFilter = () => cy.contains('h3', headerFilter).closest('header');
    footerFilter = () => this.boxFilterPanel().find('footer');
    buttonDeleteFilters = () => cy.contains('button', buttonDeleteFilters);
    buttonLayoutType = (layoutType) => this.boxFilterPanel().contains('p', layoutType);
    buttonConfirmFilter = () => this.footerFilter().contains(/^Zobrazit \d+ pronájmů$/);
    inputPriceMin = () => cy.get('#priceMin');
    inputPriceMax = () => cy.get('#priceMax');
    inputAreaMin = () => cy.get('#areaMin');
    inputAreaMax = () => cy.get('#areaMax');

    setFilterForFlatRents(layoutType, minPrice, maxPrice, minArea, maxArea) {
        createStep('Check that filter panel window is opened');
        this.headerFilter().should('be.visible');
        this.boxFilterPanel().should('be.visible');
        this.footerFilter().should('be.visible');
        this.selectLayoutType(layoutType);
        this.selectMaxPrice(maxPrice);
        this.selectMinPrice(minPrice);
        this.selectMaxArea(maxArea);
        this.selectMinArea(minArea);
        this.confirmFilter();
        createStep('Check that url contains filter options');
        let layout = layoutType.replace('+', '-');
        checkUrl(`/${layout}`);
        checkUrl(`od=${minArea}`);
        checkUrl(`do=${maxArea}`);
        checkUrl(`cena-od=${minPrice.replaceAll(' ', '')}`);
        checkUrl(`cena-do=${maxPrice.replaceAll(' ', '')}`);
        createStep('Check that listings header contains filter options');
        ListingsPage.buttonFilterOption(layoutType).should('be.visible');
        minArea = new RegExp(`^od ${minArea} ㎡$`);
        ListingsPage.buttonFilterOption(minArea).should('be.visible');
        maxArea = new RegExp(`^do ${maxArea} ㎡$`);
        ListingsPage.buttonFilterOption(maxArea).should('be.visible');
        minPrice = new RegExp(`^od ${minPrice} kč$`);
        ListingsPage.buttonFilterOption(minPrice).should('be.visible');
        maxPrice = new RegExp(`^do ${maxPrice} kč$`);
        ListingsPage.buttonFilterOption(maxPrice).should('be.visible');
    }

    selectLayoutType(layoutType) {
        createStep('Select the layout type');
        this.buttonLayoutType(layoutType).should('be.visible');
        this.buttonLayoutType(layoutType).click();
    }

    selectMaxPrice(maxPrice) {
        createStep('Fill the max price input field');
        this.inputPriceMax().should('be.visible');
        this.inputPriceMax().clear();
        this.inputPriceMax().type(maxPrice);
    }

    selectMinPrice(minPrice) {
        createStep('Fill the min price input field')
        this.inputPriceMin().should('be.visible');
        this.inputPriceMin().clear();
        this.inputPriceMin().type(minPrice);
    }

    selectMaxArea(maxArea) {
        createStep('Fill the max area input field');
        this.inputAreaMax().should('be.visible');
        this.inputAreaMax().clear();
        this.inputAreaMax().type(maxArea);
    }

    selectMinArea(minArea) {
        createStep('Fill the min area input field');
        this.inputAreaMin().should('be.visible');
        this.inputAreaMin().clear();
        this.inputAreaMin().type(minArea);
    }

    confirmFilter() {
        createStep('Click the show offers button')
        this.buttonConfirmFilter().should('be.visible');
        this.buttonConfirmFilter().click();
    }
}

module.exports = new FilterPanel();