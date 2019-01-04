import React from "react";
import { carryOn } from "carry-on-react";
import { getIn } from "carry-on-utils";
import Lifecycle from "./Lifecycle";

/**
 * The public API for prompting the user before navigating away from a screen.
 */
const Prompt = carryOn(
  { id: "Prompt" },
  ({ history = "app.history", message, when = true }, state) => {
    const hist = getIn(state, history);

    if (!when || hist.staticContext) return null;

    const method = hist.block;

    return (
      <Lifecycle
        onMount={self => {
          self.release = method(message);
        }}
        onUpdate={(self, prevProps) => {
          if (prevProps.message !== message) {
            self.release();
            self.release = method(message);
          }
        }}
        onUnmount={self => {
          self.release();
        }}
        message={message}
      />
    );
  }
);

export default Prompt;
