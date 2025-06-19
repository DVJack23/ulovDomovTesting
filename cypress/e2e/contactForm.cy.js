import {data} from '../support/data.js';
import Header from '../models/header.js';
import Homepage from "../models/homepage.js";
import ListingsPage from "../models/listingsPage.js"
import ContactForm from "../models/contactForm.js"
import {createRandomEmail, generateRandomCzechPhoneNumber, createRandomName} from "../support/utilities.js";


describe('Basic tests for ulovDomov.cz', () => {
    Object.values(data.ulovDomovData).forEach((data) => {
        describe('Testing the contact form panel', ()=> {
            beforeEach(()=> {
                Header.openHomepage();
            });
            it('TC-UDCF01 - unregistered user sends contact message', ()=> {
                Homepage.completeSearch(data.homepage.offerTypeOne, data.homepage.propertyTypeOne, data.homepage.basicAddress);
                ListingsPage.contactFirstLease();


                ContactForm.panelContactForm().should('be.visible');
                ContactForm.fillEmailAddress(createRandomEmail(10));
                ContactForm.fillPrefixNumber();
                ContactForm.fillPhoneNumber(generateRandomCzechPhoneNumber());
                ContactForm.fillFirstName(createRandomName(10));
                ContactForm.fillLastName(createRandomName(10));
                ContactForm.fillDateOfBirth(data.userData.birthyear);
                ContactForm.fillMoveInDate();
                ContactForm.fillMessageText(createRandomName(20));
                ContactForm.sendMessage();
            })
        })
    })
})