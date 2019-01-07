import makeCancelable from "../src/makeCancelable";

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe("makeCancelable", () => {
  it("should return a function", () => {
    const promise = Promise.resolve();
    const cancel = makeCancelable(promise);
    expect(typeof cancel).toBe("function");
  });

  it("calls @onfulfilled with the same value as resolved @promise", () => {
    const obj = Object();
    const promise = Promise.resolve(obj);
    const onfulfilled = jest.fn();
    makeCancelable(promise, onfulfilled);
    return flushPromises().then(() =>
      expect(onfulfilled.mock.calls[0][0]).toBe(obj)
    );
  });

  it("calls @onrejected with the same value @promise to be rejected", () => {
    const obj = Object();
    const promise = Promise.reject(obj);
    const onrejected = jest.fn();
    makeCancelable(promise, null, onrejected);
    return flushPromises().then(() =>
      expect(onrejected.mock.calls[0][0]).toBe(obj)
    );
  });

  it(`should not call @onfulfilled
      when cancelled on @promise to be resolved`, () => {
    const obj = Object();
    const promise = Promise.resolve(obj);
    const onfulfilled = jest.fn();
    const cancel = makeCancelable(promise, onfulfilled);
    cancel();
    return flushPromises().then(() =>
      expect(onfulfilled.mock.calls.length).toBe(0)
    );
  });

  it(`should not call @onrejected
      when cancelled on @promise to be resolved`, () => {
    const obj = Object();
    const promise = Promise.resolve(obj);
    const onrejected = jest.fn();
    const cancel = makeCancelable(promise, null, onrejected);
    cancel();
    return flushPromises().then(() =>
      expect(onrejected.mock.calls.length).toBe(0)
    );
  });

  it(`should not call @onrejected and @onrejected
      when cancelled on @promise to be resolved`, () => {
    const obj = Object();
    const promise = Promise.resolve(obj);
    const onrejected = jest.fn();
    const onfulfilled = jest.fn();
    const cancel = makeCancelable(promise, onfulfilled, onrejected);
    cancel();
    return flushPromises().then(() => {
      expect(onrejected.mock.calls.length).toBe(0);
      expect(onfulfilled.mock.calls.length).toBe(0);
    });
  });

  it(`should not call @onfulfilled
      when cancelled on @promise to be rejected`, () => {
    const obj = Object();
    const promise = Promise.reject(obj);
    const onfulfilled = jest.fn();
    const cancel = makeCancelable(promise, onfulfilled);
    cancel();
    return flushPromises().then(() =>
      expect(onfulfilled.mock.calls.length).toBe(0)
    );
  });

  it(`should not call @onrejected
      when cancelled on @promise to be rejected`, () => {
    const obj = Object();
    const promise = Promise.reject(obj);
    const onrejected = jest.fn();
    const cancel = makeCancelable(promise, null, onrejected);
    cancel();
    return flushPromises().then(() =>
      expect(onrejected.mock.calls.length).toBe(0)
    );
  });

  it(`should not call @onrejected and @onrejected
      when cancelled on @promise to be rejected`, () => {
    const obj = Object();
    const promise = Promise.reject(obj);
    const onrejected = jest.fn();
    const onfulfilled = jest.fn();
    const cancel = makeCancelable(promise, onfulfilled, onrejected);
    cancel();
    return flushPromises().then(() => {
      expect(onrejected.mock.calls.length).toBe(0);
      expect(onfulfilled.mock.calls.length).toBe(0);
    });
  });
});
