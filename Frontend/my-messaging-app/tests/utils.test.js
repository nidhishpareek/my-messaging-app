import { usernamePattern } from "../src/util/constants";

describe("Test cases for regex", () => {
  const validUsernames = [
    "sdfghjk",
    "fghjFGH",
    "sdfgh123",
    "fghDSsdfgh123",
    "sdfgh.fgsHJj323",
    "DFGHJ_asd",
  ];

  validUsernames.forEach((username) => {
    it(`should match a valid username: ${username}`, () => {
      expect(usernamePattern.test(username)).toBeTruthy();
    });
  });

  const invalidUsernames = [
    "ab", // Too short
    "longusernameofChar19", // Too long
    "1234567", // Only digits
    "___", // Only underscores
    "...", // Only periods
    "____", // Only underscores
    "marvel.@#$",
    "special( )characters",
    "     ",
  ];

  invalidUsernames.forEach((username) => {
    it(`should not match an invalid username: ${username}`, () => {
      expect(usernamePattern.test(username)).toBeFalsy();
    });
  });
});
