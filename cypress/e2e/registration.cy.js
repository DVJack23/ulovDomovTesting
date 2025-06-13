import {data} from '../support/data.js';
import Header from '../models/header.js';

describe('Basic tests for ulovdomov.cz', () => {
    Object.values(data.ulovDomovData).forEach((data) => {
       describe('Testing the functionality of user registration', ()=> {
           beforeEach(() => {
               Header.openHomepage();
           });
           it('TC-UDR01: Register new user with valid user details', () => {
               Header.openMainMenu();
               Header.registerNewUser(Header.generateEmail(10), Header.generatePassword(10), data.header.userTypeOne);
           })
       })
    })
})