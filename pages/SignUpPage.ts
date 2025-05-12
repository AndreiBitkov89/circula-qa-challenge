import { Page, expect, Locator } from "@playwright/test";
import { PrivacyPopup } from "./PrivacyPopup";

export class SignUnPage {
  private page: Page;
  private privacyPopup: PrivacyPopup;

  constructor(page: Page) {
    this.page = page;
    this.privacyPopup = new PrivacyPopup(this.page);
  }

  get title(): Locator {
    return this.page.getByRole("heading", {
      name: "Start your 14-day free trial",
    });
  }

  async getSignUpPage(): Promise<this> {
    await this.privacyPopup.closeIfVisible();
    await expect(
      this.page.getByRole("textbox", { name: "Work email" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("textbox", { name: "Password" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", { name: "Try for free" })
    ).toBeVisible();

    return this;
  }

  async fillData(email: string, password: string) {
    await this.page.getByRole("textbox", { name: "Work email" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);

    await this.page
      .locator('input[name="acceptTos"]')
      .evaluate((el: HTMLInputElement) => el.click());
    await this.page.getByRole("button", { name: "Try for free" }).click();
  }

  async getContractDetails(): Promise<this> {
    await expect(
      this.page.getByRole("heading", { name: "Your contact details" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("textbox", { name: "First name" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("textbox", { name: "Last name" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("textbox", { name: "Phone number" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", { name: "Next step" })
    ).toBeVisible();

    return this;
  }

  async fillContractDetails(name: string, lastName: string, phone: string) {
    await this.page.getByRole("textbox", { name: "First name" }).fill(name);
    await this.page.getByRole("textbox", { name: "Last name" }).fill(lastName);
    await this.page.getByRole("textbox", { name: "Phone number" }).fill(phone);

    await this.page.getByRole("button", { name: "Next step" }).click();
  }

  async getCompanyInformation(): Promise<this> {
    await expect(
      this.page.getByRole("heading", { name: "Company information" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("textbox", { name: "Company name" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("combobox", { name: "Where’s your company" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", { name: "Choose channel" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", { name: "Create an account" })
    ).toBeVisible();

    return this;
  }

  async fillCompanyInformation(
    company: string,
    country: string,
    channel: string,
    useList: boolean = false
  ) {
    await this.page
      .getByRole("textbox", { name: "Company name" })
      .fill(company);

    if (useList) {
      await this.selectCountryFromList(country);
    } else {
      await this.selectCountry(country);
    }

    await this.page.getByRole("button", { name: "Choose channel" }).click();
    await this.page.getByText(channel).click();
  }

  async verifyCountryIsPresentInList(country: string): Promise<void> {
    await this.page
      .getByRole("combobox", { name: "Where’s your company" })
      .click();
    const option = this.page.locator(
      '[data-testid="autocomplete-menu-portal"] li',
      { hasText: country }
    );
    await option.scrollIntoViewIfNeeded();
    await expect(option).toBeVisible();
  }

  async selectCountry(country: string) {
    const combobox = this.page.getByRole("combobox", {
      name: "Where’s your company",
    });
    await combobox.click();
    await combobox.press("Control+A");
    await combobox.press("Backspace");  
    await combobox.fill("");//added here for double check - sometimes don't clear
    await expect(combobox).toBeEmpty();
    await combobox.fill(country);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  async selectCountryFromList(country: string) {
    await this.page
      .getByRole("combobox", { name: "Where’s your company" })
      .click();

    const option = this.page.locator(
      '[data-testid="autocomplete-menu-portal"] li',
      { hasText: country }
    );

    await expect(option).toBeVisible({ timeout: 5000 });
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await expect(option).toBeVisible({visible: false });

    await expect(this.page.locator('input[name="country"]')).toHaveValue(
      country
    );
  }

  async createAccount(): Promise<this> {
    this.page.getByRole("button", { name: "Create an account" }).click();

    return this;
  }

  async getCountryName(): Promise<string | null> {
    const countryName: string | null = await this.page
      .locator('input[name="country"]')
      .inputValue();
    return countryName;
  }

  async checkSuccess(email: string) {
    await expect(
      this.page.getByText("Great! Now please verify your")
    ).toBeVisible();

    await expect(this.page.getByText(`${email}`)).toBeVisible();
  }
}
