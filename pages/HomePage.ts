import { Page, Locator } from "@playwright/test";
import { ElementUtil } from '../utils/ElementUtil';
import { ResultsPage } from '../pages/ResultsPage';


export class HomePage {
  readonly page: Page;
  readonly myAccountDropdown: Locator;
  readonly logoutLink: Locator;
  readonly search: Locator;
  readonly searchIcon: Locator;
  readonly eleUtil: ElementUtil;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.myAccountDropdown = page.locator('//span[text()="My Account"]');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.search = page.getByRole('textbox', { name: 'Search' });
    this.searchIcon = page.locator('.btn.btn-default.btn-lg');

      
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.eleUtil.isVisible(this.logoutLink, 1);
  }

  async logout() {
    await this.eleUtil.click(this.myAccountDropdown);
    await this.eleUtil.click(this.logoutLink);
  }


  async doSearch(searchKey: string): Promise<ResultsPage> {
    await this.eleUtil.fill(this.search, searchKey);
    await this.eleUtil.click(this.searchIcon);
    return new ResultsPage(this.page);

  }



}
