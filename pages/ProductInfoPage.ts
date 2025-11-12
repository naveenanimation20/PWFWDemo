import { Page, Locator } from "@playwright/test";
import { ElementUtil } from '../utils/ElementUtil';


export class ProductInfoPage {
    readonly page: Page;
    readonly eleUtil: ElementUtil;
    readonly imageCount: string;

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page, 5000);   
        this.imageCount = 'div#content img';
    } 

    async getProductHeader(productName: string): Promise<string | null> {
        const header = await this.eleUtil.getInnerText(this.page.getByRole('heading', { name: `${productName}` }));
        console.log(`product header : ${header}`);
        return header.trim();
    }

    async getProductImagesCount(productName: string): Promise<number> {
        const imagesCount = await this.eleUtil.getAllElementsCount(this.imageCount);
        console.log(`Total product images : ${imagesCount}`);
        return imagesCount;
    }

      
  }