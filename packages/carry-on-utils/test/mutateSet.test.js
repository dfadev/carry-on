/** @format **/
import { mutateSetA as set } from "../src/mutateSet";

const constant = value => () => value;

describe("set()", () => {
  test("creates an array (only) for missing integer keys", () => {
    const object = [];
    set(object, [1, "b", 3.7, 4], value);
    expect(object).toEqual([, { b: { "3.7": [, , , , value] } }]);
  });

  /** documented difference from lodash */
  test("assigns values even if they are the same as their destination", () => {
    for (const equalValue of ["a", ["a"], { a: 1 }, NaN]) {
      const object = {};
      const marker = 0;
      const setter = () => {
        marker++;
      };

      const theValue = constant(equalValue);
      Object.defineProperty(object, "a", {
        configurable: true,
        enumerable: true,
        get: theValue,
        set: setter
      });

      set(object, ["a"], theValue);

      expect(marker).toBe(1);
    }
  });

  const oldValue = 1;
  const value = 2;

  test("should set property values", () => {
    const object = { a: oldValue };

    const returned = set(object, ["a"], value);

    expect(returned).toBe(object);
    expect(object.a).toBe(value);
  });

  test("should set deep property values", () => {
    const object = { a: { b: oldValue } };

    const actual = set(object, ["a", "b"], value);

    expect(actual).toBe(object);
    expect(object.a.b).toBe(value);
  });

  test("should not coerce array paths to strings", () => {
    const object = { "a,b,c": 1, a: { b: { c: 1 } } };
    set(object, ["a", "b", "c"], value);
    expect(object.a.b.c).toBe(value);
  });

  test("should handle empty paths", () => {
    const object = {};

    set(object, [], value);
    expect(object).toEqual({});

    set(object, [""], value);
    expect(object).toEqual({ "": value });
  });

  test("should handle complex paths", () => {
    const object = {
      a: {
        "-1.23": {
          '["b"]': { c: { "['d']": { "\ne\n": { f: { g: oldValue } } } } }
        }
      }
    };
    const path = ["a", "-1.23", '["b"]', "c", "['d']", "\ne\n", "f", "g"];

    set(object, path, value);

    expect(object.a["-1.23"]['["b"]'].c["['d']"]["\ne\n"].f.g).toBe(value);
  });

  test("should create parts of `path` that are missing", () => {
    const object = {};

    const actual = set(object, ["a", "1", "b", "c"], value);

    expect(actual).toBe(object);
    expect(actual).toEqual({ a: { "1": { b: { c: value } } } });
    expect("0" in object.a).toBe(false);
  });

  test("should not error when `object` is nullish", () => {
    expect(set(null, ["a", "b"], value)).toEqual(null);
    expect(set(undefined, ["a", "b"], value)).toEqual(undefined);
  });

  test("should overwrite primitives in the path", () => {
    const object = { a: "" };
    set(object, ["a", "b"], value);
    expect(object).toEqual({ a: { b: 2 } });
  });

  test("should not create an array for missing non-index property names that start with numbers", () => {
    const object = {};
    set(object, ["1a", "2b", "3c"], value);
    expect(object).toEqual({ "1a": { "2b": { "3c": value } } });
  });
});
