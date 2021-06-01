import isSet from "../src/isSet";

describe("isSet()", () => {
  test("should return false when passed an arrow function", () => {
    const result = isSet(() => {});
    expect(result).toBe(false);
  });

  test("should return false when passed a function", () => {
    const result = isSet(() => {});
    expect(result).toBe(false);
  });

  test("should return false when passed a class", () => {
    class a {}
    const result = isSet(a);
    expect(result).toBe(false);
  });

  test("should return false when passed a class instance", () => {
    class a {}
    const b = new a();
    const result = isSet(b);
    expect(result).toBe(false);
  });

  test("should return false when passed a number", () => {
    const result = isSet(1);
    expect(result).toBe(false);
  });

  test("should return false when passed an object", () => {
    const result = isSet({ key: "value" });
    expect(result).toBe(false);
  });

  test("should return false when passed a string", () => {
    const result = isSet("value");
    expect(result).toBe(false);

    const result2 = isSet(new String("abc"));
    expect(result2).toBe(false);
  });

  test("should return true when passed a Set", () => {
    const result = isSet(
      new Set([
        [1, 2],
        [3, 4]
      ])
    );
    expect(result).toBe(true);
  });
});
