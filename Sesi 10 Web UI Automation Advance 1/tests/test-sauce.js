const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const { expect } = require("chai");

describe("Google Search Test", function () {
  let driver;

  beforeEach(async () => {
    const options = new chrome.Options();
    options.setUserPreferences({
      credentials_enable_service: false,
      "profile.password_manager_enabled": false,
      // 2. Specifically disables the "Password breached" popup (Chrome 139+)
      "profile.password_manager_leak_detection": false,
    });

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.get("https://www.saucedemo.com");
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Visit SauceDemo, login, and sort product name by Z to A", async () => {
    const inputUsername = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="user-name"]')),
      5000,
    );
    await driver.wait(
      until.elementIsVisible(inputUsername),
      3000,
      "Textbox Username tampil",
    );

    const inputPassword = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="password"]')),
      5000,
    );

    const btnLogin = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="login-button"]')),
      5000,
    );

    await inputUsername.sendKeys("standard_user");
    await inputPassword.sendKeys("secret_sauce");
    await btnLogin.click();

    const listInventory = await driver.wait(
      until.elementLocated(By.xpath('//*[@data-test="inventory-list"]')),
      5000,
    );
    await driver.wait(
      until.elementIsVisible(listInventory),
      5000,
      "Daftar produk harus tampil",
    );

    const inventoryChildren = await listInventory.findElements(By.xpath("./*"));

    // product items should exist
    expect(inventoryChildren.length).to.be.above(0);

    const defaultItemNames = [];
    const itemNames = await listInventory.findElements(
      By.xpath('.//*[@data-test="inventory-item-name"]'),
    );

    for (const name of itemNames) {
      defaultItemNames.push(await name.getText());
    }

    const dropdownSort = await driver.wait(
      until.elementLocated(
        By.xpath('//select[@data-test="product-sort-container"]'),
      ),
      5000,
    );

    await dropdownSort.click();
    const optionNameZtoA = await driver.wait(
      until.elementLocated(By.xpath('//option[text()="Name (Z to A)"]')),
      2500,
      "Opsi Sort Name Z to A harus ada",
    );

    await optionNameZtoA.click();

    await driver.sleep(1700);

    const sortedFirstItem = await listInventory.findElement(
      By.xpath('.//*[@data-test="inventory-item-name"]'),
    );

    const sortedFirstItemName = await sortedFirstItem.getText();

    console.log(
      `item1 (a-z): "${defaultItemNames[0]}" vs item1 (z-a): "${sortedFirstItemName}"`,
    );
    assert.notStrictEqual(defaultItemNames[0], sortedFirstItemName);
  });
});
