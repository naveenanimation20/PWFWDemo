// import { expect, test } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { RegisterPage } from '../pages/RegisterPage';
// import fs from 'fs';
// import { parse } from 'csv-parse/sync';

// //schema/type of reg data fields
// type RegData = {
//     firstName: string,
//     lastName: string,
//     telephone: string,
//     password: string,
//     subscribeNewsletter: string
// }

// let fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
// let registerationData:RegData[]  = parse(fileContent, {
//     columns: true,
//     skip_empty_lines: true
// });

// for (let user of registerationData) {
//     test(`verify user is able to register ${user.firstName}`, async ({ page, baseURL }) => {
    
//         let loginPage = new LoginPage(page);
//         await loginPage.goToLoginPage(baseURL);
//         let registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
//         let isUserRegistered: boolean = await registerPage.registerUser(
//             user.firstName,
//             user.lastName,
//             getRandomEmail(),
//             user.telephone,
//             user.password, 
//             user.subscribeNewsletter);
//         expect(isUserRegistered).toBeTruthy();

//     })
// }

// function getRandomEmail() : string{
//     let randomValue = Math.random().toString(36).substring(2, 9);
//     return `auto_${randomValue}@nal.com`;
// }

import { dataTest as test, expect } from '../fixtures/dataFixtures';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

function getRandomEmail(): string {
  return `auto_${Math.random().toString(36).substring(2, 9)}@nal.com`;
}

test.describe('Registration Tests', () => {

  test('Register all users from CSV', async ({ regData, page, baseURL }) => {

    for (const user of regData) {
      const loginPage = new LoginPage(page);
      await loginPage.goToLoginPage(baseURL);

      const registerPage = await loginPage.navigateToRegisterPage();

      const isRegistered = await registerPage.registerUser(
        user.firstName,
        user.lastName,
        getRandomEmail(),
        user.telephone,
        user.password,
        user.subscribeNewsletter
      );

      expect(isRegistered).toBeTruthy();
    }

  });

});


