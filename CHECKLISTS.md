## Task 1: Web - Verify that Sweden is correctly added to the list of selectable countries 

## UI country list behavior (visibility, layout, and selection)

1. Sweden appears in the dropdown list of countries (automated).
2. Adding a new country does not break the layout.
3. Sweden can be found by typing part of the name (e.g., "Swed")(automated).
4. Sweden can be selected by clicking in the country list(automated).
5. Sweden can be selected by typing and confirming with keyboard (ArrowDown + Enter)(automated).
6. Sweden appears as pre-filled value after being selected(automated).
7. The list hides when clicking outside or after selecting a country(automated).
8. Empty search shows the full list of available countries.
9. No results state is shown when searching for a non-existing country (e.g., "Xyz").
10. Possible to clear the country field and input another country(automated).
11. Scroll works in the list of countries(automated).

## Functional registration flow

12. After choosing Sweden, it's possible to complete the registration process successfully(automated).
13. Sweden is shown correctly in the user settings after email confirmation.
14. It's possible to register an account with other countries as well as Sweden.
15. Error message appears if no country is selected.
16. You can paste the country name and validate it as selected (currently not working, maybe it's defect).

## Country list content and API verification

17. Sweden is present in the `/api/countries?locale=en&intent=REGISTRATION` response(automated).
18. Sweden has the correct abbreviation code ("SE") in the response(automated).
19. Registration API `registration/register` accepts Sweden ("SE") as a valid country(automated).
20. API returns success `errorCode: 0` when Sweden is provided as the country(automated).
21. All other countries from the API also appear in the dropdown.
22. Countries are listed in correct alphabetical order.

## Cross-browser and Cross-device testing

23. All behaviors work in Chrome, WebKit, and Firefox (desktop)(automated).
24. All behaviors work in mobile Chrome and WebKit (iOS Safari) on popular resolutions according to analytics(automated).

## 5. Additional cases

25. Verify no duplication of countries in the list.
26. Verify list loading performance if the country list is large.
27. Check server response performance (latency, retry, or error handling).
28. Verify fallback behavior if the `/countries` API is unreachable (e.g., show error or disable selection).
29. Check that after confirming your email, the created account is available for authorization in the platform.

---
As examples of automation, I implemented several simple cases - creating an account with Sweden, entering values ​​by typing, selecting from a list, filtering by part of the name
Also tested are two cases written on the backend - creating an account with Sweden and removing Sweden from the backend.

During testing, I encountered the fact that selecting a country from the list on Chrome leads to the browser sticking and freezing, for Chrome this case is skipped and requires additional debugging. I used a simple POM and chain of invocations patterns. As example of further improvements can be implemented the builder for a new client.

Commands

![alt text](<Screenshot 2025-05-10 at 14.43.17.png>)

---

## Task 2: Android - Character limit validation on Purpose field

## Counter display behavior

1. Counter is not displayed when the field is empty (0 characters).
2. Counter is not displayed when the field contains 1 character.
3. Counter is not displayed when the field contains 499 characters.
4. Counter is displayed when the field reaches 500 characters.
5. Counter correctly updates the number of characters when incremented.
6. Counter correctly updates the character count when the character count decreases.
7. Counter updates correctly at 1001 characters (according to layout with display of excess first).
8. Counter disappears when the number of characters decreases to 499
9. Counter turns red after exceeding 1000 characters.
10. Counter returns to grey when reducing the text to 1000 or fewer characters.
11. Counter layout, color, and position match design specifications.
12. Counter is displayed after opening Purpose with a previously saved number of characters greater than 499
13. Counter is not displayed after opening Purpose with a previously saved number of characters less than 500
14. Paste text longer than 499 characters — counter should appear.
15. Paste text longer than 1000 characters — counter should updated and change color.

## Suggestions display behavior

16. Suggestions are visible when the field is empty.
17. Suggestions are visible when the field contains 1 character.
18. Suggestions are visible when the field contains 99 characters.
19. Suggestions disappear when the field contains 100 characters.
20. Suggestions do not appear when the field contains more than 100 characters (e.g., 101, 1000, 1001).

## Field styling and state behavior

21. The text field remains editable after exceeding 1000 characters.
22. The text turns red after exceeding 1000 characters.
23. The text returns to normal (grey) when reducing to 1000 or fewer characters.

## CTA button state behavior

24. CTA button becomes disabled after exceeding 1000 characters (impossible save Purpose), button gets grey.
25. CTA button reactivates after reducing text to 1000 or fewer characters and gets yellow.

## Performance and cross-device stability

26. Performance remains stable when typing up or beyond 1000 characters.
27. All behaviors work on small screen Android devices (e.g., Pixel 4a).
28. All behaviors work on large screen Android devices (e.g., Samsung Galaxy Tab).
29. All behaviors work in portrait and landscape orientations.

## Session and state preservation (displaying counter)

30. Screen state is preserved after receiving a phone call.
31. Screen state is preserved after switching to the background and returning.
32. Screen state is preserved after pressing the Home button and returning to the app.
33. Screen state is preserved after switching to another app and returning via recent apps menu.
34. Screen state is preserved after locking and unlocking the device.
35. Screen state is preserved after low battery or power saver notifications.

---

## Task 3: iOS - Password change logic

The design lacks the error of checking a new password and partial verification - in a real case this problem will be raised at the stage of layout analysis. At the moment it is assumed (not a very good real approach) that the password is dynamically verified as it is entered, the fulfilled conditions will be highlighted in green.

## Other questions for clarification

- Should special characters (e.g., !@#$%) and spaces be required, optional, or restricted?
- Are uppercase and lowercase letters both required, or is any letter sufficient?
- What is the maximum password length? What should happen if the maximum is exceeded?
- Should copy-paste be allowed in the password fields?
- Should the system validate only Latin letters?

## Button State Behavior

1. CTA button is disabled by default and matches the design.
2. CTA button remains disabled if only the one password(current or new) is filled.
3. CTA button remains disabled if the new password is invalid.
4. CTA button activates and changes color only when both fields are filled and the new password is valid.
5. CTA button becomes disabled and changes color again if the new password is later modified to be invalid.

## New Password Validation Rules

6. Enter password shorter than 8 characters – validation fails.
7. Enter password consisting only of numbers – validation fails.
8. Enter password consisting only of Latin letters – validation fails.
9. Enter password with at least 1 non-Latin letter, at least 1 number, and length 8 – validation fails.
10. Enter password with at least 1 Latin letter, at least 1 number, and length shorter than 8 characters – validation fails.
11. Enter password with at least 1 Latin letter, at least 1 number, and length of 8 characters – validation passes.
12. Enter password with at least 1 Latin letter, at least 1 number, and length of 9 characters – validation passes.
13. Enter password with at least 1 Latin letter, at least 1 number, and length up to the maximum (needs clarification) – validation passes.
14. Enter password with length exceeding the maximum (maximum + 1) – behavior needs to be clarified.

## Validation and Messaging

15. Validation of the new password triggers after clicking the CTA button.
16. An error message is displayed if the current password is incorrect, according to design.
17. An error message text matches the design.
17. After an error of validation current password, the user remains on the same screen without redirection.
18. Invalid password is highlighted in red after validation.
19. User can edit the invalid password to correct it.
20. User is redirected to the settings page with a success message if both passwords are valid.
21. Success message styling and text matches the design.
22. Reusing the current password in new password filed is rejected(needs to be clarified).
23. Pasting a long password behaves correctly (maximum length needs to be clarified).

## Post-Change Verification

24. User can log in using the new password.
25. User cannot log in using the previous password.
26. User can retry changing the password after a failed attempt.

## UX Testing

27. Password visibility toggle exists for both fields.
28. Activating the toggle hides the password (changes it to hidden state).
29. Deactivating the toggle reveals the password, keeping the previously entered value unchanged.
30. The overall screen structure and element positions match the design.
31. Each fulfilled password rule dynamically turns green with a check icon.
32. Each unfulfilled rule dynamically turns grey with a default or dot icon when no longer satisfied.

## Cross-Device and Layout Testing

33. All behaviors work on iPhone (small screens).
34. All behaviors work on iPad (large screens).
35. All behaviors work in both portrait and landscape orientations.

## Session and State Handling

36. Screen state is preserved after receiving a phone call.
37. Screen state is preserved after switching to the background and returning.
38. Screen state is preserved after pressing the Home button and returning to the app.
39. Screen state is preserved after switching to another app and returning via recent apps menu.
40. Screen state is preserved after locking and unlocking the device.
41. Screen state is preserved after low battery or power saver notifications.


