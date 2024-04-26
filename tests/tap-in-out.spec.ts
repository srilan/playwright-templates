import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const cardsUrl = process.env.CARDS || "";
const loginUrl = process.env.LOGIN || "";
const homepageUrl = process.env.HOMEPAGE || "";
const kamuningIn = process.env.KAMUNING || "";
const boniOut = process.env.BONI || "";
const validUuid = process.env.UUID || "";
const startingStation = process.env.STARTINGSTATION || "";
const endingStation = process.env.ENDINGSTATION || "";

//Go to the starting station url (Kamuning Station) before each test
test.beforeEach(async ({ page }) => {
  await page.goto(kamuningIn);
  await expect(page).toHaveURL(kamuningIn);
});

test.describe("Positive Tap in test with UUID textbox, Tap in button, and details shown", () => {
  test(
    "Visibility and filling of UUID textbox with a valid UUID number",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and filling of the UUID textbox using a valid UUID number",
      },
    },
    async ({ page }) => {
      const beepCardTextbox = page.getByTestId("beepCardTextbox");

      // Fills up Beep Card textbox if it is visible //Add checker that text fields only has number inside
      if (await beepCardTextbox.isVisible()) {
        await beepCardTextbox.click();
        await beepCardTextbox.fill(validUuid);
      } else {
        throw new Error("Beep Card field not found");
      }
    }
  );

  test(
    "Visibility and Interaction of Tap In Button",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and interaction of Tap In Button with the valid UUID",
      },
    },
    async ({ page }) => {
      const tapInOutButton = page.getByTestId("tapInOutButton");

      // Fills up Beep Card textbox if it is visible
      if (await tapInOutButton.isVisible()) {
        await tapInOutButton.click();
      } else {
        throw new Error("Tap in/out Button not found");
      }
    }
  );

  test(
    "Visibility and Verification of Origin and Balance details in Tap In user interface",
    {
      annotation: {
        type: "description",
        description:
          "Checks if the Origin and Balance details in the Tap In user interface display the correct information",
      },
    },
    async ({ page }) => {
      const originLabel = page.getByTestId("startOriginLabel");
      const startOriginLabelContent = page.getByTestId(
        "startOriginLabelContent"
      );

      // Expect the element to be visible on the page
      await expect(originLabel).toBeVisible();
      await expect(startOriginLabelContent).toHaveText(startingStation);

      const startBalanceLabel = page.getByTestId("startBalanceLabel");
      const startBalanceLabelContent = page.getByTestId(
        "startBalanceLabelContent"
      );
    }
  );
});
