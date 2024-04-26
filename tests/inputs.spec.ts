import { test, expect } from "@playwright/test";
import {
  invalidStationDetails,
  invalidUpdatedStationDetails,
  loginDetails,
  stationDetails,
  updatedStationDetails,
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

    /* saves url and token into json file
     *
     *
     *  change "admin.json" to the "user.json" for the users token
     *   await page.context().storageState({ path: "admin.json" });
     *
     *  only use this when you want to save the token and use for:
     *
     *    const context = await browser.newContext({ storageState: "admin.json" });
     *
     *  in new tests.
     */

    console.log("Login Successful");
    page.close;
  } else {
    console.log("User Input Field Not Found in the Login Page");
  }
});

// test.describe is used to group the tests

//Tests for creation of Station
test.describe("Creation of new Station", () => {
  // test for valid inputs in creating a station
  test("Valid inputs for creation of new station", async ({ page }) => {
    /* Use this code if you want to open a new browser for the test
     *
     * uses token in json file to access the admin page after opening a new browser
     *   const context = await browser.newContext({ storageState: "admin.json" });
     *
     * opens a new browser
     *   const page = await context.newPage();
     */

    //testIds
    const stationNameField = page.getByTestId("StationName Input");
    const shortNameField = page.getByTestId("ShortName Input");
    const longitudeField = page.getByTestId(
      "Coordinates Input for CoordinateX"
    );
    const latitudeField = page.getByTestId("Coordinates Input for CoordinateY");
    const confirmButton = page.getByTestId("CreateEdit_Button");
    const cancelButton = page.getByTestId("Cancel_Button"); // use this for cancel button

    try {
      //goes to the stations page
      await page.goto(stationsURL);

      //expects the page to goto the stations page
      expect(page).toHaveURL(stationsURL);

      //clicks and fill station details
      await page.getByRole("button", { name: "NEW STATION" }).click();

      //expects the fields and button are present
      expect(stationNameField).toBeVisible();
      expect(shortNameField).toBeVisible();
      expect(longitudeField).toBeVisible();
      expect(latitudeField).toBeVisible();
      expect(confirmButton).toBeVisible();
      expect(cancelButton).toBeVisible();
      expect(page.locator(".css-19bb58m")).toBeVisible(); // Temporary solution for comboBox, this is not a good practice. Better to use testIds

      // clicks and fill the fields with the station details
      await stationNameField.click();
      await stationNameField.fill(stationDetails.stationName);
      await shortNameField.click();
      await shortNameField.fill(stationDetails.shortName);
      await longitudeField.click();
      await longitudeField.fill(stationDetails.lng);
      await latitudeField.click();
      await latitudeField.fill(stationDetails.lat);

      /* clcks on the connections for drop down
       *
       *  Note: page.locator(".css-19bb58m") is "NOT" a good practice.
       *        It is better to use the testIds to locate the element
       *
       */
      //clicks comboBox
      await page.locator(".css-19bb58m").click();

      //clicks on the the corresponding option
      await page.getByRole("option", { name: "North Avenue Station" }).click();
      await page.locator(".css-19bb58m").click();

      //clicks on the the corresponding option
      await page.getByRole("option", { name: "Some Station" }).click();

      //clicks to remove the option
      await page.getByLabel("Remove Some Station").click();

      //clicks on the create button
      await confirmButton.click();

      await expect(
        page.getByRole("row", { name: "San Juan SJ" })
      ).toBeVisible();

      console.log("Station Created");
    } catch (err) {
      throw new Error("Error in Creating Station");
    }
  });

  // test for checking if the station is created successfully
  test("Checking if crteation is created successfully", async ({ page }) => {
    try {
      //goes to the stations page
      await page.goto(stationsURL);

      //expects the page to goto the stations page
      expect(page).toHaveURL(stationsURL);

      //checks if the station is visible
      await expect(
        page.getByRole("row", {
          name: stationDetails.stationName + " " + stationDetails.shortName,
        })
      ).toBeVisible();

      console.log("Station is present in the list");
    } catch (err) {
      throw new Error("Error in Checking Station");
    }
  });

  // test for invalid inputs in creating a station
  test("Invalid creation of station", async ({ page }) => {
    const stationNameField = page.getByTestId("StationName Input");
    const shortNameField = page.getByTestId("ShortName Input");
    const longitudeField = page.getByTestId(
      "Coordinates Input for CoordinateX"
    );
    const latitudeField = page.getByTestId("Coordinates Input for CoordinateY");
    const confirmButton = page.getByTestId("CreateEdit_Button");
    const cancelButton = page.getByTestId("Cancel_Button"); // use this for cancel button

    try {
      //goes to the stations page
      await page.goto(stationsURL);

      //expects the page to goto the stations page
      expect(page).toHaveURL(stationsURL);

      //clicks and fill station details
      await page.getByRole("button", { name: "NEW STATION" }).click();

      //expects the fields and button are present
      expect(stationNameField).toBeVisible();
      expect(shortNameField).toBeVisible();
      expect(longitudeField).toBeVisible();
      expect(latitudeField).toBeVisible();
      expect(confirmButton).toBeVisible();
      expect(cancelButton).toBeVisible();
      expect(page.locator(".css-19bb58m")).toBeVisible(); // Temporary solution for comboBox, this is not a good practice. Better to use testIds

      // clicks and fill the fields with the station details
      await stationNameField.click();
      await stationNameField.fill(invalidStationDetails.stationName);
      await shortNameField.click();
      await shortNameField.fill(invalidStationDetails.shortName);
      await longitudeField.click();
      await longitudeField.fill(invalidStationDetails.lng);
      await latitudeField.click();
      await latitudeField.fill(invalidStationDetails.lat);

      /* clcks on the connections for drop down
       *
       *  Note: page.locator(".css-19bb58m") is "NOT" a good practice.
       *        It is better to use the testIds to locate the element
       *
       */
      //clicks comboBox
      await page.locator(".css-19bb58m").click();

      //clicks on the the corresponding option
      await page.getByRole("option", { name: "iNO" }).click();
      await page.locator(".css-19bb58m").click();

      //clicks on the the corresponding option
      await page.getByRole("option", { name: "Ayala Station" }).click();

      //clicks to remove the option
      await page.getByLabel("Remove Ayala Station").click();

      //clicks on the create button
      await confirmButton.click();

      //expects the error message to be visible
      await expect(
        page.locator("div.rnc__notification-content") // Temporary solution for error message, this is not a good practice. Better to use testIds
      ).toBeVisible();

      console.log("Station not created");
    } catch (err) {
      throw new Error("Error in Creating Station");
     
    }
  });
});

//Tests for Editing of Station
test.describe("Editing of Exisitng Station", () => {
  // test for valid inputs in editing a station
  test("Valid inputs for editing of exisitng station", async ({ page }) => {
    //Variables
    const stationNameField = page.getByTestId("StationName Input");
    const shortNameField = page.getByTestId("ShortName Input");
    const longitudeField = page.getByTestId(
      "Coordinates Input for CoordinateX"
    );
    const latitudeField = page.getByTestId("Coordinates Input for CoordinateY");
    const confirmButton = page.getByTestId("CreateEdit_Button");
    const cancelButton = page.getByTestId("Cancel_Button");

    try {
      //goto the stations page
      await page.goto(stationsURL);

      //expects the page to goto the stations page
      expect(page).toHaveURL(stationsURL);

      //check if station edit button is visible
      await expect(page.getByTestId("EditButton-SJ")).toBeVisible(); //change testId to the corresponding station

      //clicks the edit button
      await page.getByTestId("EditButton-SJ").click();

      //expects the fields and button are present
      expect(stationNameField).toBeVisible();
      expect(shortNameField).toBeVisible();
      expect(longitudeField).toBeVisible();
      expect(latitudeField).toBeVisible();
      expect(confirmButton).toBeVisible();
      expect(cancelButton).toBeVisible();
      expect(page.locator(".css-19bb58m")).toBeVisible();

      //clicks and deletes exisiting data then fills it with the updated station details
      await stationNameField.click();
      await stationNameField.clear();
      await stationNameField.fill(updatedStationDetails.stationName);
      await shortNameField.click();
      await shortNameField.clear();
      await shortNameField.fill(updatedStationDetails.shortName);
      await longitudeField.click();
      await longitudeField.clear();
      await longitudeField.fill(updatedStationDetails.lng);
      await latitudeField.click();
      await latitudeField.clear();
      await latitudeField.fill(updatedStationDetails.lat);

      //clicks comboBox
      await page.locator(".css-19bb58m").click();

      //clicks on the the corresponding option
      await page.getByRole("option", { name: "Some Station" }).click();

      //clicks to remove the option
      await page.getByLabel("Remove North Avenue Station").click();

      await confirmButton.click();

      await expect(
        page.getByRole("row", {
          name:
            updatedStationDetails.stationName +
            " " +
            updatedStationDetails.shortName,
        })
      ).toBeVisible();

      console.log("Station Edited");
    } catch (err) {
      throw new Error("Error in Editing Station");
      
    }
  });

  // test for checking if the edited station is present
  test("Checking if edited station is present", async ({ page }) => {
    try {
      //goes to the stations page
      await page.goto(stationsURL);

      //expects the page to goto the stations page
      expect(page).toHaveURL(stationsURL);

      //checks if the station is visible
      await expect(
        page.getByRole("row", {
          name:
            updatedStationDetails.stationName +
            " " +
            updatedStationDetails.shortName,
        })
      ).toBeVisible();

      console.log("Station is present in the list");
    } catch (err) {
      throw new Error("Error in Checking Station");
      
    }
  });

  // test for invalid inputs in editing a station
  test("Invalid inputs for editing of exisitng station", async ({ page }) => {
    //Variables
    const stationNameField = page.getByTestId("StationName Input");
    const shortNameField = page.getByTestId("ShortName Input");
    const longitudeField = page.getByTestId(
      "Coordinates Input for CoordinateX"
    );
    const latitudeField = page.getByTestId("Coordinates Input for CoordinateY");
    const confirmButton = page.getByTestId("CreateEdit_Button");
    const cancelButton = page.getByTestId("Cancel_Button");

    try {
      //goto the stations page
      await page.goto(stationsURL);

      //expects the page to goto the stations page
      expect(page).toHaveURL(stationsURL);

      //check if station edit button is visible
      await expect(page.getByTestId("EditButton-sj")).toBeVisible(); //change testId to the corresponding station

      //clicks the edit button
      await page.getByTestId("EditButton-sj").click();

      //expects the fields and button are present
      expect(stationNameField).toBeVisible();
      expect(shortNameField).toBeVisible();
      expect(longitudeField).toBeVisible();
      expect(latitudeField).toBeVisible();
      expect(confirmButton).toBeVisible();
      expect(cancelButton).toBeVisible();
      expect(page.locator(".css-19bb58m")).toBeVisible();

      //clicks and deletes exisiting data then fills it with the updated station details
      await stationNameField.click();
      await stationNameField.clear();
      await stationNameField.fill(invalidUpdatedStationDetails.stationName);
      await shortNameField.click();
      await shortNameField.clear();
      await shortNameField.fill(invalidUpdatedStationDetails.shortName);
      await longitudeField.click();
      await longitudeField.clear();
      await longitudeField.fill(invalidUpdatedStationDetails.lng);
      await latitudeField.click();
      await latitudeField.clear();
      await latitudeField.fill(invalidUpdatedStationDetails.lat);

      await confirmButton.click();

      //expects the error message to be visible
      await expect(
        page.locator("div.rnc__notification-content") // Temporary solution for error message, this is not a good practice. Better to use testIds
      ).toBeVisible();

      console.log("Station not edited");
    } catch (err) {
      throw new Error("Error in Editing Station");

    }
  });
});

