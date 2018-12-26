import forEach from "../src/forEach";

const noop = () => {};

describe("forEach()", () => {
  test("works for null & undefined", () => {
    let marker = 0;
    const spy = () => { marker++; };
    forEach(null, spy);
    forEach(undefined, spy);
    expect(marker).toBe(0);
  });

  test("can exit early when iterating arrays", () => {
    const args = [];
    const logger = (val, idx) => {
      args.push([val, idx]);
      if (idx === 2) return false;
    }

    forEach([1, 2, 3, 4], logger);

    expect(args).toEqual([[1, 0], [2, 1], [3, 2]]);
  });

  test("can exit early when iterating objects", () => {
    const args = [];
    const logger = (...a) => {
      args.push(a);
      if (a[0] === 3) return false;
    }

    forEach({ a: 1, b: 2, c: 3, d: 4 }, logger);

    expect(args).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
  });

  test("should provide correct iteratee arguments", () => {
    const args = [];
    const logger = (...a) => {
      args.push(a);
    };

    forEach([1, 2, 3], logger);

    expect(args).toEqual([[1, 0], [2, 1], [3, 2]]);
  });

  test("should treat sparse arrays as dense", () => {
    const args = [];
    const array = [1];
    array[2] = 3;
    const logger = (...a) => {
      args.push(a);
    }

    forEach(array, logger);

    expect(args).toEqual([[1, 0], [undefined, 1], [3, 2]]);
  });

  test("should not iterate custom properties of arrays", () => {
    const args = [];

    const array = [1];
    array.a = 1;
    const logger = (...a) => {
      args.push(a);
    };

    forEach(array, logger);

    expect(args).toEqual([[1, 0]]);
  });

  test("iterates over own string keyed properties of objects", () => {
    const args = [];
    const object = { a: 1 };
    const logger = (...a) => {
      args.push(a);
    };

    forEach(object, logger);

    expect(args).toEqual([[1, "a"]]);
  });

  test("should return the collection", () => {
    const array = [1, 2, 3];

    expect(forEach(array, noop)).toBe(array);
  });

  test("should ignore changes to `length`", () => {
    const array = [1];
    let count = 0;

    forEach(array, () => {
      if (!count) {
        array.push(2);
      }
      ++count;
    });

    expect(count).toEqual(1);
  });

  test("should ignore added `object` properties", () => {
    const object = { a: 1 };
    let count = 0;

    forEach(object, () => {
      object.b = 2;
      ++count;
    });

    expect(count).toEqual(1);
  });
});
