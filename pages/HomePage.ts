import { Page, Locator } from "@playwright/test";
import { ElementUtil } from '../utils/ElementUtil';


export class HomePage {
  readonly page: Page;
  readonly myAccountDropdown: Locator;
  readonly logoutLink: Locator;
  readonly eleUtil: ElementUtil;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
    this.myAccountDropdown = page.locator('//span[text()="My Account"]');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.eleUtil.isVisible(this.logoutLink, 1);
  }

  async logout() {
    await this.eleUtil.click(this.myAccountDropdown);
    await this.eleUtil.click(this.logoutLink);
  }
}
