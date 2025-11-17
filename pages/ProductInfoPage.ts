import { Page, Locator } from "@playwright/test";
import { ElementUtil } from '../utils/ElementUtil';


export class ProductInfoPage {
    readonly page: Page;
    readonly eleUtil: ElementUtil;
    readonly header: Locator;
    readonly imageCount: Locator;
    readonly productMetaData: Locator;
    readonly productPriceData: Locator;

    readonly  productMap = new Map<string, string | null>();


    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page, 5000);   
        this.header = page.locator('h1');
        this.imageCount = page.locator(`div#content img`);
        this.productMetaData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[1]//li`);
        this.productPriceData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[2]//li`);
    } 

    async getProductHeader(): Promise<string | null> {
        //const header = await this.eleUtil.getInnerText(this.page.getByRole('heading', { name: `${productName}` }));
        const header = await this.eleUtil.getInnerText(this.header);
        console.log(`product header : ${header}`);
        return header.trim();
    }

    async getProductImagesCount(productName: string): Promise<number> {
        //await this.page.waitForTimeout(5000);
        await this.eleUtil.waitForElementVisible(this.imageCount);
        const imagesCount = await this.imageCount.count();
        console.log(`Total product images : ${imagesCount}`);
        return imagesCount;
    }

    async getProductDetails(): Promise<Map<string, string | null>> {
        this.productMap.set('header', await this.getProductHeader());
        await this.getProductMetaData();
        await this.getProductPricingData();

        console.log(`full product details for product:  ${await this.getProductHeader()} `);
        await this.printProductDetails();
        return this.productMap;


    }

   private async getProductMetaData(): Promise<void> {
        for (let meta of await this.productMetaData.allInnerTexts()) {
            let metaData: string[] = meta.split(':');
            let metaKey = metaData[0].trim();
            let metaValue = metaData[1].trim();

            this.productMap.set(metaKey, metaValue);
        }
    }

    private async getProductPricingData(): Promise<void> {
        let productPricing: string[] = await this.productPriceData.allInnerTexts();
        const productPrice = productPricing[0].trim();
        const productExPrice = productPricing[1].split(':')[1].trim();
        this.productMap.set('price', productPrice);
        this.productMap.set('extaxprice', productExPrice);

    }

    private async printProductDetails(): Promise<void> {
        for (const [key, value] of this.productMap) {
            console.log(key, value);
        }
    }

      
  }