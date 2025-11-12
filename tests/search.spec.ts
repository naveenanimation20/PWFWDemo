import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';


let search = [
    { searchkey: 'macbook', searchcount: 3 },
    { searchkey: 'samsung', searchcount: 2 }
];

for (let product of search) {
    test(`verify search ${product.searchkey}`, async ({ page }) => {
    let loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    let homePage: HomePage = await loginPage.login('pwtest@nal.com', 'test123');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    await page.waitForTimeout(3000);
    const resultsCount = await resultsPage.getSearchResultsCount();
    console.log(`Search Results Count : ${resultsCount}`);
    expect(resultsCount).toBe(product.searchcount);

});
}


