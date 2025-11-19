import { ResultsPage } from '../pages/ResultsPage';
import { test, expect } from '../fixtures/baseFixtures';



let search = [
    { searchkey: 'macbook', searchcount: 3 },
    { searchkey: 'samsung', searchcount: 2 }
];

for (let product of search) {
    test(`verify search ${product.searchkey}`, async ({ homePage }) => {

    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    await homePage.page.waitForTimeout(3000);
    const resultsCount = await resultsPage.getSearchResultsCount();
    console.log(`Search Results Count : ${resultsCount}`);
    expect(resultsCount).toBe(product.searchcount);

});
}


