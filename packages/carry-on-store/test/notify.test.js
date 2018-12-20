import notifySubscribers from "../src/notify";

test("notify match", () => {
  expect(notifySubscribers()).toMatchSnapshot();
});

test("plug snapshot", () => {
  const plug = {};
  let state = { plug };
  const query = () => state;
  const dispatch = (action, type, force, ...args) => {
    return (state = action(state));
  };

  const notify = notifySubscribers();
  expect(notify).toMatchSnapshot();
});

test("subscribe/unsubscribe", () => {
  const plug = {};
  let state = { plug };
  const query = () => state;
  let dispatch = (action, type, force, ...args) => {
    return (state = action(state));
  };

  const notify = notifySubscribers();
  expect(notify).toMatchSnapshot();

  dispatch = notify.plugin.dispatch({ dispatch });

  let msgRecvCount = 0;
  const fn = state => { msgRecvCount++; };
  const unsubscribe = notify.subscribe(fn);
  expect(notify.subscribers.length).toEqual(1);

  dispatch(state => state);
  expect(msgRecvCount).toBe(1);

  unsubscribe();
  expect(notify.subscribers.length).toEqual(0);

  dispatch(state => state);
  expect(msgRecvCount).toBe(1);
});
