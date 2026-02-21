const LoginPage = require("../pageObjects/login.page");
const { until } = require("selenium-webdriver");
const assert = require("assert");

class LoginAction {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    await this.driver.get(url);
  }

  async inputUsername(username) {
    await this.driver.findElement(LoginPage.usernameInput).sendKeys(username);
  }

  async inputPassword(password) {
    await this.driver.findElement(LoginPage.passwordInput).sendKeys(password);
  }

  async clickLogin() {
    await this.driver.findElement(LoginPage.loginButton).click();
  }

  async assertLoginSuccess() {
    await this.driver.wait(until.elementLocated(LoginPage.pageTitle), 5000);
    const title = await this.driver.findElement(LoginPage.pageTitle).getText();
    assert.strictEqual(title, "Products");
  }

  async assertLoginFailed(expectedErrorMessage) {
    await this.driver.wait(until.elementLocated(LoginPage.errorMessage), 5000);
    const actualErrorMessage = await this.driver
      .findElement(LoginPage.errorMessage)
      .getText();
    assert.strictEqual(actualErrorMessage, expectedErrorMessage);
  }
}

module.exports = LoginAction;
