import { test, expect, request } from "@playwright/test";
import { DataGenerator } from "./utils/DataGenerator";

test.describe("API tests with Sweden", () => {

  const country: string = "Sweden"
  const abbreviation: string = "SE"
  const token: string = 'ar5g4iuu-5nvjF2OZrBCQBRHxvv_ItK7WGt0.VJX/y/+Uhvore95pxgphWGlO3AGXTCDxe0koHNJ0d44'

  test("Validate Sweden in countries list", async ({ request }) => {
    const response = await request.get(
      "https://circula-qa-challenge.vercel.app/api/countries?locale=en&intent=REGISTRATION"
    );
    expect(response.ok()).toBeTruthy();

    const countries = await response.json();

    const countryNames = countries.map((c: any) => c.name);
    expect(countryNames).toContain(country);
  });

  test("Send request on account registration with Sweden", async ({
    request,
  }) => {
    const response = await request.post(
      "https://circula-qa-challenge.vercel.app/api/ironbank/api/v0/registration/register",
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'x-csrf-token': token,
          'Cookie': `csrf_token=${token}`
        },
        data: {
          email: DataGenerator.generateEmail(),
          password: DataGenerator.generatePassword(),
          sendNewsletter: false,
          firstname: DataGenerator.generateFirstName(),
          lastname: DataGenerator.generateLastName(),
          phoneNumber: DataGenerator.generatePhoneNumber(),
          organizationName: DataGenerator.generateCompanyName(),
          country: abbreviation
        }
      }
    );

    console.log(response.status())
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.errorCode).toBe(0);
  });
});
