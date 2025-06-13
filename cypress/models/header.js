import {data} from '../support/data.js';
import {createRandomEmail, createRandomPassword, createStep} from "../support/utilities.js";

const userData = data.ulovDomovData[0].userData;
let userEmail = userData.email;
let userPassword = userData.password;

const  userProfileData = data.ulovDomovData[0].userProfile;
let buttonDeclineConsent = userProfileData.buttonDeclineConsent;

const headerData = data.ulovDomovData[0].header;
let buttonAddOffer = headerData.buttonAddOffer;
let buttonRegister = headerData.buttonRegister;
let buttonConfirm = headerData.buttonConfirm;
let buttonCreateAccount = headerData.buttonCreateAccount;
let buttonMyProfile = headerData.buttonMyProfile;
let buttonLogin = headerData.buttonLogin;
let buttonConfirmLogin = headerData.buttonConfirmLogin;

class Header {
    navbar = () => cy.get('#nav-main');
    logo = () => cy.get('a[aria-label="Domovská stránka"]');
    buttonAddOffer = () => cy.contains('a', buttonAddOffer);
    buttonMainMenu = () => cy.get('button[data-test="navbar.hamburgerButton"]');
    buttonRegister = () => cy.contains('span', buttonRegister);
    buttonConfirm = () => cy.contains('button', buttonConfirm);
    buttonUserType = (userType) => cy.contains('p', userType);
    buttonCreateAccount = () => cy.contains('button', buttonCreateAccount);
    buttonMyProfile = () => cy.contains('a', buttonMyProfile);
    buttonDeclineConsent = () => cy.contains('button', buttonDeclineConsent);
    buttonLogin = () => cy.contains('button', buttonLogin);
    buttonConfirmLogin = () => cy.contains('button', buttonConfirmLogin);
    textUserEmail = (userEmail) => cy.contains('p', userEmail);
    mainMenu = () => cy.get('#sidebar');
    mainMenuSection = (sectionName) => cy.contains('[data-test="sectionOfContent"]', sectionName);
    mainMenuSectionContent = (contentName) => cy.contains('a', contentName);
    windowLogin = () => cy.get('section[data-test="loginModal"]');
    windowConsentModal = () => cy.get('section[data-test="consentModal"]');
    inputEmail = () => cy.get('#email');
    inputPassword = () => cy.get('#password');

    openHomepage = () => {
        cy.visit(data.ulovDomovData[0].stageUrl)
    }

    openMainMenu = () => {
        createStep('Click the main menu icon');
        this.buttonMainMenu().should('be.visible');
        this.buttonMainMenu().click();
        this.mainMenu().should('be.visible');
    }

    closeMainMenu = () => {
        let menuOpened = this.mainMenu().should('be.visible');
        if (menuOpened) {
            createStep('Click the main menu icon');
            this.buttonMainMenu().should('be.visible');
            this.buttonMainMenu().click();
        }
        this.mainMenu().should('not.be.visible');
    }

    openUserProfile = () => {
        createStep('Click the My profile button');
        this.buttonMyProfile().should('be.visible');
        this.buttonMyProfile().click();
    }

    clickRegistrationButton = () => {
        createStep('Click the register new user button');
        this.buttonRegister().should('be.visible');
        this.buttonRegister().click();
        this.windowLogin().should('be.visible');
    }

    clickLoginButton = () => {
        createStep('Click the login button');
        this.buttonLogin().should('be.visible');
        this.buttonLogin().click();
        this.windowLogin().should('be.visible');
    }

    fillEmailWindow = (email) => {
        createStep('Fill the email input field');
        this.inputEmail().should('be.visible');
        this.inputEmail().clear();
        this.inputEmail().type(email);
        createStep('Confirm email')
        this.buttonConfirm().should('be.visible');
        this.buttonConfirm().click();
    }

    fillPasswordAndUserType = (password, userType) => {
        createStep('Fill the password input field');
        this.inputPassword().should('be.visible');
        this.inputPassword().clear();
        this.inputPassword().type(password);
        createStep('Select user type');
        this.buttonUserType(userType).should('be.visible');
        this.buttonUserType(userType).click();
    }

    registerNewUser = (email, password, userType) => {
        this.clickRegistrationButton();
        this.fillEmailWindow(email);
        this.fillPasswordAndUserType(password, userType);
        createStep('Confirm registration and create new user');
        this.buttonCreateAccount().should('be.visible');
        this.buttonCreateAccount().should('not.be.disabled');
        this.buttonCreateAccount().click();
        this.confirmLogin(email);
    }

    loginUser = (email, password, userType) => {
        this.clickLoginButton();
        this.fillEmailWindow(email);
        this.fillPasswordAndUserType(password, userType);
        createStep('Click the login button');
        this.buttonConfirmLogin().should('be.visible');
        this.buttonConfirmLogin().should('not.be.disabled');
        this.buttonConfirmLogin().click();
        this.confirmLogin(email);
    }

    generateEmail = (length) => {
        createStep('Generate new email address');
        userEmail = createRandomEmail(length);
        return userEmail;
    }

    generatePassword = (length) => {
        createStep('Generate new password address');
        userPassword = createRandomPassword(length);
        return userPassword;
    }

    confirmLogin = (userEmail) => {
        this.openMainMenu();
        this.openUserProfile();
        let consentModalOpened = this.windowConsentModal().should('be.visible');
        if (consentModalOpened) {
            createStep('Decline consent modal');
            this.buttonDeclineConsent().should('be.visible');
            this.buttonDeclineConsent().click();
        }
        this.textUserEmail(userEmail).should('be.visible');
    }
}



module.exports = new Header();