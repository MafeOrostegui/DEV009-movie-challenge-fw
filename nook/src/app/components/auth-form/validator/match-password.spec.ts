import { matchPasswordValidator } from "./match-password";

describe('matchPasswordValidator', () => {
  it('should create an instance', () => {
    const passwordToMatch = "password";
    const directive = matchPasswordValidator(passwordToMatch);
    expect(directive).toBeTruthy();
  });
});
