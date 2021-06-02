import toPath from "../src/toPath";

test("should handle a leading dot", () => {
  const result = toPath(".field.path");
  expect(result).toMatchSnapshot();
});

test("should handle quoted keys", () => {
  const result = toPath('field["quoted.key"].path');
  expect(result).toMatchSnapshot();
});

test("should handle undefined", () => {
  const undefinedResult = toPath(undefined);
  expect(undefinedResult).toMatchSnapshot();
});

test("should handle null", () => {
  const nullResult = toPath(null);
  expect(nullResult).toMatchSnapshot();
});
