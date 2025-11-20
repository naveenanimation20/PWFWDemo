// fixtures/dataFixtures.ts
import { test as base, expect } from '@playwright/test';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

// Your schema/type exactly as you wrote
export type RegData = {
  firstName: string;
  lastName: string;
  telephone: string;
  password: string;
  subscribeNewsletter: string;
};

type csvFixture = {
    regData: RegData[];
};
export const dataTest = base.extend<csvFixture>({
  regData: async ({}, use) => {
    const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');

     const registrationData: RegData[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    await use(registrationData);
  }
});


export { expect };
