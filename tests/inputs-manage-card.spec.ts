import { test, expect } from "@playwright/test";
import {
  invalidCardDetails,
  loginDetails,
  validCardDetails,
} from "../config/testdata";
import { log } from "console";
import * as dotenv from "dotenv";

dotenv.config();

//environment variables
const stationsURL = process.env.STATIONS || "";
const cardsURL = process.env.CARDS || "";
const faremng = process.env.FAREMNG || "";
const loginURL = process.env.LOGIN || "";
const start = process.env.HOMEPAGE || "";
const loginCardsUrl = process.env.LOGINCARDS || "";

//automated login for each tests
test.beforeEach(async ({ page }) => {
  await page.goto(loginURL);

  const usernameField = page.getByTestId("username");
  const passwordField = page.getByTestId("password");
  const signInButton = page.getByTestId("signInButton");

  if (usernameField && passwordField) {
    await usernameField.click();
    await usernameField.fill(loginDetails.username);
    await passwordField.click();
    await passwordField.fill(loginDetails.password);

    await signInButton.click();
    await signInButton.click();

    //expects the page to goto the loginCardsUrl
    await expect(page).toHaveURL(loginCardsUrl);
    console.log("Login Successful");
  } else {
    console.log("User Input Field Not Found in the Login Page");
  }
});

//test for creating card
test.describe("Creation of card", () => {
  //test for creating a card with valid details
  test("Create a card with valid details", async ({ page }) => {
    // varaibles
    const uuid = page.getByTestId("New Beep Card Input Field");
    const balance = page.getByTestId("Balance Value Input Field");
    const addCardButton = page.getByTestId("Create Beep Card Button").first();
    const createButton = page.getByTestId("Create Beep Card Button").last();
    const cancelButton = page.getByTestId("Cancel Beep Card Creation Button");

    try {
      //checks the correct url
      expect(page).toHaveURL(loginCardsUrl);

      //checks if the create button is visible then clicks it
      await expect(addCardButton).toBeVisible();
      await createButton.click();

      //checks if the input fields are visible
      expect(uuid).toBeVisible();
      expect(balance).toBeVisible();
      expect(createButton).toBeVisible();
      expect(cancelButton).toBeVisible();

      //fills up the input fields
      await uuid.click();
      await uuid.fill(validCardDetails.uuid);
      await balance.click();
      await balance.fill(validCardDetails.balance);
      await createButton.click();

      //waits for the modal to disappear
      await expect(uuid).toBeHidden();

      //check if card is visible
      await expect(
        page.getByRole("row", { name: validCardDetails.uuid })
      ).toBeVisible();
      console.log("Card Created Successfully");
    } catch (err) {
        throw new Error("Error creating card");
    }
  });

  //test for checking if card created successfully
  test("check if card created successfuly", async ({ page }) => {
    try {
      //checks the correct url
      expect(page).toHaveURL(loginCardsUrl);

      //checks if the card is visible
      await expect(
        page.getByRole("row", { name: validCardDetails.uuid })
      ).toBeVisible();

      console.log("Card is present in the list of cards");
    } catch (err) {
        throw new Error("Card not found");
 
    }
  });

  //test for creating a card with invalid details
  test("Create a card with invalid details", async ({ page }) => {
    // varaibles
    const uuid = page.getByTestId("New Beep Card Input Field");
    const balance = page.getByTestId("Balance Value Input Field");
    const addCardButton = page.getByTestId("Create Beep Card Button").first();
    const createButton = page.getByTestId("Create Beep Card Button").last();
    const cancelButton = page.getByTestId("Cancel Beep Card Creation Button");

    try {
      //checks the correct url
      expect(page).toHaveURL(loginCardsUrl);

      //checks if the create button is visible then clicks it
      await expect(addCardButton).toBeVisible();
      await createButton.click();

      //checks if the input fields are visible
      expect(uuid).toBeVisible();
      expect(balance).toBeVisible();
      expect(createButton).toBeVisible();
      expect(cancelButton).toBeVisible();

      //fills up the input fields
      await uuid.click();
      await uuid.fill(invalidCardDetails.uuid);
      await balance.click();
      await balance.fill(invalidCardDetails.balance);
      await createButton.click();

      //waits for the modal to disappear
      await expect(createButton).toBeVisible();

      //check if card is visible
      console.log("Card Failed to Create");
    } catch (err) {
      throw new Error("Error creating card");
    }
  });
});

