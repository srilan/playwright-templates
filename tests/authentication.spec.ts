import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { loginDetails } from "../config/testdata";

dotenv.config();

const cardsUrl = process.env.CARDS || "";
const loginUrl = process.env.LOGIN || "";
const homepageUrl = process.env.HOMEPAGE || "";
const loginCardsUrl = process.env.LOGINCARDS || "";

const adminUsername = loginDetails.username;
const adminPassword = loginDetails.password;

//Go to the starting url before each test
test.beforeEach(async ({ page }) => {
  await page.goto(loginUrl);
  await expect(page).toHaveURL(loginUrl);
});

test.describe("Positive login test with username and password textboxes and Sign In/Login button", () => {
  test(
    "Visibility and filling of textbox with valid username",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and filling of the username textbox using valid credentials",
      },
    },
    async ({ page }) => {
      const usernameTextbox = page.getByTestId("username");

      // Fills up Username textbox if it is visible
      if (await usernameTextbox.isVisible()) {
        await usernameTextbox.click();
        await usernameTextbox.fill(adminUsername);
      } else {
        throw new Error("Username field not found");
      }
    }
  );

  test(
    "Visibility and filling of textbox with valid password",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and filling of the password textbox using valid credentials",
      },
    },
    async ({ page }) => {
      // check Password textbox visibility
      const passwordTextbox = page.getByTestId("password");

      // Fill up Password textbox visibility if it is visible
      if (await passwordTextbox.isVisible()) {
        await passwordTextbox.click();
        await passwordTextbox.fill(adminPassword);
      } else {
        throw new Error("Password field not found");
      }
    }
  );

  test(
    "Visibility and Interaction of Sign In/Login Button",
    {
      annotation: {
        type: "description",
        description:
          "Tests the visibility and interaction of Sign In/Login Button with the valid credentials",
      },
    },
    async ({ page }) => {
      const usernameTextbox = page.getByTestId("username");
      const passwordTextbox = page.getByTestId("password");
      const signInButton = page.getByTestId("signInButton");

      await usernameTextbox.click();
      await usernameTextbox.fill(adminUsername);
      await passwordTextbox.click();
      await passwordTextbox.fill(adminPassword);

      if (await signInButton.isVisible()) {
        await signInButton.click();
      } else {
        throw new Error("Sign In button not found");
      }

      //Successful Login Verification in the Admin Homepage
      await expect(page).toHaveURL(loginCardsUrl);
    }
  );
});

test.describe("Negative login test using invalid/empty username and password", () => {
  test(
    "Sign in/Login using invalid username",
    {
      annotation: {
        type: "description",
        description:
          "Tests the input of username textbox using invalid credentials + expected error handling message",
      },
    },
    async ({ page }) => {
      const usernameTextbox = page.getByTestId("username");
      const passwordTextbox = page.getByTestId("password");
      const signInButton = page.getByTestId("signInButton");

      // Fills up Username textbox if it is visible
      if (await usernameTextbox.isVisible()) {
        await usernameTextbox.click();
        await usernameTextbox.fill("catto");
      } else {
        throw new Error("Username field not found");
      }

      await passwordTextbox.click();
      await passwordTextbox.fill(adminPassword);

      await signInButton.click();

      // expects page to show the appropiate error message through React notification component
      await expect(
        page.locator(
          'div.rnc__notification-message:has-text("User does not Exist!")'
        )
      ).toHaveText("User does not Exist!");
    }
  );

  test(
    "Sign in/Login using invalid password",
    {
      annotation: {
        type: "description",
        description:
          "Tests the input of password textbox using invalid credentials + expected error handling message",
      },
    },
    async ({ page }) => {
      const usernameTextbox = page.getByTestId("username");
      const passwordTextbox = page.getByTestId("password");
      const signInButton = page.getByTestId("signInButton");

      await usernameTextbox.click();
      await usernameTextbox.fill(adminUsername);

      // Fills up Password textbox if it is visible
      if (await passwordTextbox.isVisible()) {
        await passwordTextbox.click();
        await passwordTextbox.fill("arf");
      } else {
        throw new Error("Password field not found");
      }

      await signInButton.click();

      // expects page to show the appropiate error message through React notification component
      await expect(
        page.locator(
          'div.rnc__notification-message:has-text("Invalid Password")'
        )
      ).toHaveText("Invalid Password");
    }
  );

  test("Sign in/Login with empty username and password fields", async ({
    page,
  }) => {
    const signInButton = page.getByTestId("signInButton");
    await signInButton.click();

    // expects page to show the appropiate error message through React notification component
    await expect(
      page.locator(
        'div.rnc__notification-message:has-text("Incomplete Fields")'
      )
    ).toHaveText("Incomplete Fields");
  });
});

test("Successful Logout of Admin account after logging in", async ({
  page,
}) => {
  //Calls the function "AdminLogin" to access the Admin Home page
  await AdminLogin(page);

  // check "Logout" link/button visibility
  const logoutButton = page.getByTestId("Logout Link");
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  } else {
    throw new Error("Logout link/button not found");
  }
  await page.goto(homepageUrl);
  await expect(page).toHaveURL("https://d-mrt-fe.onrender.com/Taft/In#");
});

// Function to perform the login process
async function AdminLogin(page) {
  const usernameTextbox = page.getByTestId("username");
  const passwordTextbox = page.getByTestId("password");
  const signInButton = page.getByTestId("signInButton");

  await usernameTextbox.click();
  await usernameTextbox.fill(adminUsername);
  await passwordTextbox.click();
  await passwordTextbox.fill(adminPassword);

  await signInButton.click();

  //Successful Login Verification in the Admin Homepage
  await expect(page).toHaveURL(loginCardsUrl);
}
