import keys from "../src/keys";

describe("keys()", () => {
  test("makes no special accommodations for `arguments` objects (unlike lodash)", () => {
    const args = (function (..._) {
      return arguments;
    })(1, 2, 3);
    expect(keys(args).sort()).toEqual(["0", "1", "2", "callee", "length"]);
  });

  test("includes the `constructor` property on prototype objects (unlike lodash)", () => {
    function Foo() {}
    Foo.prototype.a = 1;

    expect(keys(Foo.prototype)).toEqual(["constructor", "a"]);
  });

  test("should return the string keyed property names of `object`", () => {
    expect(keys({ a: 1, b: 1 }).sort()).toEqual(["a", "b"]);
  });

  test("should not include inherited string keyed properties", () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    expect(keys(new Foo()).sort()).toEqual(["a"]);
  });

  test("should return keys for custom properties on arrays", () => {
    const array = [1];
    array.a = 1;

    expect(keys(array).sort()).toEqual(["0", "a", "length"]);
  });

  test("should not include inherited string keyed properties of arrays", () => {
    Array.prototype.a = 1;
    expect(keys([1]).sort()).toEqual(["0", "length"]);
    delete Array.prototype.a;
  });

  test("should return keys for custom properties on `arguments` objects", () => {
    const args = (function (..._) {
      return arguments;
    })(1, 2, 3);
    args.a = 1;
    expect(keys(args).sort()).toEqual(["0", "1", "2", "a", "callee", "length"]);
  });

  test("should not include inherited string keyed properties of `arguments` objects", () => {
    Object.prototype.a = 1;
    const args = (function (..._) {
      return arguments;
    })(1, 2, 3);

    expect(keys(args).sort()).toEqual(["0", "1", "2", "callee", "length"]);

    delete Object.prototype.a;
  });

  test("should work with string objects", () => {
    expect(keys(Object("abc")).sort()).toEqual(["0", "1", "2", "length"]);
  });

  test("should return keys for custom properties on string objects", () => {
    const object = Object("a");
    object.a = 1;

    expect(keys(object).sort()).toEqual(["0", "a", "length"]);
  });

  test("should not include inherited string keyed properties of string objects", () => {
    String.prototype.a = 1;
    expect(keys(Object("a")).sort()).toEqual(["0", "length"]);
    delete String.prototype.a;
  });

  test("should work with array-like objects", () => {
    expect(keys({ 0: "a", length: 1 }).sort()).toEqual(["0", "length"]);
  });

  test("should return an empty array when `object` is nullish", () => {
    expect(keys(null)).toEqual([]);
    expect(keys(undefined)).toEqual([]);
  });
});
