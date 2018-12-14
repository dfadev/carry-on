//import transaction from "./index";


test("", () => {
});

//test("transaction match", () => {
  //expect(transaction()).toMatchSnapshot();
//});

//test("plug snapshot", () => {
  //const plug = {};
  //let state = { plug };
  //const query = () => state;
  //const dispatch = (action, type, force, ...args) => {
    //return (state = action(state));
  //};

  //plug.tx = transaction().state({ dispatch, query, plug });

  //expect(plug.tx).toMatchSnapshot();
//});

//test("commit", () => {
  //const query = () => {};
  //const plug = {};
  //let state = { plug };
  //const dispatch = (action, type, force, ...args) => {
    //return (state = action(state));
  //};

  //plug.tx = transaction().state({ dispatch, query, plug });

  //const beginState = plug.tx.begin();

  //const newState = dispatch(state => {
    //return { ...state, newThing: 1 };
  //});
  //expect(newState.newThing).toBe(1);

  //const commitedState = plug.tx.commit();

  //expect(commitedState).toBe(newState);
  //expect(commitedState.newThing).toEqual(1);
//});

//test("rollback", async () => {
  //const query = () => {};
  //const plug = {};
  //let state = { plug };
  //const dispatch = (action, type, force, ...args) => {
    //return (state = action(state));
  //};

  //plug.tx = transaction().state({ dispatch, query, plug });

  //const beginState = plug.tx.begin();

  //const newState = dispatch(state => {
    //return { ...state, newThing: 1 };
  //});

  //const rolledBackState = plug.tx.rollback();

  //expect(rolledBackState).toBe(beginState);
  //expect(rolledBackState.newThing).toBe(undefined);
//});

//test("commit no transaction throws", () => {
  //const query = () => {};
  //const plug = {};
  //let state = { plug };
  //const dispatch = (action, type, force, ...args) => {
    //return (state = action(state));
  //};

  //plug.tx = transaction().state({ dispatch, query, plug });

  //expect(plug.tx.commit).toThrow();
//});

//test("rollback no transaction throws", () => {
  //const query = () => {};
  //const plug = {};
  //let state = { plug };
  //const dispatch = (action, type, force, ...args) => {
    //return (state = action(state));
  //};

  //plug.tx = transaction().state({ dispatch, query, plug });

  //expect(plug.tx.rollback).toThrow();
//});
