import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { loginDetails } from "../config/testdata";
import { assert } from "console";
import * as TestData from "./data/test.data.json"

dotenv.config();

const testUrl = process.env.CALCULATOR_URL || "";

//Go to the starting url before each test
test.beforeEach(async ({ page }) => {
  await page.goto(testUrl);
  const disabilityRating = page.getByText("90%");
  await expect(disabilityRating).toBeVisible();
});

test.describe("Sample Computation", () => {
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
      const contactName = page.getByTestId(TestData.testCase1.inputs);
      if (contactName) {
        await contactName.first().click();
        assert(await contactName.textContent() === TestData.testCase1.expectedResults);
      } else {
        throw new Error("Some fields are missing");
      }
    }
  );

});
