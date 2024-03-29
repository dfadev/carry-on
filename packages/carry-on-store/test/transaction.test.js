/**
 * @jest-environment jsdom
 */
import { produce as immer } from "immer";
import transaction from "../src/transaction";
import { deleteStore, register, getStore, connect, get, set } from "../src";

test("transaction match", () => {
  expect(transaction()).toMatchSnapshot();
});

test("plug snapshot", () => {
  const plug = {};
  let state = { plug };
  const get = () => state;
  const set = (action, type) => (state = action(state));

  plug.tx = transaction().state({ set, get, plug });

  expect(plug.tx).toMatchSnapshot();
});

test("commit", () => {
  const get = () => {};
  const plug = {};
  let state = { plug };
  const set = (action, type) => (state = action(state));

  plug.tx = transaction().state({ set, get, plug });

  const beginState = plug.tx.begin();

  const newState = set(state => ({ ...state, newThing: 1 }));
  expect(newState.newThing).toBe(1);

  const commitedState = plug.tx.commit();

  expect(commitedState).toBe(newState);
  expect(commitedState.newThing).toEqual(1);
});

test("rollback", () => {
  const get = state => immer(state, s => s);
  const state = {};
  const set = (action, type) => immer(state, action);

  const store = {
    set: (action, type) => (store.state = immer(store.state, action)),
    get,
    state: transaction().state({ set, get })
  };

  const beginState = store.state.begin();

  const newState = store.set(state => {
    state.newThing = 1;
  });

  const rolledBackState = store.state.rollback();

  expect(rolledBackState).toBe(beginState);
  expect(rolledBackState.newThing).toBe(undefined);
});

test("commit no transaction throws", () => {
  const get = () => {};
  const plug = {};
  let state = { plug };
  const set = (action, type) => (state = action(state));

  plug.tx = transaction().state({ set, get, plug });

  expect(plug.tx.commit).toThrow();
});

test("rollback no transaction throws", () => {
  const get = () => {};
  const plug = {};
  let state = { plug };
  const set = (action, type) => (state = action(state));

  plug.tx = transaction().state({ set, get, plug });

  expect(plug.tx.rollback).toThrow();
});

test("dispose", () => {
  transaction().dispose();
});

test("commit 2", () => {
  register(transaction());
  connect();
  get().begin();
  set(state => {
    state.extra = 1;
  });
  expect(get()).toMatchSnapshot();
  get().rollback();
  expect(get()).toMatchSnapshot();
  deleteStore();
});
