import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';



let search = [
    { searchkey: 'macbook', productname: 'MacBook Pro' , imagecount: 4},
     { searchkey: 'macbook', productname: 'MacBook Air', imagecount: 4 },
     { searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1', imagecount: 7 }
];

for (let product of search) {
    test(`verify Product Search ${product.productname}`,{tag: ['@product', '@regression' , '@sanity']}, async ({ page }) => {
    let loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    let homePage: HomePage = await loginPage.login('pwtest@nal.com', 'test123');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname); 
     expect(await productInfoPage.getProductHeader()).toBe(product.productname);    
});
}


for (let product of search) {
    test(`verify Product Images ${product.productname} : ${product.imagecount}`, {tag: ['@product', '@regression' , '@sanity']}, async ({ page }) => {
    let loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    let homePage: HomePage = await loginPage.login('pwtest@nal.com', 'test123');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname); 
     expect(await productInfoPage.getProductImagesCount(product.productname)).toBe(product.imagecount);    
    });
    
}



test(`verify Product Meta data`, {tag: ['@product', '@regression']}, async ({ page }) => {
    let loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    let homePage: HomePage = await loginPage.login('pwtest@nal.com', 'test123');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro'); 
    let productDetails = await productInfoPage.getProductDetails();
    expect.soft(productDetails.get('header')).toBe('MacBook Pro');
    expect.soft(productDetails.get('Brand')).toBe('Apple');
    expect.soft(productDetails.get('Product Code')).toBe('Product 18');
    expect.soft(productDetails.get('Reward Points')).toBe('800');
    expect.soft(productDetails.get('Availability')).toBe('Out Of Stock');

});
    

test(`verify Product Pricing data`, {tag: ['@product', '@regression']}, async ({ page }) => {
    let loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    let homePage: HomePage = await loginPage.login('pwtest@nal.com', 'test123');
    expect.soft(await homePage.isUserLoggedIn()).toBeTruthy();
    let resultsPage: ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro'); 
    let productDetails = await productInfoPage.getProductDetails();
    expect.soft(productDetails.get('header')).toBe('MacBook Pro');
    expect.soft(productDetails.get('Brand')).toBe('Apple');
    expect.soft(productDetails.get('price')).toBe('$2,000.00');
    expect.soft(productDetails.get('extaxprice')).toBe('$2,000.00');

    });



