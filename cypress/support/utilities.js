export function checkUrl(url) {
    cy.url().should('include', url);
}


export function catchReq(method, url) {
    return cy.intercept(method, url);
}


export function checkReq(alias, statusCodes) {
    if (!Array.isArray(statusCodes)) {
        statusCodes = [statusCodes];
    }

    return cy.wait(`@${alias}`).then(({ response }) => {
        cy.log(`Alias: @${alias}, Status: ${response.statusCode}`);
        cy.log('Response Body:', response.body.data);
        expect(statusCodes).to.include(response.statusCode);
    });
}


export function createStep(step) {
    cy.step(step);
}


export function createRandomEmail(length) {
    const chars = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    let email = '';
    for (let i = 0; i < length; i++) {
        email += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return email + '@test.com';
}


export function createRandomName(length) {
    const chars = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let name = '';
    for (let i = 0; i < length; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
}


export function createRandomPassword(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '123456789';
    const specials = '+-*/!?#&@_;°€';

    if (length < 4) throw new Error('Password length must be at least 4 characters.');

    let password = [];

    password.push(uppers[Math.floor(Math.random() * uppers.length)]);
    password.push(numbers[Math.floor(Math.random() * numbers.length)]);
    password.push(specials[Math.floor(Math.random() * specials.length)]);

    const allChars = chars + uppers + numbers + specials;

    while (password.length < length) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}

export function generateRandomCzechPhoneNumber() {
    const prefixes = ['601', '602', '603', '604', '605', '606', '607', '608', '609',
        '720', '721', '722', '723', '724', '725', '726', '727', '728', '729',
        '730', '731', '732', '733', '734', '735', '736', '737', '738', '739',
        '770', '771', '772', '773', '774', '775', '776', '777', '778', '779',
        '790', '791', '792', '793', '794', '795', '796', '797', '798', '799',
        '910', '920'];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    const middle = Math.floor(100 + Math.random() * 900).toString();
    const end = Math.floor(100 + Math.random() * 900).toString();

    return `${prefix}${middle}${end}`;
}

