const { test, expect } = require('@playwright/test');

test("Login with valid credentials", async ({page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[id=email]', 'peter@abv.bg');
    await page.fill('input[id=password]', '123456');
    await page.click('input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test("Is Logout button visible", async ({page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[id=email]', 'peter@abv.bg');
    await page.fill('input[id=password]', '123456');
    await page.click('input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    await page.waitForURL('http://localhost:3000/');

    const buttons = await page.$$('#guest .button');

    expect(buttons.length).toBe(2);
   
});