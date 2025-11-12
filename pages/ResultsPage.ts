import { Page, Locator } from "@playwright/test";
import { ElementUtil } from '../utils/ElementUtil';
import { ProductInfoPage } from '../pages/ProductInfoPage';


export class ResultsPage {
  readonly page: Page;
    readonly eleUtil: ElementUtil;
    readonly results: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.results = page.locator('.product-thumb');
        
    } 

    async getSearchResultsCount(): Promise<number> {
        return await this.results.count();
    }


    async selectProduct(productName: string): Promise<ProductInfoPage> {
      console.log('================'+ productName+"==========");
      await this.eleUtil.click(this.page.getByRole('link', { name: `${productName}` }));
      return new ProductInfoPage(this.page);
    }



      
  }