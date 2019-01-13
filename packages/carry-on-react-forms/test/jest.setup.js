import 'react-testing-library/cleanup-after-each'
import { toMatchDiffSnapshot } from "snapshot-diff";
import { cleanup } from "react-testing-library";

expect.extend({ toMatchDiffSnapshot });
afterEach(cleanup);
