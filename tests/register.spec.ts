import { test } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';


type RegData = {
    firstName: string;
    lastName: string;
    telephone: string;
    password: string;
    subscribeNewsletter: string;
};

let fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
let registrationData: RegData[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});

for (let user of registrationData) {
    test(`Registration test for ${user.firstName}`, async ({ page }) => {

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        let regPage: RegisterPage = await loginPage.navigateToRegisterPage();

        await regPage.registerUser(
            user.firstName,
            user.lastName,
            getRandomEmail(),
            user.telephone,
            user.password,
            user.subscribeNewsletter
        );

        await regPage.verifyAccountCreated();
    });
}

function getRandomEmail(): string {
    let randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}
