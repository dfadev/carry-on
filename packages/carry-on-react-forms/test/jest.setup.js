import { toMatchDiffSnapshot } from "snapshot-diff";
import { cleanup } from "@testing-library/react";

expect.extend({ toMatchDiffSnapshot });
afterEach(cleanup);
