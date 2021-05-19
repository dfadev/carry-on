import merge from "../src/mutateMerge";
import forEach from "../src/forEach";

function reduce(collection, iteratee, accumulator) {
  return doReduce(
    forEach,
    collection,
    iteratee,
    accumulator,
    arguments.length < 3
  );
}

function doReduce(iterationFn, collection, iteratee, accumulator, initAccum) {
  iterationFn(collection, (value, indexOrKey) => {
    if (initAccum) {
      accumulator = value;
      initAccum = false;
    } else {
      accumulator = iteratee(accumulator, value, indexOrKey);
    }
  });
  return accumulator;
}

describe("merge()", function () {
  test("only clones as much as it needs to", () => {
    const o1 = { a: { b: 2 }, c: { d: 4 } };
    const o2 = { a: { b: -2 } };
    const origC = o1.c;

    expect(merge(o1, o2).c).toBe(origC);
    expect(merge(o2, o1).c).toBe(origC);
  });

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  test("should return empty object when single empty object given", function () {
    expect(merge({})).toEqual({});
  });

  test("should return empty object when multiple empty objects given", function () {
    expect(merge({}, {}, {})).toEqual({});
  });

  test("should return the union of 2 properties", function () {
    expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  test("should return the union of 3 properties", function () {
    expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should have the rightmost property", function () {
    expect(merge({ a: 1 }, { a: 2 }, { a: 3 })).toEqual({ a: 3 });
  });

  test("should mutate (only) the first input", function () {
    let first = { a: 1 };
    let second = { b: 2 };
    let third = { c: 3 };

    expect(merge(first, second, third)).toEqual({ a: 1, b: 2, c: 3 });

    expect(first).toEqual({ a: 1, b: 2, c: 3 });
    expect(second).toEqual({ b: 2 });
    expect(third).toEqual({ c: 3 });
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  test("should throws strict mode errors", () => {
    const object = Object.freeze({ a: undefined });
    expect(() => {
      merge(object, { a: 1 });
    }).toThrowError(/^Cannot assign to read only property/);
  });

  test("should work as an iteratee for methods like `reduce`", () => {
    expect(reduce([{ a: 1 }, { b: 2 }, { c: 3 }], merge, { a: "0" })).toEqual({
      a: 1,
      b: 2,
      c: 3
    });
  });

  test("should merge `source` into `object`", () => {
    const names = {
      characters: [{ name: "barney" }, { name: "fred" }]
    };
    const ages = {
      characters: [{ age: 36 }, { age: 40 }]
    };
    const heights = {
      characters: [{ height: "5'4\"" }, { height: "5'5\"" }]
    };
    const expected = {
      characters: [
        { name: "barney", age: 36, height: "5'4\"" },
        { name: "fred", age: 40, height: "5'5\"" }
      ]
    };

    expect(merge(names, ages, heights)).toEqual(expected);
  });

  test("should work with four arguments", () => {
    expect(merge({ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 })).toEqual({ a: 4 });
  });

  test("should assign `null` values", () => {
    expect(merge({ a: 1 }, { a: null })).toEqual({ a: null });
  });

  test("should treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;

    const actual = merge([], array);

    expect("1" in actual).toBeTruthy();
    expect(actual).toEqual([1, undefined, 3]);
  });

  test("should not augment source objects", () => {
    let source1 = { a: [{ a: 1 }] };
    let source2 = { a: [{ b: 2 }] };
    let actual = merge({}, source1, source2);
    expect(source1.a).toEqual([{ a: 1 }]);
    expect(source2.a).toEqual([{ b: 2 }]);
    expect(actual.a).toEqual([{ a: 1, b: 2 }]);

    source1 = { a: [[1, 2, 3]] };
    source2 = { a: [[3, 4]] };
    actual = merge({}, source1, source2);
    expect(source1.a).toEqual([[1, 2, 3]]);
    expect(source2.a).toEqual([[3, 4]]);
    expect(actual.a).toEqual([[3, 4, 3]]);
  });

  test("can merge dense array", () => {
    let source1 = [];
    source1[2] = 1;

    let source2 = [];
    source2[3] = 2;

    let actual = merge({}, source1, source2);
    expect(actual).toMatchSnapshot();
  });
});
