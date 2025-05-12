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
Also tested are two cases written on the backend - request on creation an account with Sweden and getting Sweden from the backend.

During testing, I encountered the fact that selecting a country from the list on Chrome leads to the browser sticking and freezing, for Chrome this case is skipped and requires additional debugging. I used a simple POM and chain of invocations patterns. 

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

## Clarified Rules & Expected Behaviors

- Special characters (e.g., !@#$%) are optional.
- Any letter is sufficient.
- No maximum password length is enforced (skip max-length tests).
- Copy-paste is allowed in both password fields.
- Dynamic verification is applied as you type, changing conditions from grey to green when fulfilled.

---

### Button State Behavior
1. CTA button is disabled by default and matches the design.
2. CTA button remains disabled if only the current password is filled.
3. CTA button remains disabled if the new password is invalid.
4. CTA button activates and changes color only when both fields are filled and the new password is valid.
5. CTA button becomes disabled again if the new password is later modified to be invalid.

### New Password Validation Rules
6. Enter password shorter than 8 characters – validation fails.
7. Enter password with only numbers – validation fails.
8. Enter password with only letters (Latin or non-Latin) – validation fails.
9. Enter password with at least one letter and one number, shorter than 8 characters – validation fails.
10. Enter password with at least one letter and one number, exactly 8 characters or more – validation passes.
11. Passwords can include special characters, but they are optional.

### Validation and Messaging
12. Validation of current password triggers only after clicking the CTA button.
13. Show error message if the current password is incorrect.
14. Error message text and style match the design.
15. Stay on the same screen after validation error.
16. Highlight invalid password in red.
17. Allow user to edit invalid password.
18. Redirect to settings page with success message after successful change.
19. Success message styling matches the design.
20. Reusing the current password is rejected.
21. Pasting long passwords works correctly (no max limit applied).

### Post-Change Verification
22. User can log in with the new password.
23. User cannot log in with the old password.
24. User can retry changing password after failure.

### UX Testing (Dynamic Verification)
25. Password visibility toggle exists for both password fields.
26. Activating toggle hides the password.
27. Deactivating toggle reveals the password without losing the typed value.
28. Layout and structure match the design.
29. Fulfilled rules turn green with check icons as you type.
30. Unfulfilled rules return to grey when you remove matching characters.

### Cross-Device and Layout Testing
31. All behaviors work on iPhone (small screens).
32. All behaviors work on iPad (large screens).
33. All behaviors work in portrait and landscape modes.

### Session and State Handling
34. State is preserved after receiving a phone call.
35. State is preserved after switching to background and returning.
36. State is preserved after pressing Home and returning.
37. State is preserved after switching to another app and returning via Recents.
38. State is preserved after locking/unlocking the device.
39. State is preserved after low battery or power saver notifications.


