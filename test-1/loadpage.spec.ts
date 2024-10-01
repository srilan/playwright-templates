import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { loginDetails } from "../config/testdata";
import { assert } from "console";

dotenv.config();

const testUrl = process.env.AAAAA || "";

//Go to the starting url before each test
test.beforeEach(async ({ page }) => {
  await page.goto(testUrl);
  const contactName = page.getByTestId("ContactName");
  await expect(contactName).toBeVisible();
});

test.describe("Contact Page", () => {
  test(
    "Send contact form - success",
    {
      annotation: {
        type: "description",
        description:
          "Send contact form providing all information....",
      },
    },
    async ({ page }) => {
      const contactName = page.getByTestId("ContactName");
      const contactEmail = page.getByTestId("ContactEmail");
      const contactPhone = page.getByTestId("ContactPhone");
      const contactSubject = page.getByTestId("ContactSubject");
      const constactDescription = page.getByTestId("ContactDescription");

      const submitBtn = page.locator("#submitContact");

      // Fills up Username textbox if it is visible
      if (await contactEmail.isVisible() && await contactEmail.isVisible()
       && await contactEmail.isVisible() && await contactEmail.isVisible()) {
        await contactName.click();
        await contactName.fill("John Doe");
        await contactEmail.click();
        await contactEmail.fill("johndoe@aaa.com");
        await submitBtn.click();
      } else {
        throw new Error("Some fields are missing");
      }
    }
  );

});
