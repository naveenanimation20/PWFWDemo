import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

  
test('verify login', async ({ page }) => {
   
    let loginPage = new LoginPage(page);
    loginPage.gotoLoginPage();
    let homePage = await loginPage.login('pwtest@nal.com', 'test123');
    await expect(page).toHaveTitle('My Account');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
});

test('verify invalid login', async ({ page }) => {
   
    let loginPage = new LoginPage(page);
    loginPage.gotoLoginPage();
    loginPage.login('pwtest@nal.com', 'test12323232');
    await page.waitForTimeout(5000);

    loginPage.verifyInvalidLoginMessage();
});