import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { transactCardDetails } from "../config/testdata";

dotenv.config();

const kamuningIn = process.env.KAMUNING || "";
const boniOut = process.env.BONI || "";

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

      //Expects the geolocation map to be fully visible
      await expect(page.getByTestId("MapLeafTest")).toBeVisible();

      // Fills up Beep Card textbox if it is visible
      if (await beepCardTextbox.isVisible()) {
        await beepCardTextbox.click();
        await beepCardTextbox.fill(transactCardDetails.uuid);
      } else {
        throw new Error("Beep Card field not found");
      }
    }
  );

  test(
    "Visibility and Verification of Origin and Balance details in Tap In user interface and verification of Tap In Button",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and interaction of Tap In Button using a valid UUID with a verification of successful Tap in and checks if the Origin and Balance details in the Tap In user interface display the correct information",
      },
    },
    async ({ page }) => {
      const originLabel = page.getByTestId("startOriginLabel");
      const startOriginLabelContent = page.getByTestId(
        "startOriginLabelContent"
      );
      const tapInOutButton = page.getByTestId("tapInOutButton");
      const beepCardTextbox = page.getByTestId("beepCardTextbox");

      //Expects the geolocation map to be fully visible
      await expect(page.getByTestId("MapLeafTest")).toBeVisible();

      // Fills up Beep Card textbox
      await beepCardTextbox.click();
      await beepCardTextbox.fill(transactCardDetails.uuid);

      if (await tapInOutButton.isVisible()) {
        await tapInOutButton.click();
      } else {
        throw new Error("Tap in/out Button not found");
      }

      await expect(
        page.locator('div.rnc__notification-title:has-text("Tap in Success!")')
      ).toHaveText("Tap In Success!");

      // Expect the element to be visible on the page
      await expect(originLabel).toBeVisible();
      await expect(startOriginLabelContent).toHaveText(
        transactCardDetails.startingStation
      );

      const startBalanceLabel = page.getByTestId("startBalanceLabel");
      const startBalanceLabelContent = page.getByTestId(
        "startBalanceLabelContent"
      );

      await expect(startBalanceLabel).toBeVisible();
      await expect(startBalanceLabelContent).toHaveText(
        transactCardDetails.startingBalance
      );
    }
  );
});

test.describe("Positive Tap out test with UUID textbox, Tap out button, and details shown", () => {
  test(
    "Visibility and filling of Tap out UUID textbox with a valid UUID number",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and filling of the Tap out UUID textbox using a valid UUID number",
      },
    },
    async ({ page }) => {
      const beepCardTextbox = page.getByTestId("beepCardTextbox");

      await page.goto(boniOut);
      await expect(page).toHaveURL(boniOut);

      //Expects the geolocation map to be fully visible
      await expect(page.getByTestId("MapLeafTest")).toBeVisible();

      // Fills up Tap in Beep Card textbox if it is visible
      if (await beepCardTextbox.isVisible()) {
        await beepCardTextbox.click();
        await beepCardTextbox.fill(transactCardDetails.uuid);
      } else {
        throw new Error("Beep Card field not found");
      }
    }
  );

  test(
    "Visibility and Interaction of Tap Out Button and Verification of Origin, Destination, Total Distance, Charge, Old Balance, and New Balance details in Tap Out user interface",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and interaction of Tap out Button with the valid UUID and checks if the Origin, Destination, Total Distance, Charge, Old Balance, and New Balance details in the Tap Out user interface display the correct information",
      },
    },
    async ({ page }) => {
      const beepCardTextbox = page.getByTestId("beepCardTextbox");
      const tapInOutButton = page.getByTestId("tapInOutButton");

      const endOriginLabel = page.getByTestId("endOriginLabel");
      const endOriginLabelContent = page.getByTestId("endOriginLabelContent");
      const endDestinationLabel = page.getByTestId("endDestinationLabel");
      const endDestinationLabelContent = page.getByTestId(
        "endDestinationLabelContent"
      );
      const endTotalDistanceLabel = page.getByTestId("endTotalDistanceLabel");
      const endTotalDistanceContent = page.getByTestId(
        "endTotalDistanceContent"
      );
      const endChargeLabel = page.getByTestId("endChargeLabel");
      const endChargeLabelContent = page.getByTestId("endChargeLabelContent");
      const endOldBalanceLabel = page.getByTestId("endOldBalanceLabel");
      const enOldBalanceContent = page.getByTestId("enOldBalanceContent");
      const endNewBalanceLabel = page.getByTestId("endNewBalanceLabel");
      const endNewBalanceContent = page.getByTestId("endNewBalanceContent");

      await page.goto(boniOut);
      await expect(page).toHaveURL(boniOut);

      //Expects the geolocation map to be fully visible
      await expect(page.getByTestId("MapLeafTest")).toBeVisible();

      await beepCardTextbox.click();
      await beepCardTextbox.fill(transactCardDetails.uuid);

      if (await tapInOutButton.isVisible()) {
        await tapInOutButton.click();
      } else {
        throw new Error("Tap in/out Button not found");
      }

      await expect(
        page.locator('div.rnc__notification-title:has-text("Tap Out Success!")')
      ).toHaveText("Tap Out Success!");

      expect(endOriginLabel).toBeVisible();
      await expect(endOriginLabelContent).toHaveText(
        transactCardDetails.startingStation
      );

      expect(endDestinationLabel.last()).toBeVisible();
      await expect(endDestinationLabelContent).toHaveText(
        transactCardDetails.endingStation
      );

      expect(endTotalDistanceLabel).toBeVisible();
      await expect(endTotalDistanceContent).toHaveText(
        transactCardDetails.totalDistance
      );

      expect(endChargeLabel).toBeVisible();
      await expect(endChargeLabelContent).toHaveText(
        transactCardDetails.totalCharge
      );

      expect(endOldBalanceLabel).toBeVisible();
      await expect(enOldBalanceContent).toHaveText(
        transactCardDetails.startingBalance
      );

      expect(endNewBalanceLabel).toBeVisible();
      await expect(endNewBalanceContent).toHaveText(
        transactCardDetails.newBalance
      );
    }
  );
});

test("Tap in with an empty UUID textbox field", {}, async ({ page }) => {
  const tapInOutButton = page.getByTestId("tapInOutButton");

  //Expects the geolocation map to be fully visible
  await expect(page.getByTestId("MapLeafTest")).toBeVisible();

  await expect(page.getByTestId("tapInOutButton")).toBeVisible();
  await tapInOutButton.click();

  await expect(
    page.locator(
      'div.rnc__notification-message:has-text("Beep Card must be 16 numbers")'
    )
  ).toHaveText("Beep Card must be 16 numbers");
});
