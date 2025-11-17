import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('verify login', { 
  tag: '@login',
  annotation: [
    { type: 'epic', description: 'Design Login Page' },
    { type: 'feature', description: 'Login Page Feature' },
    { type: 'story', description: 'User can login to open cart app' },
    { type: 'severity', description: 'critical' },
    {type: 'owner', description: 'Naveen'}
     ]
}, async ({ page }) => {

    let loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    let homePage = await loginPage.login('pwtest@nal.com', 'test123');
    await expect(page).toHaveTitle('My Account');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
});

test('verify invalid login @smkoe @login', async ({ page }) => {
   
    let loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    loginPage.login('pwtest123@nal.com', 'test12323232');
    await page.waitForTimeout(5000);

    loginPage.verifyInvalidLoginMessage();
});