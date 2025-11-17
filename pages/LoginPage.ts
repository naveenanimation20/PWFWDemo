import { expect, Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from './RegisterPage';

    export class LoginPage {

    private page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly warningMsg: Locator;
    private readonly registerLink: Locator;
    private readonly eleUtil;    

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('input[value="Login"]');
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerLink = page.getByText('Register', { exact: true });
    }

    async gotoLoginPage() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    }

    async login(email: string, password: string) : Promise<HomePage>{
        await this.eleUtil.fill(this.emailInput, email);
        await this.eleUtil.fill(this.passwordInput, password);
        await this.eleUtil.click(this.loginButton);
        return new HomePage(this.page);
    }

    async verifyInvalidLoginMessage() {
        await expect(this.warningMsg).toBeVisible({ timeout: 10000 });
    }
        
    async navigateToRegisterPage(): Promise<RegisterPage> {
        await this.eleUtil.click(this.registerLink, { force: true }, 1);
        return new RegisterPage(this.page);
    }



    }