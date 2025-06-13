import {data} from '../support/data.js';
import Header from '../models/header.js';

describe('Basic tests for ulovdomoc.cz', ()=> {
    Object.values(data.ulovDomovData).forEach((data) => {
        describe('Testing the functionality of user Login', ()=> {
            beforeEach(()=> {
                Header.openHomepage();
            });
            it('TC-UDL01 - Login user to the application', ()=> {
                Header.openMainMenu();
                Header.loginUser(data.userData.email, data.userData.password, data.header.userTypeOne);
            })
        })
    })
})