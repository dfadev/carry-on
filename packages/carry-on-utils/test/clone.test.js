import clone from "../src/clone";
import { forOwn } from "../src/forEach";
import isObject from "../src/isObject";

describe("clone()", () => {
  test("should return an empty object if empty given", () => {
    expect(clone({})).toEqual({});
  });

  test("should return an object with the same properties", () => {
    expect(clone({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should return an object with nested properties", () => {
    expect(clone({ a: 1, b: { foo: "bar" }, c: { bar: "foo" } })).toEqual({
      a: 1,
      b: { foo: "bar" },
      c: { bar: "foo" }
    });
  });

  test("should not mutate the original object", () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = clone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
  });

  test("should shallow clone", () => {
    const object = { a: 1, b: { foo: "bar" }, c: { bar: "foo" } };
    const result = clone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
    expect(result.b).toBe(object.b);
    expect(result.c).toBe(object.c);
  });

  test("should perform a shallow clone", () => {
    const array = [{ a: 0 }, { b: 1 }];

    const actual = clone(array);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
    expect(actual[0]).toBe(array[0]);
  });

  const clonable = {
    arrays: ["a", ""],
    "array-like objects": { 0: "a", length: 1 },
    booleans: false,
    "null values": null,
    numbers: 0,
    objects: { a: 0, b: 1, c: 2 },
    strings: "a",
    "undefined values": undefined,
    "objects with object values": { b: ["B"], c: { C: 1 } }
  };
  forOwn(clonable, (object, kind) => {
    test(`should clone ${  kind}`, () => {
      const actual = clone(object);

      expect(actual).toEqual(object);
      if (isObject(object)) {
        expect(actual).not.toBe(object);
      } else {
        expect(actual).toBe(object);
      }
    });
  });

  test("clones properties that shadow those on `Object.prototype`", () => {
    const object = {
      constructor: 1,
      hasOwnProperty: 2,
      isPrototypeOf: 3,
      propertyIsEnumerable: 4,
      toLocaleString: 5,
      toString: 6,
      valueOf: 7
    };

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  test("works for methods like `map`", () => {
    const expected = [{ a: [0] }, { b: [1] }];

    const actual = expected.map(clone);

    expect(actual).toEqual(expected);
    expect(actual[0]).not.toBe(expected[0]);
    expect(actual[0].a).toBe(expected[0].a);
    expect(actual[1].b).toBe(expected[1].b);
  });
});
