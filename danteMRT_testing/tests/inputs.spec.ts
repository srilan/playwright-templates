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


// Container of tests
test.describe("Text Inputs testing", () => {


  // Test for Admin Login 
  test("Admin Login", async ({ page }) => {
    await page.getByRole("link", { name: "Admin", exact: true }).click();

    // const userTextBox = page.locator(`[name="Usernaasdsadme"]`);

    const userTextBox = await page
      .getByRole("textbox", { name: "Username" })
      .isVisible();

    const passTextBox = await page
      .getByRole("textbox", { name: "******************" })
      .isVisible();


     // TestIds
      const usernameField = page.getByTestId("username")
      const passwordField = page.getByTestId("password")
      const signInButton = page.getByTestId("signInButton")

    if (userTextBox && passTextBox) {
      try {

      await usernameField.click();
      await usernameField.fill(username);
      await passwordField.click();
      await passwordField.fill(password);

      await signInButton.click();

      await page.waitForTimeout(5000);
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


  //Creation of new Station "San Juan"
  test("Creation of new Station", async ({ browser }) => {
    //uses token in json file to access the admin page after opening a new browser
    const context = await browser.newContext({ storageState: "admin.json" });

    //opens a new browser
    const page = await context.newPage();

    //testIds

    const stationNameField = page.getByTestId("StationName Input")
    const shortNameField = page.getByTestId("ShortName Input")
    const longitudeField = page.getByTestId("Coordinates Input for CoordinateX")
    const latitudeField = page.getByTestId("Coordinates Input for CoordinateY")
    const confirmButton = page.getByTestId("CreateEdit_Button")
    const cancelButton = page.getByTestId("Cancel_Button")

    try{
    await page.goto(Stations);

    //clicks and fill station details
    await page.getByRole("button", { name: "NEW STATION" }).click();
    await stationNameField.click();
    await stationNameField.fill(stationName);
    await shortNameField.click();
    await shortNameField.fill(shortName);

    //clicks and fill the longitude and latitude
    await longitudeField.click();
    await longitudeField.fill(lng);
    await latitudeField.click();
    await latitudeField.fill(lat);

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

    await page.waitForTimeout(5000);


    }catch(err){
    console.log("Error in Creating Station");
    }
  });


  // Updates the exisiting station "San Juan"
  test("Editing of Station", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "admin.json" });
    const page = await context.newPage();

    await page.goto(Stations);
    await page.waitForTimeout(5000);

     //testIds

     const stationNameField = page.getByTestId("StationName Input")
     const shortNameField = page.getByTestId("ShortName Input")
     const longitudeField = page.getByTestId("Coordinates Input for CoordinateX")
     const latitudeField = page.getByTestId("Coordinates Input for CoordinateY")
     const confirmButton = page.getByTestId("CreateEdit_Button")
     const cancelButton = page.getByTestId("Cancel_Button")

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
        await stationNameField.fill(newStationName);
        await shortNameField.click();
        await shortNameField.clear();
        await shortNameField.fill(newShortName);

        //clicks and fill the longitude and latitude
        await longitudeField.click();
        await longitudeField.clear();
        await longitudeField.fill(newLng);
        await latitudeField.click();
        await latitudeField.clear();
        await latitudeField.fill(newLat);

        //clicks comboBox
        await page.locator(".css-19bb58m").click();

        //clicks on the the corresponding option
        await page.getByRole("option", { name: "Ayala Station" }).click();

        //clicks to remove the option
        await page.getByLabel("Remove iNO").click();

        await confirmButton.click();
      } else {
        console.log("Station Not Found");
      }
    } catch (err) {
      console.log("Error in Editing Station");
    }
  });


  //Deletes the Station "San Juan"
  test("Deletion of Station", async ({ browser }) => {
    const context = await browser.newContext({ storageState: "admin.json" });
    const page = await context.newPage();

    await page.goto(Stations);
    await page.waitForTimeout(5000);


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

//Station Management

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
