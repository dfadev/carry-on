/** @format **/
import isObject from "../src/isObject";

describe("isObject()", () => {
  test("should return true when passed an arrow function", () => {
    const result = isObject(() => {});
    expect(result).toBe(true);
  });

  test("should return true when passed a function", () => {
    const result = isObject(function() {});
    expect(result).toBe(true);
  });

  test("should return true when passed a class", () => {
    class a {}
    const result = isObject(a);
    expect(result).toBe(true);
  });

  test("should return true when passed a class instance", () => {
    class a {}
    const b = new a();
    const result = isObject(b);
    expect(result).toBe(true);
  });

  test("should return false when passed a number", () => {
    const result = isObject(1);
    expect(result).toBe(false);
  });

  test("should return true when passed an object", () => {
    const result = isObject({ key: "value" });
    expect(result).toBe(true);
  });

  test("should return false when passed a string", () => {
    const result = isObject("value");
    expect(result).toBe(false);
  });
});
