const { Builder } = require("selenium-webdriver");
const LoginAction = require("./actions/login.action");

describe("SauceDemo Login Test", function () {
  let driver;
  let loginAction;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    loginAction = new LoginAction(driver);
    await loginAction.openPage("https://www.saucedemo.com");
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("POSITIVE - valid user & pass", async () => {
    await loginAction.inputUsername("standard_user");
    await loginAction.inputPassword("secret_sauce");
    await loginAction.clickLogin();
    await loginAction.assertLoginSuccess();
  });

  it("NEGATIVE - invalid user", async () => {
    await loginAction.inputUsername("wrong_user");
    await loginAction.inputPassword("secret_sauce");
    await loginAction.clickLogin();
    await loginAction.assertLoginFailed(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  it("NEGATIVE - wrong password", async () => {
    await loginAction.inputUsername("standard_user");
    await loginAction.inputPassword("wrong_pass");
    await loginAction.clickLogin();
    await loginAction.assertLoginFailed(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  it("NEGATIVE - login locked_out_user", async () => {
    await loginAction.inputUsername("locked_out_user");
    await loginAction.inputPassword("secret_sauce");
    await loginAction.clickLogin();
    await loginAction.assertLoginFailed(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