//test for updating card balance
test.describe("Update card balance", () => {
  //test for updating card balance with valid details
  test("Update card balance with valid details", async ({ page }) => {
    // varaibles
    const addValue = page.getByTestId("Load Value Input Field");
    const load = page.getByTestId("Load Button " + validCardDetails.uuid);
    const addBalance = page.getByTestId("Load Beep Card Button");
    const cancelButton = page.getByTestId("Cancel Load Beep Card Button");

    try {
      //checks the correct url
      expect(page).toHaveURL(loginCardsUrl);

      //checks if the create button is visible then clicks it
      await expect(load).toBeVisible();
      await load.click();

      //checks if the load value input field is visible
      expect(addValue).toBeVisible();
      expect(addBalance).toBeVisible();
      expect(cancelButton).toBeVisible();

      //adding value to the field
      await addValue.click();
      await addValue.fill(validCardDetails.balance);
      await addBalance.click();

      //waits for the modal to disappear
      await expect(addBalance).toBeHidden();

      //check if card is visible
      await expect(page.locator("div.rnc__notification-title")).toHaveText(
        "Load Successful!"
      );

      console.log("Card Balance Updated Successfully");
    } catch (err) {
      throw new Error("Error updating card balance");
    }
  });

  test("Update card balance with invalid details", async ({ page }) => {
    //test for updating card balance with invalid details
    // varaibles
    const addValue = page.getByTestId("Load Value Input Field");
    const load = page.getByTestId("Load Button " + validCardDetails.uuid);
    const addBalance = page.getByTestId("Load Beep Card Button");
    const cancelButton = page.getByTestId("Cancel Load Beep Card Button");

    try {
      //checks the correct url
      expect(page).toHaveURL(loginCardsUrl);

      //checks if the create button is visible then clicks it
      await expect(load).toBeVisible();
      await load.click();

      //checks if the load value input field is visible
      expect(addValue).toBeVisible();
      expect(addBalance).toBeVisible();
      expect(cancelButton).toBeVisible();

      //adding value to the field
      await addValue.click();
      await addValue.fill(invalidCardDetails.balance);
      await addBalance.click();

      //waits for the modal to disappear
      await expect(addBalance).toBeVisible();

      //check if card is visible
      await expect(page.locator("div.rnc__notification-title")).toHaveText(
        "Load Failed"
      );

      console.log("Card Balance does not update successfully");
    } catch (err) {
      throw new Error("Error updating card balance");
    }
  });
});

//test for deleting card
test.describe("Deletion of card", () => {
  //test for deleting a card with valid details
  test("Delete a card with valid details", async ({ page }) => {
    const deleteButton = page.getByTestId(
      "Delete Button " + validCardDetails.uuid
    );
    const proceedDelete = page.getByTestId(
      "Proceed Button for Deleting Beep Card"
    );
    const cancelDelete = page.getByTestId(
      "Cancel Button for Deleting Beep Card"
    );
    try {
      //checks the correct url
      expect(page).toHaveURL(loginCardsUrl);

      //checks if the delete button is visible then clicks it
      await expect(deleteButton).toBeVisible();
      await deleteButton.click();

      //checks if the delete modal is visible and contains the correct buttons
      expect(proceedDelete).toBeVisible();
      expect(cancelDelete).toBeVisible();

      //clicks the proceed button
      await proceedDelete.click();

      //waits for the modal to disappear
      await expect(proceedDelete).toBeHidden();

      //check if card is no longer visible
      await expect(
        page.getByRole("row", { name: validCardDetails.uuid })
      ).toBeHidden();

      console.log("Card Deleted Successfully");
    } catch (err) {
      throw new Error("Card Deletion Failed");
    }
  });

  test("check if card deleted successfuly", async ({ page }) => {
    try {
        //checks the correct url
        expect(page).toHaveURL(loginCardsUrl);
  
        //check if card is no longer visible
        await expect(
          page.getByRole("row", { name: validCardDetails.uuid })
        ).toBeHidden();
  
        console.log("Card Deleted Successfully");
      } catch (err) {
        throw new Error("Card Deletion Failed");
      }
  });
});
