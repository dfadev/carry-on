import notifySubscribers from "../src/notify";

test("notify match", () => {
  expect(notifySubscribers()).toMatchSnapshot();
});

test("plug snapshot", () => {
  const plug = {};
  let state = { plug };
  const query = () => state;
  const set = (action, type) => {
    return (state = action(state));
  };

  const notify = notifySubscribers();
  expect(notify).toMatchSnapshot();
});

test("subscribe/unsubscribe", () => {
  const plug = {};
  let state = { plug };
  const query = () => state;
  let set = (action, type) => {
    return (state = action(state));
  };
  let getChanges = () => [];

  const notify = notifySubscribers();
  expect(notify).toMatchSnapshot();

  set = notify.plugin.middleware({
    isNested: () => false,
    next: set,
    getChanges
  });

  let msgRecvCount = 0;
  const fn = state => {
    msgRecvCount++;
  };
  const unsubscribe = notify.subscribe(fn);
  expect(notify.subscribers.size).toEqual(1);

  set(state => state);
  expect(msgRecvCount).toBe(1);

  unsubscribe();
  expect(notify.subscribers.size).toEqual(0);

  set(state => state);
  expect(msgRecvCount).toBe(1);
});
