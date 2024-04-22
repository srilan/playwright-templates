import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto("https://d-mrt-fe.onrender.com/AdminLogin#");
  await expect(page).toHaveURL("https://d-mrt-fe.onrender.com/AdminLogin#");
});

//Positive Log in Test
test.describe("PositiveLogIn", () => {
  test("Username", async ({ page }) => {
    const UsernameTextbox = page.getByTestId("username");

    // Fills up Username textbox if it is visible
    if (await UsernameTextbox.isVisible()) {
      await UsernameTextbox.click();
      await UsernameTextbox.fill("cat");
    } else {
      throw new Error("Username field not found");
    }
  });

  test("Password", async ({ page }) => {
    // check Password textbox visibility
    const PasswordTextbox = page.getByTestId("password");

    // Fill up Password textbox visibility if it is visible
    if (await PasswordTextbox.isVisible()) {
      await PasswordTextbox.click();
      await PasswordTextbox.fill("meow");
    } else {
      throw new Error("Password field not found");
    }
  });

  test("Sign in", async ({ page }) => {
    // Load the saved storage state from the JSON file
    //await page.context().storageState({ path: "AdminLoginCredentials.json" });

    const UsernameTextbox = page.getByTestId("username");
    const PasswordTextbox = page.getByTestId("password");
    const SignInButton = page.getByTestId("signInButton");

    await UsernameTextbox.click();
    await UsernameTextbox.fill("cat");
    await PasswordTextbox.click();
    await PasswordTextbox.fill("meow");

    if (await SignInButton.isVisible()) {
      await SignInButton.click();
    } else {
      throw new Error("Sign In button not found");
    }

    // // Once logged in, retrieve the access token from local storage
    // const accessToken = await page.evaluate(() => {
    //   return localStorage.getItem("access_token");
    // });

    const successfulLoggedInURL =
      "https://d-mrt-fe.onrender.com/UUIDManagement";
    await expect(page).toHaveURL(successfulLoggedInURL);
  });
});

//Negative Log in Test
test.describe("NegativeLogIn", () => {
  //Sign In using Invalid Username
  test("InvalidUsername", async ({ page }) => {
    test("Username", async ({ page }) => {
      const UsernameTextbox = page.getByTestId("username");
      const PasswordTextbox = page.getByTestId("password");
      const SignInButton = page.getByTestId("signInButton");

      // Fills up Username textbox if it is visible
      if (await UsernameTextbox.isVisible()) {
        await UsernameTextbox.click();
        await UsernameTextbox.fill("catto");
      } else {
        throw new Error("Username field not found");
      }

      await PasswordTextbox.click();
      await PasswordTextbox.fill("meow");

      await SignInButton.click();

      await expect(
        page.locator(
          'div.rnc__notification-message:has-text("User does not Exist!")'
        )
      ).toHaveText("User does not Exist!");
    });

    //Sign In using Invalid Password
    test("InvalidPassword", async ({ page }) => {
      const UsernameTextbox = page.getByTestId("username");
      const PasswordTextbox = page.getByTestId("password");
      const SignInButton = page.getByTestId("signInButton");

      await UsernameTextbox.click();
      await UsernameTextbox.fill("cat");

      // Fills up Password textbox if it is visible
      if (await PasswordTextbox.isVisible()) {
        await PasswordTextbox.click();
        await PasswordTextbox.fill("arf");
      } else {
        throw new Error("Password field not found");
      }

      await SignInButton.click();

      await expect(
        page.locator(
          'div.rnc__notification-message:has-text("Invalid Password")'
        )
      ).toHaveText("Invalid Password");
    });
  });

  //Sign In with Empty Fields
  test("NoUsernamePassword", async ({ page }) => {
    const SignInButton = page.getByTestId("signInButton");

    await SignInButton.click();

    await expect(
      page.locator(
        'div.rnc__notification-message:has-text("Incomplete Fields")'
      )
    ).toHaveText("Incomplete Fields");
  });
});

// Function to perform the sign-in process
async function AdminLogin(page) {
  const isLoggedIn = await page.isVisible("Logout");

  if (!isLoggedIn) {
    const UsernameTextbox = page.getByTestId("username");
    const PasswordTextbox = page.getByTestId("password");
    const SignInButton = page.getByTestId("signInButton");

    await UsernameTextbox.click();
    await UsernameTextbox.fill("cat");
    await PasswordTextbox.click();
    await PasswordTextbox.fill("meow");

    await SignInButton.click();

    const successfulLoggedInURL =
      "https://d-mrt-fe.onrender.com/UUIDManagement";

    await expect(page).toHaveURL(successfulLoggedInURL);
  }
}

//Create new UUID Card
test.describe("AddNewCard", () => {
  test("BeepCardField", async ({ page }) => {
    //Calls the function "AdminLogin" to access the Admin Home page
    await AdminLogin(page);

    // check "Add new card", ""Generate card", or "New Card" and clicks if it is visible
    const NewCardButton = page.getByTestId("Create Beep Card Button");
    if (await NewCardButton.isVisible()) {
      await NewCardButton.click();
    } else {
      throw new Error("New card button not found");
    }

    // check Beep Card textbox visibility
    const BeepCardTextbox = page.getByTestId("New Beep Card Input Field");
    if (await BeepCardTextbox.isVisible()) {
      await BeepCardTextbox.click();
    } else {
      throw new Error("Beep Card textbox not found");
    }

    // check UUID RNG button visibility and clicks if it is visible
    const UuidRngButton = page.getByTestId("generateUUID");

    if (await UuidRngButton.isVisible()) {
      await UuidRngButton.click();
    } else {
      throw new Error("UUID RNG Button not found");
    }

    const BalanceTextbox = page.getByTestId("Balance Value Input Field");

    // Fills up Balance textbox if it is visible
    if (await BalanceTextbox.isVisible()) {
      await BalanceTextbox.click();
      await BalanceTextbox.fill("500");
    } else {
      throw new Error("Username field not found");
    }

    const CreateButton = page.getByTestId("Create Beep Card Button").last();

    // check Create UUID confirmation button visibility and clicks if it is visible
    if (await CreateButton.isVisible()) {
      await CreateButton.click();
    } else {
      throw new Error(" Create UUID Button not found");
    }

    // expects page to show the appropiate error message through React notification component
    await expect(
      page.locator(
        'div.rnc__notification-message:has-text("Beep Card has been Successfuly Created")'
      )
    ).toHaveText("Beep Card has been Successfuly Created");
  });
});
