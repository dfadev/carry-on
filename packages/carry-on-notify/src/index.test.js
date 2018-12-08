import notifyListeners from "./index";

test("notify match", () => {
  expect(notifyListeners()).toMatchSnapshot();
});

test("plug snapshot", () => {
  const plug = {};
  let state = { plug };
  const query = () => state;
  const dispatch = (action, type, force, ...args) => {
    return (state = action(state));
  };

  const notify = notifyListeners();
  expect(notify).toMatchSnapshot();
});

test("subscribe/unsubscribe", () => {
  const plug = {};
  let state = { plug };
  const query = () => state;
  let dispatch = (action, type, force, ...args) => {
    return (state = action(state));
  };

  const notify = notifyListeners();
  expect(notify).toMatchSnapshot();

  dispatch = notify.plugin.dispatch({ dispatch });

  let msgRecvCount = 0;
  const fn = state => { msgRecvCount++; };
  const unsubscribe = notify.subscribe(fn);
  expect(notify.listeners.length).toEqual(1);

  dispatch(state => state);
  expect(msgRecvCount).toBe(1);

  unsubscribe();
  expect(notify.listeners.length).toEqual(0);

  dispatch(state => state);
  expect(msgRecvCount).toBe(1);
});
