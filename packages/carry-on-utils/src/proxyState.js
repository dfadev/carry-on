// heavily based on https://github.com/theKashey/proxyequal
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

// unfreeze object if frozen
const prepareObject = state => {
  if (!Object.isFrozen(state)) return state;
  if (Array.isArray(state)) return state.slice(0);

  // don't use Object.assign because it will call setters while an object spread uses Object.defineProperties
  const clone = { ...state };
  // spread does not assign prototype
  Object.setPrototypeOf(clone, Object.getPrototypeOf(state));
  return clone;
};

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
      const subKey = `${key}.${index}`;
      index += 1;
      return {
        ...nextItem,
        get value() {
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
    const thisId = suffix ? `${suffix}["${key}"]` : key;
    const type = typeof value;

    onGet(thisId);

    if (type === "object")
      return proxyfy(value, onGet, thisId, ProxyMap);

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
          return iterable(key, state[Symbol.iterator]);
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
      let storeValue = state[prop];
      if (typeof prop === "string") storeValue = proxyValue(prop, storeValue);

      // bind function value if it's not a constructor and not already bound
      if (
        typeof storeValue === "function" &&
        Object.prototype.hasOwnProperty.call(storeValue, "prototype") &&
        prop !== "constructor"
      )
        storeValue = storeValue.bind(target);

      return storeValue;
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
  let sealed = 0;

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
    seal: () => {
      sealed += 1;
    },
    unseal: () => {
      sealed -= 1;
    },
    reset: () => {
      affected.length = 0;
      sealed = 0;
      keysUsed.clear();
    },
    replaceState(state) {
      this.state = createState(state);
      this.unseal();
      sealed = 0;
      return this;
    }
  };
};
