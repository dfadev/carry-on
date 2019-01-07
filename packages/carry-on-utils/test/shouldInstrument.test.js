import { getCollectionHandlers, shouldInstrument } from "../src/shouldInstrument";

const tests = [
  {
    should: "return true for Map",
    obj: new Map(),
    result: true
  },
  {
    should: "return true for Set",
    obj: new Set(),
    result: true
  },
  {
    should: "return true for WeakMap",
    obj: new WeakMap(),
    result: true
  },
  {
    should: "return true for WeakSet",
    obj: new WeakSet(),
    result: true
  },
  {
    should: "return true for Object",
    obj: new Object(),
    result: true
  },
  {
    should: "return true for Array",
    obj: new Array(),
    result: true
  },
  {
    should: "return true for Int8Array",
    obj: new Int8Array(),
    result: true
  },
  {
    should: "return true for Uint8Array",
    obj: new Uint8Array(),
    result: true
  },
  {
    should: "return true for Uint8ClampedArray",
    obj: new Uint8ClampedArray(),
    result: true
  },
  {
    should: "return true for Int16Array",
    obj: new Int16Array(),
    result: true
  },
  {
    should: "return true for Uint16Array",
    obj: new Uint16Array(),
    result: true
  },
  {
    should: "return true for Int32Array",
    obj: new Int32Array(),
    result: true
  },
  {
    should: "return true for Uint32Array",
    obj: new Uint32Array(),
    result: true
  },
  {
    should: "return true for Float32Array",
    obj: new Float32Array(),
    result: true
  },
  {
    should: "return true for Float64Array",
    obj: new Float64Array(),
    result: true
  },
  {
    should: "return false for number",
    obj: 1,
    result: false
  },
];

describe("shouldInstrument", function() {
  tests.forEach(function(test) {
    it("should " + test.should, function() {
      expect(shouldInstrument(test.obj)).toBe(test.result);
    });
  });
});

it("should call getCollectionHandlers", () => {
  expect(getCollectionHandlers(new Object())).toMatchSnapshot();
  expect(getCollectionHandlers(new Map())).toMatchSnapshot();
});
