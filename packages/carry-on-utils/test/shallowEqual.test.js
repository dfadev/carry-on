import shallowEqual from "../src/shallowEqual";

const obj1 = { game: "chess", year: "1979" };
const obj2 = { language: "elm" };
const obj3 = { technology: "react" };

const tests = [
  {
    should: "return true when objects are ===",
    objA: obj1,
    objB: obj1,
    result: true
  },
  {
    should: "return true when both objects are empty",
    objA: {},
    objB: {},
    result: true
  },
  {
    should: "return false when objects do not have the same amount of keys",
    objA: { game: "chess", year: "1979", country: "Australia" },
    objB: { game: "chess", year: "1979" },
    result: false
  },
  {
    should: "return false when there corresponding values which are not ===",
    objA: { first: obj1, second: obj2 },
    objB: { first: obj1, second: { language: "elm" } },
    result: false
  },
  {
    should: "return true when all values are ===",
    objA: { first: obj1, second: obj2 },
    objB: { second: obj2, first: obj1 },
    result: true
  },
  {
    should: "return true when both values are null",
    objA: null,
    objB: null,
    result: true
  },
  {
    should: "return false when first value is null",
    objA: null,
    objB: {},
    result: false
  },
  {
    should: "return false when last value is null",
    objA: {},
    objB: null,
    result: false
  },
  {
    should: "return true when both NaN",
    objA: NaN,
    objB: NaN,
    result: true
  },
  {
    should: "return false when signs different",
    objA: 0,
    objB: -0,
    result: false
  }
];

describe("shallowEqual", function () {
  tests.forEach(function (test) {
    it("should " + test.should, function () {
      expect(shallowEqual(test.objA, test.objB)).toBe(test.result);
    });
  });
});
