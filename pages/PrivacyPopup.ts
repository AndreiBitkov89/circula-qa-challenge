import { Page, expect } from "@playwright/test";

export class PrivacyPopup {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async closeIfVisible() {
    const popup = this.page.getByTestId("uc-heading-title");

    try {
      await popup.waitFor({ state: "visible", timeout: 3000 });
      await this.page.getByTestId("uc-accept-all-button").click();
      await expect(popup).not.toBeVisible({ timeout: 1000 });
    } catch {}
  }
}
