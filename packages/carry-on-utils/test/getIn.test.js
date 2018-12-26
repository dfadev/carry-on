import { getInA as get } from "../src/getIn";

describe("get()", () => {
  test("should get string keyed property values", () => {
    expect(get({ a: 1 }, ["a"])).toBe(1);
  });

  test("should get deep property values", () => {
    expect(get({ a: { b: 2 } }, ["a", "b"])).toBe(2);
  });

  test("should return passed object on empty paths", () => {
    const obj = { key: "value" };
    expect(get(obj, [])).toBe(obj);

    expect(get({ "": 3 }, [""])).toBe(3);
  });

  test("should handle complex paths", () => {
    expect(
      get(
        {
          a: {
            "-1.23": {
              '["b"]': { c: { "['d']": { "\ne\n": { f: { g: 8 } } } } },
            },
          },
        },
        ["a", "-1.23", '["b"]', "c", "['d']", "\ne\n", "f", "g"],
      ),
    ).toBe(8);
  });

  test("should return `undefined` when `object` is nullish", () => {
    expect(get(undefined, ["constructor"])).toBeUndefined();
    expect(get(null, ["constructor"])).toBeUndefined();
  });

  test("is `undefined` for deep paths when `object` is nullish", () => {
    const path = ["constructor", "prototype", "valueOf"];

    expect(get(null, path)).toBeUndefined();
    expect(get(undefined, path)).toBeUndefined();
  });

  test("should return `undefined` if parts of `path` are missing", () => {
    expect(get({ a: [, null] }, ["a", "1", "b", "c"])).toBeUndefined();
  });

  test("should be able to return `null` values", () => {
    expect(get({ a: { b: null } }, ["a", "b"])).toBeNull();
  });

  test("should return the default value for `undefined` values", () => {
    const object = { a: {} };
    const path = ["a", "b"];
    const values = [
      [],
      {},
      null,
      undefined,
      false,
      0,
      NaN,
      "",
      true,
      new Date(),
      1,
      /x/,
      "a",
    ];

    for (const value of values) {
      expect(get(object, path, value)).toEqual(value);
      expect(get(null, path, value)).toEqual(value);
    }
  });
});
