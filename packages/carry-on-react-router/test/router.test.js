/**
 * @jest-environment jsdom
 */
import { deleteStore, register, connect, get, set } from "carry-on-store";
import router from "../src/router";

it("router matches snapshot", () => {
  register(router());
  expect(connect()).toMatchSnapshot();
  deleteStore();
});

it("handles clicks", () => {
  register(router());
  const handleClick = get().app.history.handleClick;

  let onClickCalled = 0;
  const onClick = e => {
    onClickCalled += 1;
  };

  let preventDefaultCalled = 0;
  const preventDefault = () => {
    preventDefaultCalled += 1;
  };

  handleClick({ onClick })({
    button: 0,
    preventDefault,
    to: "/things"
  });
  expect(onClickCalled).toBe(1);
  expect(preventDefaultCalled).toBe(1);

  handleClick({ })({
    button: 0,
    preventDefault
  });
  expect(onClickCalled).toBe(1);
  expect(preventDefaultCalled).toBe(2);

  handleClick({ onClick })({
    button: 0,
    preventDefault,
    to: "/things",
    force: true
  });
  expect(onClickCalled).toBe(2);
  expect(preventDefaultCalled).toBe(3);

  handleClick({ onClick })({
    button: 0,
    preventDefault,
    to: "/things",
    force: true,
    metaKey: true,
    altKey: true,
    ctrlKey: true,
    shiftKey: true
  });
  expect(onClickCalled).toBe(3);
  expect(preventDefaultCalled).toBe(3);

  set(s => { }, undefined, "Time Travel");
  window.location.hash = "abc";
  set(s => { }, undefined, "Time Travel");

  expect(get().app.history.location.pathname).toMatchSnapshot();

  deleteStore();
});
