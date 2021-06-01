import isString from "../src/isString";

describe("isString()", () => {
  test("should return false when passed an arrow function", () => {
    const result = isString(() => {});
    expect(result).toBe(false);
  });

  test("should return false when passed a function", () => {
    const result = isString(() => {});
    expect(result).toBe(false);
  });

  test("should return false when passed a class", () => {
    class a {}
    const result = isString(a);
    expect(result).toBe(false);
  });

  test("should return false when passed a class instance", () => {
    class a {}
    const b = new a();
    const result = isString(b);
    expect(result).toBe(false);
  });

  test("should return false when passed a number", () => {
    const result = isString(1);
    expect(result).toBe(false);
  });

  test("should return false when passed an object", () => {
    const result = isString({ key: "value" });
    expect(result).toBe(false);
  });

  test("should return true when passed a string", () => {
    const result = isString("value");
    expect(result).toBe(true);

    const result2 = isString(new String("abc"));
    expect(result2).toBe(true);
  });
});
