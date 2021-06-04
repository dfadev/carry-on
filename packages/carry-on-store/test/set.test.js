/**
 * @jest-environment jsdom
 */
import { set, get, deleteStore } from "../src";

test("set/get vals", () => {
  set(state => {
    state.field = "value";
  });
  expect(get()).toMatchSnapshot();
  deleteStore();
});
