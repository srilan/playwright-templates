import { test, expect } from "@playwright/test";
import { loginDetails } from "../config/testdata";
import * as dotenv from "dotenv";


dotenv.config();

const stationsUrl = process.env.STATIONS || "";
const cardsUrl = process.env.CARDS || "";
const loginUrl = process.env.LOGIN || "";
const generalURL = process.env.FAREMNG || "";
const homePageUrl = process.env.HOMEPAGE || "";

const adminUsername = loginDetails.username;
const adminPassword = loginDetails.password;

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
});

//Navigating of each tab
test.describe("Verification of Navigation Links", () => {
  //Navigate to stations
  test("Navigate to stations", async ({ page }) => {
    try {
      //checks if there is a link for stations and clicks it
      await expect(page.getByTestId("StationManagement Link")).toBeVisible();
      await page.getByTestId("StationManagement Link").click();

      //verifies if the url is correct
      await expect(page).toHaveURL(stationsUrl);
    } catch (err) {
      throw new Error("Invalid URL ");
    }
  });

  //Navigate to cards
  test("Navigate to Cards", async ({ page }) => {
    try {
      //checks if there is a link for UUID Management and clicks it
      await expect(page.getByTestId("UUIDManagement Link")).toBeVisible();
      await page.getByTestId("UUIDManagement Link").click();

      //verification of url
      await expect(page).toHaveURL(cardsUrl);
    } catch (err) {
      throw new Error("Invalid URL ");
    }
  });

  //Navigate to Fare Management
  test("Navigate to General", async ({ page }) => {
    try {
      //checks if there is a link for UUID Management and clicks it
      await expect(page.getByTestId("FareManagement Link")).toBeVisible();
      await page.getByTestId("FareManagement Link").click();

      //verification of url
      await expect(page).toHaveURL(generalURL);
    } catch (err) {
      throw new Error("Invalid URL ");

    }
  });

  //logouts the admin
  test("Admin button to logout", async ({ page }) => {
    try {
      //checks if there is a link for logout and clicks it
      await expect(page.getByTestId("Logout Link")).toBeVisible();
      await page.getByTestId("Logout Link").click();

      //verification of url
      await expect(page).toHaveURL(homePageUrl);

      //checks if there is a link for login and clicks it
      expect(page.getByTestId("Admin Link")).toBeVisible();
      await page.getByTestId("Admin Link").click();

      //verification of url
      await expect(page).toHaveURL(loginUrl + "#");
    } catch (err) {
      throw new Error("Invalid URL ");
    }
  });
});
