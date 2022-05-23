const { toMatchDiffSnapshot } = require("snapshot-diff");
const { cleanup } = require("@testing-library/react");

expect.extend({ toMatchDiffSnapshot });
afterEach(cleanup);
