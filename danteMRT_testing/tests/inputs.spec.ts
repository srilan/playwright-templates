import { test, expect } from "@playwright/test";

let username = "cat";
let password = "meow";

const Stations = "https://d-mrt-fe.onrender.com/StationManagement#";
const Cards = "https://d-mrt-fe.onrender.com/UUIDManagement";
const FareMng = "https://d-mrt-fe.onrender.com/FareManagement#";
const Login = "https://d-mrt-fe.onrender.com/AdminLogin";
const Start = "https://d-mrt-fe.onrender.com/taft/in";

//create station details
const lng = "14.600860367855892";
const lat = "121.01646423339845";
const stationName = "San Juan";
const shortName = "SJ";

//edit station details
const newLng = "14.606674408363373";
const newLat = "121.02624893188478";
const newStationName = "San Juan Station";
const newShortName = "sj";

test.beforeEach(async ({ page }) => {
  await page.goto(Start);
});

test.describe("Text Inputs testing", () => {
  test("Admin Login", async ({ page }) => {
    await page.getByRole("link", { name: "Admin", exact: true }).click();

    // const userTextBox = page.locator(`[name="Usernaasdsadme"]`);

    const userTextBox = await page
      .getByRole("textbox", { name: "Username" })
      .isVisible();

    const passTextBox = await page
      .getByRole("textbox", { name: "******************" })
      .isVisible();

    if (userTextBox && passTextBox) {
      try {

      await page.getByRole("textbox", { name: "Username" }).click();
      await page.getByRole("textbox", { name: "Username" }).fill(username);
      await page.getByRole("textbox", { name: "******************" }).click();
      await page
        .getByRole("textbox", { name: "******************" })
        .fill(password);
      await page.getByRole("button", { name: "Sign In" }).click();

      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(Cards);

      //saves url and token into json file
      await page.context().storageState({ path: "admin.json" });

      console.log("Login Successful");
      page.close;

      } catch (err) {
        console.log("Login Failed");
      }
    } else {
      console.log("User Input Field Not Found in the Login Page");
    }
  });

  test("Creation of new Station", async ({ browser }) => {
    //uses token in json file to access the admin page after opening a new browser
    const context = await browser.newContext({ storageState: "admin.json" });

    //opens a new browser
    const page = await context.newPage();

    try{
    await page.goto(Stations);

    //clicks and fill station details
    await page.getByRole("button", { name: "NEW STATION" }).click();
    await page.getByRole("textbox", { name: "Station Name" }).click();
    await page.getByRole("textbox", { name: "Station Name" }).fill(stationName);
    await page.getByRole("textbox", { name: "Station ShortName" }).click();
    await page
      .getByRole("textbox", { name: "Station ShortName" })
      .fill(shortName);

    //clicks and fill the longitude and latitude
    await page.getByRole("textbox", { name: "Longitude" }).click();
    await page.getByRole("textbox", { name: "Longitude" }).fill(lng);
    await page.getByRole("textbox", { name: "Latitude" }).click();
    await page.getByRole("textbox", { name: "Latitude" }).fill(lat);

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
    await page.getByRole("button", { name: "Create" }).click();

    await page.waitForTimeout(2000);


    }catch(err){
    console.log("Error in Creating Station");
    }
  });

  test("Editing of Station", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "admin.json" });
    const page = await context.newPage();

    await page.goto(Stations);
    await page.waitForTimeout(3000);

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
        await page.getByRole("textbox", { name: "Station Name" }).click();
        await page.getByRole("textbox", { name: "Station Name" }).clear();
        await page
          .getByRole("textbox", { name: "Station Name" })
          .fill(newStationName);
        await page.getByRole("textbox", { name: "Station ShortName" }).click();
        await page.getByRole("textbox", { name: "Station ShortName" }).clear();
        await page
          .getByRole("textbox", { name: "Station ShortName" })
          .fill(newShortName);

        //clicks and fill the longitude and latitude
        await page.getByRole("textbox", { name: "Longitude" }).click();
        await page.getByRole("textbox", { name: "Longitude" }).clear();
        await page.getByRole("textbox", { name: "Longitude" }).fill(newLng);
        await page.getByRole("textbox", { name: "Latitude" }).click();
        await page.getByRole("textbox", { name: "Latitude" }).clear();
        await page.getByRole("textbox", { name: "Latitude" }).fill(newLat);

        //clicks comboBox
        await page.locator(".css-19bb58m").click();

        //clicks on the the corresponding option
        await page.getByRole("option", { name: "Ayala Station" }).click();

        //clicks to remove the option
        await page.getByLabel("Remove iNO").click();

        await page.getByRole("button", { name: "Update" }).click();
      } else {
        console.log("Station Not Found");
      }
    } catch (err) {
      console.log("Error in Editing Station");
    }
  });

  test("Deletion of Station", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "admin.json" });
    const page = await context.newPage();

    await page.goto(Stations);
    await page.waitForTimeout(3000);


    try {
    
      const stationToDelete = await page.getByRole("row", {name: "San Juan SJ"}).isVisible();

      if(stationToDelete){

      await page
        .getByRole("row", { name: "San Juan SJ" })
        .getByRole("button", { name: "Delete" })
        .click();                                                                                      

      await page.getByRole("button", { name: "Proceed" }).click();

      }
      else{
        console.log("Station Not Found");
      }

    } catch (err) {
      console.log("Error in Deleting Station");
    }
  });

  test("flowbite", async ({ page }) => {
    const asdsdasd = await page
      .getByTestId("flowbite-navbar-toggle")
      .isVisible();
    console.log(asdsdasd);
  });
});

//Station Managemen

// test("Form Input", async ({ page }) => {
//   // Perform authentication

//   //Check the URL for successful Login Attempt
//   await expect(page).toHaveURL(Cards);

//   //Navigate to Stations Page
//   await page.getByRole("link", { name: "Stations" }).click();
//   await page.waitForTimeout(3000);

//   //Check URL for Successful Navigation
//   await expect(page).toHaveURL(Stations);

//   // Fill in form inputs
//   await page
//     .getByRole("row", { name: "Buendia Station buendia" })
//     .getByRole("button")
//     .first()
//     .click();
//   await page.waitForTimeout(5000);

//   await expect(page).toHaveTitle(/Edit Current Station/);
//   await page
//     .getByRole("textbox", { name: "Station Name" })
//     .fill("Done_By_Automation");
//   await page.getByRole("textbox", { name: "Station ShortName" }).fill("DBA");
//   await page.locator(".items-center > .border-4").click();
//   await page.locator(".items-center > .border-4").click();
//   await page.locator("div:nth-child(4) > img:nth-child(14)").click();
//   await page.getByRole("button", { name: "Cancel" }).click();
//   await page.waitForTimeout(3000);
// });
