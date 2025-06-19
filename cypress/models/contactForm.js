import {data} from '../support/data.js'
import {createStep} from "../support/utilities.js";

const contactFormData = data.ulovDomovData[0].contactForm
let inputMoveInDate = contactFormData.inputMoveInDate
let placeholderText = contactFormData.inputMessage
let buttonSendMessage = contactFormData.buttonSendMessage
let prefix = contactFormData.phonePrefix

class ContactForm {
    panelContactForm = () => cy.get('section[data-test="contactModal"]');
    inputEmail = () => cy.get('#email');
    inputPrefix = () => cy.get('[data-test="global.phoneInput.suggestPrefix"]');
    inputPhoneNumber = () => cy.get('#phoneNumber');
    inputFirstName = () => cy.get('#firstName');
    inputLastName = () => cy.get('#lastName');
    inputDateOfBirth = () => cy.get('#dateOfBirth');
    inputMoveInDate = () => cy.contains('span', inputMoveInDate).closest('div')
    inputMessage = () => cy.get(`[placeholder="${placeholderText}"]`);
    panelDatePicker = () => cy.get('[class="react-datepicker"]')
    optionTodayDate = () => cy.get('[aria-current="date"]');
    buttonSendMessage = () => cy.contains('button', buttonSendMessage)

    fillEmailAddress = (email) => {
        createStep('Fill the email input field');
        this.inputEmail().should('be.visible');
        this.inputEmail().clear();
        this.inputEmail().type(email);
    }

    fillPrefixNumber = () => {
        createStep('Select your phone number country code');
        this.inputPrefix().should('be.visible');
        this.inputPrefix().clear();
        this.inputPrefix().type(prefix);
    }

    fillPhoneNumber = (number) => {
        createStep('Fill the phone number input field');
        this.inputPhoneNumber().should('be.visible');
        this.inputPhoneNumber().clear();
        this.inputPhoneNumber().type(number);
    }

    fillFirstName = (name) => {
        createStep('Fill the first name input field');
        this.inputFirstName().should('be.visible');
        this.inputFirstName().clear();
        this.inputFirstName().type(name);
    }

    fillLastName = (name) => {
        createStep('Fill the last name input field');
        this.inputLastName().should('be.visible');
        this.inputLastName().clear();
        this.inputLastName().type(name);
    }

    fillDateOfBirth = (number) => {
        createStep('Fill the date of birth input field');
        this.inputDateOfBirth().should('be.visible');
        this.inputDateOfBirth().clear();
        this.inputDateOfBirth().type(number);
    }

    fillMoveInDate = () => {
        createStep('Select current date to move in')
        this.inputMoveInDate().should('be.visible');
        this.inputMoveInDate().clear();
        this.inputMoveInDate().click();
        this.panelDatePicker().should('be.visible');
        this.panelDatePicker().within(() => {
            this.optionTodayDate().should('be.visible');
            this.optionTodayDate().click();
        });
    }

    fillMessageText = (message) => {
        createStep('Fill the message input field');
        this.inputMessage().should('be.visible');
        this.inputMessage().clear();
        this.inputMessage().type(message);
    }

    sendMessage = () => {
        createStep('Click the send message button');
        this.buttonSendMessage().should('be.visible');
        this.buttonSendMessage().click();
    }
}

module.exports = new ContactForm();