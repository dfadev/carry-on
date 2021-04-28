import "@testing-library/jest-dom/extend-expect";
import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });
