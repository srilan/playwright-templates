import { test, expect } from "@playwright/test";
import {
  loginDetails,
  stationDetails,
  updatedStationDetails,
} from "../config/testdata";
import { log } from "console";
import * as dotenv from "dotenv";

dotenv.config();

const stationsURL = process.env.STATIONS || "";
const cardsURL = process.env.CARDS || "";
const faremng = process.env.FAREMNG || "";
const loginURL = process.env.LOGIN || "";
const start = process.env.HOMEPAGE || "";
const loginCardsUrl = process.env.LOGINCARDS || "";
//create station details

//edit station details
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

      await expect(page).toHaveURL(loginCardsUrl);

      //saves url and token into json file
      //change "admin.json" to the "user.json" for the users token
      await page.context().storageState({ path: "admin.json" });

      console.log("Login Successful");
      page.close;
  
  } else {
    console.log("User Input Field Not Found in the Login Page");
  }
});

// Container of tests
test.describe("Text Inputs testing", () => {
  // Test for Admin Login
  //Creation of new Station "San Juan"
  test("Creation of new Station", async ({ browser }) => {
    //uses token in json file to access the admin page after opening a new browser
    const context = await browser.newContext({ storageState: "admin.json" });
    //opens a new browser
    const page = await context.newPage();

    //testIds

    const stationNameField = page.getByTestId("StationName Input");
    const shortNameField = page.getByTestId("ShortName Input");
    const longitudeField = page.getByTestId(
      "Coordinates Input for CoordinateX"
    );
    const latitudeField = page.getByTestId("Coordinates Input for CoordinateY");
    const confirmButton = page.getByTestId("CreateEdit_Button");
    const cancelButton = page.getByTestId("Cancel_Button");

    try {
      await page.goto(stationsURL);

      //clicks and fill station details
      await page.getByRole("button", { name: "NEW STATION" }).click();
      await stationNameField.click();
      await stationNameField.fill(stationDetails.stationName);
      await shortNameField.click();
      await shortNameField.fill(stationDetails.shortName);

      //clicks and fill the longitude and latitude
      await longitudeField.click();
      await longitudeField.fill(stationDetails.lng);
      await latitudeField.click();
      await latitudeField.fill(stationDetails.lat);

      //clcks on the connections for drop down
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

      await expect(
        page.getByRole("row", { name: "San Juan Stations sj" })
      ).toBeVisible();

      console.log("Station Created");
    } catch (err) {
      console.log("Error in Creating Station" + err);
    }
  });

  // Updates the exisiting station "San Juan"
  test("Editing of Station", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "admin.json" });
    const page = await context.newPage();

    await page.goto(stationsURL);
    await expect(page.getByTestId("EditButton-SJ")).toBeVisible();
    //testIds

    const stationNameField = page.getByTestId("StationName Input");
    const shortNameField = page.getByTestId("ShortName Input");
    const longitudeField = page.getByTestId(
      "Coordinates Input for CoordinateX"
    );
    const latitudeField = page.getByTestId("Coordinates Input for CoordinateY");
    const confirmButton = page.getByTestId("CreateEdit_Button");
    const cancelButton = page.getByTestId("Cancel_Button");

    //check if station is visible
    try {
      const stationToEdit = await page
        .getByRole("row", { name: "San Juan SJ" })
        .isVisible();

      if (stationToEdit) {
        await page
          .getByRole("row", { name: "San Juan SJ" })
          .getByRole("button", { name: "Edit" })
          .click();

        //clicks and fill station details
        await stationNameField.click();
        await stationNameField.clear();
        await stationNameField.fill(updatedStationDetails.stationName);
        await shortNameField.click();
        await shortNameField.clear();
        await shortNameField.fill(updatedStationDetails.shortName);

        //clicks and fill the longitude and latitude
        await longitudeField.click();
        await longitudeField.clear();
        await longitudeField.fill(updatedStationDetails.lng);
        await latitudeField.click();
        await latitudeField.clear();
        await latitudeField.fill(updatedStationDetails.lat);

        //clicks comboBox
        await page.locator(".css-19bb58m").click();

        //clicks on the the corresponding option
        await page.getByRole("option", { name: "Ayala Station" }).click();

        //clicks to remove the option
        await page.getByLabel("Remove iNO").click();

        await confirmButton.click();

        await expect(
          page.getByRole("row", { name: "San Juan Station sj" })
        ).toBeVisible();

        console.log("Station Edited");

      } else {
        console.log("Station Not Found");
      }
    } catch (err) {
      console.log("Error in Editing Station" + err);
    }
  });

  //Deletes the Station "San Juan"
  test("Deletion of Station", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "admin.json" });
    const page = await context.newPage();

   

    try {
      await page.goto(stationsURL);
      await expect( page.getByTestId("DeleteButton-SJ")).toBeVisible();

      const stationToDelete = await page
        .getByRole("row", { name: "San Juan SJ" })
        .isVisible();

      if (stationToDelete) {
        await page
          .getByTestId("DeleteButton-SJ")
          .click();

        await page.getByRole("button", { name: "Proceed" }).click();
      } else {
        console.log("Station Not Found");
      }
    } catch (err) {
      console.log("Error in Deleting Station" + err);
    }
  });
});
