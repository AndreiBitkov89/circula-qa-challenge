export class DataGenerator {
  static generateEmail(): string {
    const timestamp = Date.now();
    return `testuser+${timestamp}@example.com`;
  }

  static generatePassword(): string {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const allChars = letters + numbers;

    let password = "";

    password += letters.charAt(Math.floor(Math.random() * letters.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));

    while (password.length < 8) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    return password;
  }

  static generateFirstName(): string {
    const names = ["John", "Irina", "Andrei", "Emma", "David", "Olivia"];
    return names[Math.floor(Math.random() * names.length)];
  }

  static generateLastName(): string {
    const surnames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
    ];
    return surnames[Math.floor(Math.random() * surnames.length)];
  }

  static generatePhoneNumber(): string {
    const prefix = "+49";
    const number = Math.floor(100000000 + Math.random() * 900000000); 
    return `${prefix}${number}`;
  }

  static generateCompanyName(): string {
    const randomNumber = Math.floor(100000 + Math.random() * 900000); 
    return `RandomCompanyName${randomNumber}`;
  }
}
