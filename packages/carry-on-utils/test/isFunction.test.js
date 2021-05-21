import isFunction from "../src/isFunction";

describe("isFunction()", () => {
  test("should return true when passed an arrow function", () => {
    const result = isFunction(() => {});
    expect(result).toBe(true);
  });

  test("should return true when passed a function", () => {
    const result = isFunction(() => {});
    expect(result).toBe(true);
  });

  test("should return true when passed a class", () => {
    class a {}
    const result = isFunction(a);
    expect(result).toBe(true);
  });

  test("should return false when passed a class instance", () => {
    class a {}
    const b = new a();
    const result = isFunction(b);
    expect(result).toBe(false);
  });

  test("should return false when passed a number", () => {
    const result = isFunction(1);
    expect(result).toBe(false);
  });

  test("should return false when passed an object", () => {
    const result = isFunction({ key: "value" });
    expect(result).toBe(false);
  });

  test("should return false when passed a string", () => {
    const result = isFunction("value");
    expect(result).toBe(false);
  });
});
