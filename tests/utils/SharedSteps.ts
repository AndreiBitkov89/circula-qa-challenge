import { Page } from "@playwright/test";
import { SignInPage } from "../../pages/SignInPage"
import { SignUnPage } from "../../pages/SignUpPage";
import { DataGenerator } from "./DataGenerator";
;
export async function registerUntilCompanyStep(page: Page) {
  const signIn = new SignInPage(page);
  const signUp = new SignUnPage(page);
  const email = DataGenerator.generateEmail();
  const password = DataGenerator.generatePassword();

  await page.goto("/");
  await (await signIn.getSignInPage()).goToTrial();
  await (await signUp.getSignUpPage()).fillData(email, password);
  await (
    await signUp.getContractDetails()
  ).fillContractDetails(
    DataGenerator.generateFirstName(),
    DataGenerator.generateLastName(),
    DataGenerator.generatePhoneNumber()
  );
  await signUp.getCompanyInformation();

  return { signUp, email };
}