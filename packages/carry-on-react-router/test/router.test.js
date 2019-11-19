import { register, connect } from "carry-on-store";
import router from "../src/router";

it("router matches snapshot", () => {
  register(router());
  expect(connect()).toMatchSnapshot();
});
