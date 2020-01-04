/** @format **/
// original implementation from proxyequal
import { getCollectionHandlers, shouldInstrument } from "./shouldInstrument";
import mutateSet from "./mutateSet";

const hasProxy = typeof Proxy !== "undefined";
/* istanbul ignore next */
if (!hasProxy) throw new Error("Missing Proxy support");
const ProxyConstructor = Proxy;

const ProxyToState = new WeakMap();

export const isProxyfied = object =>
  object && typeof object === "object" ? ProxyToState.has(object) : false;

export const deproxify = object =>
  (object !== undefined && typeof object === "object"
    ? ProxyToState.get(object)
    : object) || object;

const prepareObject = state => {
  if (!Object.isFrozen(state)) return state;

  // unfreeze
  if (Array.isArray(state)) return state.slice(0);
  if (state.constructor.name === "Object") {
    const clone = { ...state };
    Object.setPrototypeOf(clone, Object.getPrototypeOf(state));
    return clone;
  }
  return state;
};

const shouldProxy = type => type === "object";

function proxyfy(state, onGet, suffix, ProxyMap) {
  if (!state) return state;

  const alreadyProxy = isProxyfied(state);

  if (!alreadyProxy && !shouldInstrument(state)) return state;

  const hasCollectionHandlers = !alreadyProxy && getCollectionHandlers(state);

  const storedValue = ProxyMap.get(state) || {};

  if (storedValue[suffix]) return storedValue[suffix];

  const theBaseObject = alreadyProxy ? state : prepareObject(state);

  let proxyValue;

  function iterable(key, iterator) {
    let index = 0;
    const next = () => {
      const nextItem = iterator.next();
      const subKey = key + "." + index;
      index++;
      return {
        ...nextItem,
        get value() {
          if (nextItem.done && !nextItem.value) {
            return undefined;
          }
          return proxyValue(subKey, nextItem.value);
        }
      };
    };
    return {
      [Symbol.iterator]: () => ({
        next
      }),
      next
    };
  }

  proxyValue = (key, value) => {
    // suffix should be prefix???
    const thisId = suffix ? suffix + '["' + key + '"]' : key;
    const type = typeof value;

    onGet(thisId);

    if (shouldProxy(type)) {
      return proxyfy(value, onGet, thisId, ProxyMap);
    }

    if (hasCollectionHandlers) {
      switch (key) {
        case "get":
          return k => proxyValue(k, state.get(k));
        case "has":
          return k => proxyValue(k, state.has(k));
        case "keys":
          return () => state.keys();
        case "values":
          return () => iterable(key, state.values());
        case "entries":
          return () => iterable(key, state.entries());
        /* istanbul ignore next */
        case [Symbol.iterator]:
          // this is broken
          return iterable(key, state[Symbol.iterator].bind(state));
        default:
      }
    }

    return value;
  };

  const hooks = {
    set() {
      throw new Error("can't mutate state here");
    },

    get(target, prop) {
      const storeValue = state[prop];
      return typeof prop === "string"
        ? proxyValue(prop, storeValue)
        : storeValue;
    }
  };

  const proxy = new ProxyConstructor(theBaseObject, hooks);
  storedValue[suffix] = proxy;
  ProxyMap.set(state, storedValue);
  ProxyToState.set(proxy, state);
  return proxy;
}

export const proxyState = (object, _ProxyMap) => {
  const affected = {};
  const keysUsed = new Set();
  const ProxyMap = _ProxyMap || new WeakMap();
  let sealed = false;

  const onKeyUse = key => {
    if (sealed) return;
    if (!keysUsed.has(key)) {
      keysUsed.add(key);
      mutateSet(affected, key, true);
    }
  };

  const createState = state => proxyfy(state, onKeyUse, "", ProxyMap);

  return {
    affected,
    state: createState(object),
    seal: () => (sealed = true),
    unseal: () => (sealed = false),
    reset: () => {
      affected.length = 0;
      keysUsed.clear();
    },
    replaceState(state) {
      this.state = createState(state);
      this.unseal();
      return this;
    }
  };
};
