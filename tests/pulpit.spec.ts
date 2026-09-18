import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');

    const loginPage = new LoginPage(page);

    await expect(loginPage.loginInput).toBeVisible({
      timeout: 30_000,
    });

    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);

    await expect(pulpitPage.moneyValueText).toBeVisible({
      timeout: 30_000,
    });
  });

  test('quick payment with correct data @integration @pulpit', async () => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy12345';

    // Act
    await pulpitPage.executeQuickPayment(
      receiverId,
      transferAmount,
      transferTitle
    );

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test('successful mobile top-up @integration @pulpit', async () => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    await pulpitPage.executeMobileTopUp(
      topUpReceiver,
      topUpAmount
    );

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      expectedMessage
    );
  });

  test(
    'correct balance after successful mobile top-up @integration @pulpit',
    async () => {
      // Arrange
      const topUpReceiver = '500 xxx xxx';
      const topUpAmount = '50';

      await expect(pulpitPage.moneyValueText).toBeVisible({
        timeout: 30_000,
      });

      const initialBalanceText =
        await pulpitPage.moneyValueText.innerText();

      const initialBalance = Number(
        initialBalanceText
          .replace(/\s/g, '')
          .replace('PLN', '')
          .replace('zł', '')
          .replace(',', '.')
      );

      const expectedBalance =
        initialBalance - Number(topUpAmount);

      // Act
      await pulpitPage.executeMobileTopUp(
        topUpReceiver,
        topUpAmount
      );

      // Assert
      await expect(pulpitPage.moneyValueText).toHaveText(
        `${expectedBalance}`
      );
    }
  );
});
