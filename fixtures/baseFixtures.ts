import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

type RegData = {
  firstName: string;
  lastName: string;
  telephone: string;
  password: string;
  subscribeNewsletter: string;
};

type MyFixtures = {
  homePage: HomePage;
  regData: RegData[];
};

export const test = base.extend<MyFixtures>({

  homePage: async ({ page, baseURL }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage(baseURL);

    const username = testInfo.project.metadata.appUsername;
    const password = testInfo.project.metadata.appPassword;

    const homePage = await loginPage.login(username, password);
    expect(await homePage.isUserLoggedIn()).toBeTruthy();

    await use(homePage);
  },

  // regData: async ({}, use) => {
  //   const file = fs.readFileSync('./data/register.csv', 'utf-8');
  //   const regData: RegData[] = parse(file, {
  //     columns: true,
  //     skip_empty_lines: true
  //   });

  //   await use(regData);
  // }

});

export { expect };
