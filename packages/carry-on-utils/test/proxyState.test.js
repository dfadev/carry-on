import { proxyState, deproxify, isProxyfied } from "../src/proxyState";

describe("proxy", () => {
  it("arrays", () => {
    const A1 = [0, 1, 2, 3];
    const A2 = [0, 1, 2, 3];
    const A3 = A1.map(a => a);
    const A4 = A1.map(a => a * 2);

    const trapped = proxyState(A1);

    expect(trapped.affected).toMatchSnapshot();

    trapped.state[0]; // += 0;
    trapped.state[0]; // += 0;

    expect(trapped.affected).toMatchSnapshot();

    trapped.state[1]; // += 0;

    expect(trapped.affected).toMatchSnapshot();

    trapped.seal();
    trapped.state[2]; // += 0;
    expect(trapped.affected).toMatchSnapshot();
    trapped.unseal();

    trapped.state[3]; // += 0;
    expect(trapped.affected).toMatchSnapshot();
  });

  it("objects", () => {
    const A1 = {
      key1: 1,
      key2: {
        array: [1, 2, 4]
      },
      key3: null
    };
    const A2 = {
      key1: 1,
      key2: 2
    };
    const A3 = { ...A1, key1: 2 };
    const A4 = {
      key1: 1,
      key2: {
        array: [1, 2, 4]
      }
    };

    const trapped = proxyState(A1);
    expect(trapped.affected).toMatchSnapshot();

    trapped.state.key1; // += 0;
    trapped.state.key1; // += 0;
    expect(trapped.affected).toMatchSnapshot();

    trapped.reset();
    expect(trapped.affected).toMatchSnapshot();
    trapped.state.key2.array[0]; // += 0;
    expect(trapped.affected).toMatchSnapshot();
  });

  it("handle empty case", () => {
    const A = {
      a: undefined
    };
    expect(proxyState(A).state.a).toMatchSnapshot();
    expect(proxyState(undefined).state).toMatchSnapshot();
  });

  it("plain shallowEqual", () => {
    const A1 = {
      key1: 1,
      key2: {
        array: [1, 2, 4]
      },
      key3: null
    };
    const A2 = {
      key1: 1,
      key2: 2
    };
    const A3 = { ...A1, key1: 2 };
    const A4 = {
      key1: 1,
      key2: A1.key2
    };

    const trapped = proxyState(A1);
    expect(trapped.affected).toMatchSnapshot();

    trapped.state.key1; // += 0;
    trapped.state.key1; /// += 0;
    expect(trapped.affected).toMatchSnapshot();

    trapped.reset();
    expect(trapped.affected).toMatchSnapshot();
    trapped.state.key2.array[0]; // += 0;
    expect(trapped.affected).toMatchSnapshot();
  });

  it("nested shallowEqual", () => {
    const A1 = {
      key1: 1,
      key2: {
        array: [1, 2, 4]
      },
      key3: null
    };
    const A2 = {
      key1: 1,
      key2: {
        array: A1.key2.array
      }
    };

    const trapped1 = proxyState(A1);
    const trapped2 = proxyState(trapped1.state);

    trapped2.state.key1; // += 0;
    expect(trapped1.affected).toMatchSnapshot();
    expect(trapped2.affected).toMatchSnapshot();

    trapped2.state.key1; // += 1;
    A1.key1 += 1;

    trapped1.reset();
    trapped2.reset();
    trapped2.state.key2.array[0]; // += 0;
    expect(trapped1.affected).toMatchSnapshot();
  });

  it("can proxy via proxy", () => {
    const A = {
      b: {
        c: {
          d: 1
        }
      }
    };
    const p1 = proxyState(A);
    const p2 = proxyState(p1.state.b);

    expect(p1.state).toMatchSnapshot();
    expect(p2.state).toMatchSnapshot();
  });

  it("track proxy via proxy", () => {
    const A = {
      root: {
        b: {
          a: 1,
          b: true,
          c: {
            d: 1,
            e: 14
          }
        }
      }
    };
    const p0 = proxyState(A);
    const p1 = proxyState(p0.state.root);
    const p2 = proxyState(p1.state.b);
    p2.state.c.d; // ++;

    expect(p1.affected).toMatchSnapshot();
    expect(p2.affected).toMatchSnapshot();
    p2.state.a; // ++;

    expect(p1.affected).toMatchSnapshot();
    expect(p2.affected).toMatchSnapshot();

    expect(p1.affected).toMatchSnapshot();
    expect(p2.affected).toMatchSnapshot();

    expect(p0.affected).toMatchSnapshot();
  });

  it("shallow equal test", () => {
    const C = { c: 1 };
    const A1 = {
      b: C
    };
    const A2 = {
      b: C
    };

    expect(proxyState(A1).state.b).not.toBe(proxyState(A2).state.b);

    const p1 = proxyState(A1);
    const s1 = p1.state;
    const p2 = p1.replaceState(A2);
    const s2 = p2.state;

    expect(s1.b).toBe(s2.b);
  });

  it("handles freezed objects", () => {
    const O1 = {
      a: 1,
      b: 2,
      c: { d: 4 }
    };
    const O2 = Object.freeze(O1);

    const trapped = proxyState(O2);
    const { state } = trapped;
    const read = state.a + state.b + state.c.d;
    expect(read).toEqual(7);
    expect(trapped.affected).toMatchSnapshot();
  });

  it("handles prototype chain", () => {
    const o1 = {
      a1: 1
    };
    const o2 = {
      a2: 2
    };
    Object.setPrototypeOf(o2, o1);
    expect(Object.getPrototypeOf(o2)).toBe(o1);
    expect(o1.isPrototypeOf(o2)).toBe(true);
    const trapped = proxyState(o2);
    expect(o1.isPrototypeOf(trapped.state)).toBe(true);
  });

  it("detect self", () => {
    const A = { a: 1 };
    const B = proxyState(A).state;
    const C = deproxify(B);

    expect(isProxyfied(A)).toBe(false);
    expect(isProxyfied(B)).toBe(true);
    expect(isProxyfied(C)).toBe(false);
    expect(C).toBe(A);
  });

  describe("types", () => {
    it("should handle date", () => {
      const A = { d: new Date() };
      const p = proxyState(A);
      const B = p.state;
      expect(B.d.getDate()).toEqual(new Date().getDate());
      expect(p.affected).toMatchSnapshot();
    });

    it("should handle Promise", () => {
      const A = { d: Promise.resolve() };
      const p = proxyState(A);
      const B = p.state;
      const result = B.d.then(() => true);
      expect(p.affected).toMatchSnapshot();
      return result;
    });

    it("should handle Map.get", () => {
      const A = { d: new Map([[1, 2]]) };
      const p = proxyState(A);
      const B = p.state;
      expect(B.d.get(1)).toBe(2);
      expect(p.affected).toMatchSnapshot();
    });

    it("should handle Map.keys", () => {
      const A = { d: new Map([["key", "value"]]) };
      const p = proxyState(A);
      const B = p.state;
      expect([...B.d.keys()]).toEqual([...A.d.keys()]);
      expect(p.affected).toMatchSnapshot();
    });

    it("should handle Map.values", () => {
      const A = { d: new Map([[1, 2]]) };
      const p = proxyState(A);
      const B = p.state;
      expect([...B.d.values()]).toEqual([...A.d.values()]);
      expect(p.affected).toMatchSnapshot();
    });

    it("should handle Map.entries", () => {
      const A = { d: new Map([[1, { sub1: 1, sub2: 2 }]]) };
      const p = proxyState(A);
      const B = p.state;

      expect(B.d.entries().next().value[1].sub2).toBe(2);
      expect(p.affected).toMatchSnapshot();

      expect([...B.d.entries()]).toEqual([...A.d.entries()]);
      expect(p.affected).toMatchSnapshot();
    });

    it("should handle Map.has", () => {
      const A = { d: new Map([[1, 2]]) };
      const p = proxyState(A);
      const B = p.state;
      expect(B.d.has(1)).toBe(true);
      expect(p.affected).toMatchSnapshot();
    });

    it("should handle Map.iterator", () => {
      const A = { d: new Map([[1, 2]]) };
      const p = proxyState(A);
      const B = p.state;

      const realMap = [];
      for (const item of new Map([[1, 2]])) realMap.push(item);

      const proxyMap = [];
      //console.log(B.d.entries(), B.d.values());
      //console.log(typeof new Map(), typeof B.d, B.d, B.d.entries);
      for (const item of B.d) proxyMap.push(item);

      expect(proxyMap).toEqual(realMap);
    });
  });

  describe("set", () => {
    it("should not let you set value", () => {
      const A = { a: 1, b: 2 };
      const p = proxyState(A);
      const B = p.state;

      expect(() => (B.a = 2)).toThrow();
      expect(A.a).toBe(1);
      expect(B.a).toBe(1);
    });
  });

  it("isProxified(number/string) should return false", () => {
    expect(isProxyfied(1)).toBe(false);
    expect(isProxyfied("1")).toBe(false);
  });

  it("deproxify", () => {
    expect(deproxify({ a: 1 })).toMatchSnapshot();
    const p = proxyState({ a: new Map([[1, { b: 2 }]]) });
    expect(deproxify(p.state.a)).toMatchSnapshot();
  });

  describe("corners", () => {
    it("undefined", () => {
      const p = proxyState(undefined);
      expect(p).toMatchSnapshot();
    });

    it("null", () => {
      const p = proxyState(null);
      expect(p).toMatchSnapshot();
    });

    it("number", () => {
      const p = proxyState(99);
      expect(p).toMatchSnapshot();
    });

    it("string", () => {
      const p = proxyState("abc");
      expect(p).toMatchSnapshot();
    });

    it("array", () => {
      const p = proxyState([1,2,3]);
      expect(p).toMatchSnapshot();
    });

    it("deproxify(undefined)", () => {
      const p = deproxify(undefined);
      expect(p).toMatchSnapshot();
    });

    it("deproxify(null)", () => {
      const p = deproxify(null);
      expect(p).toMatchSnapshot();
    });
  });
});
