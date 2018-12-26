/** @format **/
import forceArray from "../src/forceArray";

describe("forceArray()", () => {
  test("should return an array when passed a number", () => {
    const thing = 1;
    const rslt = forceArray(thing);
    expect(rslt.length).toBe(1);
  });

  test("should return an array when passed a string", () => {
    const thing = "ABC";
    const rslt = forceArray(thing);
    expect(rslt.length).toBe(1);
  });

  test("should return an array when passed an object", () => {
    const thing = { key: "value" };
    const rslt = forceArray(thing);
    expect(rslt.length).toBe(1);
  });

  test("should return an array when passed an array", () => {
    const thing = [1];
    const rslt = forceArray(thing);
    expect(rslt.length).toBe(1);
  });
});
