import { test, expect } from "@playwright/test";

let username = "cat";
let password = "meow";

const StationsLink = "https://d-mrt-fe.onrender.com/StationManagement#";
const CardsLink = "https://d-mrt-fe.onrender.com/UUIDManagement#";
const GeneralLink = "https://d-mrt-fe.onrender.com/FareManagement#";
const LogOutLink = "https://d-mrt-fe.onrender.com/Taft/In#";

test.beforeEach(async ({ page }) => {
  await page.goto("https://d-mrt-fe.onrender.com/taft/in");
});

test.describe("Navigation", () => {

    test("stations", async ({ page }) => {
      
      //for authentication
      await page.getByRole("link", { name: "Admin", exact: true }).click();
      await page.getByRole("textbox", { name: "Username" }).click();
      await page.getByRole("textbox", { name: "Username" }).fill("cat");
      await page.getByRole("textbox", { name: "******************" }).click();
      await page.getByRole("textbox", { name: "******************" }).fill("meow");
      await page.getByRole("button", { name: "Sign In" }).click();
      await page.waitForTimeout(3000);
      //Navigation
      await page.getByRole("link", { name: "Stations" }).click();
      await page.waitForTimeout(3000);

      //verification of url 
      await expect(page).toHaveURL(StationsLink);
      expect(await page.goto('https://d-mrt-fe.onrender.com/StationManagement#'));
      await page.goto('https://d-mrt-fe.onrender.com/AdminLogin');
      await page.getByTestId('Admin Link').click({ button: 'right' });
      await page.waitForTimeout(3000);
      //page.waitForSelector('role=columnheader').toContain("Station Name");
      //Verification of text content within the navigation links
      expect(await page.textContent("role=columnheader")).toContain("Station Name");
      //visibility & error handling of non-existing link
      const linkExists = page.locator('a[name="Stations"]');9
      
    
      if (linkExists) {
        console.log("Exist link");
      } else {
        console.log("Does not have any link");
      }
     
    });
  
  
  
    test("Cards", async ({ page }) => {
      //for authentication
      await page.getByRole("link", { name: "Admin", exact: true }).click();
      await page.getByRole("textbox", { name: "Username" }).click();
      await page.getByRole("textbox", { name: "Username" }).fill("cat");
      await page.getByRole("textbox", { name: "******************" }).click();
      await page.getByRole("textbox", { name: "******************" }).fill("meow");
      await page.getByRole("button", { name: "Sign In" }).click();
      await page.waitForTimeout(3000);
      //Navigation
      await page.getByRole("link", { name: "Cards" }).click();
      await page.waitForTimeout(3000);
      //verification of url 
      await expect(page).toHaveURL(CardsLink);
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
      //for authentication
      await page.getByRole("link", { name: "Admin", exact: true }).click();
      await page.getByRole("textbox", { name: "Username" }).click();
      await page.getByRole("textbox", { name: "Username" }).fill("cat");
      await page.getByRole("textbox", { name: "******************" }).click();
      await page.getByRole("textbox", { name: "******************" }).fill("meow");
      await page.getByRole("button", { name: "Sign In" }).click();
      await page.waitForTimeout(3000);
      //Navigation
      await page.getByRole("link", { name: "General" }).click();
      await page.waitForTimeout(3000);
      //verification of url 
      await expect(page).toHaveURL(GeneralLink);
      //Verification of text content within the navigation links
      expect(await page.textContent("role=button")).toContain("Operational Mode", );
      //visibility & error handling of non-existing link
      const linkExists = page.locator('a[name="General"]');
    
      if (linkExists) {
        console.log("Exist link");
      } else {
        console.log("Does not have any link");
      }
  
    });
  
    test("Log Out", async ({ page }) => {
      await page.waitForTimeout(3000);
      //for authentication
      await page.getByRole("link", { name: "Admin", exact: true }).click();
      await page.getByRole("textbox", { name: "Username" }).click();
      await page.getByRole("textbox", { name: "Username" }).fill("cat");
      await page.getByRole("textbox", { name: "******************" }).click();
      await page.getByRole("textbox", { name: "******************" }).fill("meow");
      await page.getByRole("button", { name: "Sign In" }).click();
      await page.waitForTimeout(3000);
      //Navigation
      await page.getByRole("link", { name: "Log Out" }).click();
      //verification of url 
      await expect(page).toHaveURL(LogOutLink);
      await page.goto("https://d-mrt-fe.onrender.com/StationManagement#");
      await expect(page).toHaveURL("https://d-mrt-fe.onrender.com/AdminLogin");
      //visibility & error handling of non-existing link
      const linkExists = page.locator('a[name="Log Out"]');
    
      if (linkExists) {
        console.log("Exist link");
      } else {
        console.log("Does not have any link");
      }
    });

  
  });
  