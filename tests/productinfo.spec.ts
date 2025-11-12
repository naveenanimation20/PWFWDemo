import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';



let search = [
    { searchkey: 'macbook', productname: 'MacBook Pro' , imagecount: 4},
    //  { searchkey: 'macbook', productname: 'MacBook Air', imagecount: 4 },
    //  { searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1', imagecount: 7 }
];

for (let product of search) {
    test(`verify Product Search ${product.productname}`, async ({ page }) => {
    let loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    let homePage: HomePage = await loginPage.login('pwtest@nal.com', 'test123');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname); 
     expect(await productInfoPage.getProductHeader(product.productname)).toBe(product.productname);    
});
}


for (let product of search) {
    test(`verify Product Images ${product.productname} : ${product.imagecount}`, async ({ page }) => {
    let loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    let homePage: HomePage = await loginPage.login('pwtest@nal.com', 'test123');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname); 
     expect(await productInfoPage.getProductImagesCount(product.productname)).toBe(product.imagecount);    
});
}

