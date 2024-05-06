import { test, expect } from "@playwright/test";
import { loginDetails } from "../config/testdata";
import * as dotenv from "dotenv";

dotenv.config();

const loginUrl = process.env.LOGIN || "";
const adminUsername = loginDetails.username;
const adminPassword = loginDetails.password;
const generalURL = process.env.FAREMNG || "";

test.beforeEach(async ({ page }) => {
  await page.goto(loginUrl);

  //Authentication
  const usernameTextbox = page.getByTestId("username");
  const passwordTextbox = page.getByTestId("password");
  const signInButton = page.getByTestId("signInButton");

  await usernameTextbox.click();
  await usernameTextbox.fill(adminUsername);
  await passwordTextbox.click();
  await passwordTextbox.fill(adminPassword);
  await signInButton.click();

  await page.getByTestId("FareManagement Link").click();
});

test.describe("Fare", () => {
  test("Verify Toggle Mode Click", async ({ page }) => {
    //Toggle Clickable Check
    await page.getByTestId("toggleMode").click();

    await page.waitForSelector('[data-testid="currentMode-false"]');
    //Verification of Current Mode
    // await expect(page.getByTestId("currentMode")).toHaveText("loading");
    // const status = await page.textContent( `[data-testid=${true ? "" : ""}`);
    const status = await page.textContent('[data-testid="currentMode-false"]');

    if (status) {
      expect(status).toContain("Current: Operational");

      console.log("The system is now in operational mode.");
    } else {
      throw "The system is now in maintenance mode.";
    }
  });

  test("Invalid Fare per Km", async ({ page }) => {
    const fareInput = page.getByTestId("fareInput");
    const notification = page.locator(
      'div.rnc__notification-message:has-text("Invalid fare value")'
    );

    await fareInput.isVisible();
    await fareInput.fill("0");
    await page.getByTestId("updateFare").click();
    await expect(notification).toHaveText("Invalid fare value");
  });

  test("Valid Fare per Km", async ({ page }) => {
    const fareInput = page.getByTestId("fareInput");
    const notification = page.locator(
      'div.rnc__notification-message:has-text("Fare Rate is now 50")'
    );

    await fareInput.isVisible();
    await fareInput.fill("50");
    await page.getByTestId("updateFare").click();
    await expect(notification).toHaveText("Fare Rate is now 50");
  });
});
