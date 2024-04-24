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

test.describe("Verification of Navigation Links", () => {
  test("stations", async ({ page }) => {
    //Navigating of each tab
    await page.getByRole("link", { name: "Stations" }).click();

    //verification of url
    await expect(page).toHaveURL(stationsUrl);
    // //Verification of text content within the navigation links
    expect(await page.textContent("role=columnheader")).toContain(
      "Station Name"
    );
    //visibility & error handling of non-existing link
    const linkExists = page.locator('a[name="Stations"]');

    if (linkExists) {
      console.log("Exist link");
    } else {
      console.log("Does not have any link");
    }
  });

  test("Cards", async ({ page }) => {
    //Navigating of each tab
    await page.getByRole("link", { name: "Cards" }).click();
    //verification of url
    await expect(page).toHaveURL(cardsUrl);
    //Verification of text content within the navigation links
    expect(await page.textContent("role=columnheader")).toContain("Beep Card");
    //visibility & error handling of non-existing link
    const linkExists = page.locator('a[name="Cards"]');

    if (linkExists) {
      console.log("Exist link");
    } else {
      console.log("Does not have any link");
    }
  });

  test("General", async ({ page }) => {
    //Navigating of each tab
    await page.getByRole("link", { name: "General" }).click();
    //verification of url
    await expect(page.getByTestId("toggleMode")).toBeVisible();
   
    //visibility & error handling of non-existing link
    const linkExists = page.locator('a[name="General"]');

    if (linkExists) {
      console.log("Exist link");
    } else {
      console.log("Does not have any link");
    }
  });

  test("Log Out", async ({ page }) => {
    //Navigating of each tab
    await page.getByRole("link", { name: "Log Out" }).click();
    //verification of url
    await expect(page).toHaveURL(homePageUrl);
    await page.goto(stationsUrl);
    await expect(page).toHaveURL(loginUrl);
    //visibility & error handling of non-existing link
    const linkExists = page.locator('a[name="Log Out"]');

    if (linkExists) {
      console.log("Exist link");
    } else {
      console.log("Does not have any link");
    }
  });
});
