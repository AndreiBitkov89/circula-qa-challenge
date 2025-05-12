import { Page, expect } from "@playwright/test";
import { PrivacyPopup } from "./PrivacyPopup";

export class SignInPage {
  private page: Page;
  private privacyPopup: PrivacyPopup;


  constructor(page: Page) {
    this.page = page;
    this.privacyPopup = new PrivacyPopup(this.page)
  }

  async getSignInPage(): Promise<this> {
    await this.privacyPopup.closeIfVisible();

    await expect(
      this.page.getByRole("textbox", { name: "E-mail address" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("textbox", { name: "Password Show password" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", { name: "Sign in" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("link", { name: "Start a free trial" })
    ).toBeVisible();

    return this;
  }

  async goToTrial(): Promise<this> {
    await this.page.getByRole("link", { name: "Start a free trial" }).click();
    return this;
  }
}