//Tests for Deletion of Station
test.describe("Deletion of Exisitng Station", () => {
  // test for valid deletion of station
  test("Deletion of existing station", async ({ page }) => {
    try {
      //goes to the stations page
      await page.goto(stationsURL);

      expect(page).toHaveURL(stationsURL);
      //expects the page to goto the stations page
      await expect(page.getByTestId("DeleteButton-sj")).toBeVisible();

      //checks if the station is visible
      await page
        .getByRole("row", {
          name:
            updatedStationDetails.stationName +
            " " +
            updatedStationDetails.shortName,
        })
        .isVisible();

      //clicks the delete button if the station is visible
      await page.getByTestId("DeleteButton-sj").click();

      //expects the proceed button to be visible then clicks it
      expect(page.getByRole("button", { name: "Proceed" })).toBeVisible();
      await page.getByRole("button", { name: "Proceed" }).click();

      //expects the proceed button to be hidden
      await expect(page.getByRole("button", { name: "Proceed" })).toBeHidden();
      console.log("Station Deleted");
    } catch (err) {
      throw new Error("Error in Deleting Station");
    }
  });

  // test for checking if the station is deleted
  test("Checking if existing station delted successfuly", async ({ page }) => {
    try {
      //goes to the stations page
      await page.goto(stationsURL);

      //expects the page to goto the stations page
      expect(page).toHaveURL(stationsURL);

      //checks if the station is visible
      await expect(
        page.getByRole("row", {
          name:
            updatedStationDetails.stationName +
            " " +
            updatedStationDetails.shortName,
        })
      ).toBeHidden();

      console.log("Station is deleted successfully");
    } catch (err) {
      throw new Error("Error in Checking Station");
    }
  });
});
