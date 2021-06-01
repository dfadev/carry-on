import isMap from "../src/isMap";

describe("isMap()", () => {
  test("should return false when passed an arrow function", () => {
    const result = isMap(() => {});
    expect(result).toBe(false);
  });

  test("should return false when passed a function", () => {
    const result = isMap(() => {});
    expect(result).toBe(false);
  });

  test("should return false when passed a class", () => {
    class a {}
    const result = isMap(a);
    expect(result).toBe(false);
  });

  test("should return false when passed a class instance", () => {
    class a {}
    const b = new a();
    const result = isMap(b);
    expect(result).toBe(false);
  });

  test("should return false when passed a number", () => {
    const result = isMap(1);
    expect(result).toBe(false);
  });

  test("should return false when passed an object", () => {
    const result = isMap({ key: "value" });
    expect(result).toBe(false);
  });

  test("should return false when passed a string", () => {
    const result = isMap("value");
    expect(result).toBe(false);

    const result2 = isMap(new String("abc"));
    expect(result2).toBe(false);
  });

  test("should return true when passed a Map", () => {
    const result = isMap(
      new Map([
        [1, 2],
        [3, 4]
      ])
    );
    expect(result).toBe(true);
  });
});
