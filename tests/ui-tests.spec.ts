import { test, expect } from "@playwright/test";
import { DataGenerator } from "./utils/DataGenerator";
import { registerUntilCompanyStep } from "./utils/SharedSteps";

test.describe("@ui Check addition Sweden in the countries list", () => {
  const countryForCheck = "Sweden";
  const partName = "Swed";
  const channel = "DATEV";
  let company: string;

  test.beforeEach(async () => {
    company = DataGenerator.generateCompanyName();
  });

  test("Choose Sweden by typing the country manually and create account", async ({
    page,
  }) => {
    const { signUp, email } = await registerUntilCompanyStep(page);
    await signUp.fillCompanyInformation(company, countryForCheck, channel);
    expect(await signUp.getCountryName()).toBe(countryForCheck);
    await (await signUp.createAccount()).checkSuccess(email);
  });

  test("Choose Sweden in the countries list and create account", async ({
    page,
    context,
  }) => {
    if (context.browser()?.browserType().name() === "chromium") {
      test.skip(); //skip for Chrome due problems with interactions with the list of countries
    }

    const { signUp, email } = await registerUntilCompanyStep(page);
    await signUp.fillCompanyInformation(
      company,
      countryForCheck,
      channel,
      true
    );
    expect(await signUp.getCountryName()).toBe(countryForCheck);
    await (await signUp.createAccount()).checkSuccess(email);
  });

  test("Choose Sweden after entering part of the name", async ({ page }) => {
    const { signUp } = await registerUntilCompanyStep(page);
    await signUp.fillCompanyInformation(company, partName, channel);
    expect(await signUp.getCountryName()).toBe(countryForCheck);
  });
});
