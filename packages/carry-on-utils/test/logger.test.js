/**
 * @jest-environment jsdom
 */
import logger from "../src/logger";

describe("logger", () => {
  it("should log some stuff", () => {
    const rslt = [];
    const out = function () {
      rslt.push(arguments);
    };

    const log = logger("test", out);
    log("test message");
    log("-continuation");

    expect(rslt).toMatchSnapshot();

    let i = 0;
    while (i < 5) {
      logger();
      i += 1;
    }

    const log2 = logger("test", out);
    log2("test message");
    log2("-continuation");

    expect(rslt).toMatchSnapshot();
  });
});
