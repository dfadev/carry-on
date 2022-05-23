import React from "react";
import { State } from "carry-on-react";
import { getIn } from "carry-on-utils";
import Lifecycle from "./Lifecycle";

/**
 * The public API for prompting the user before navigating away from a screen.
 */
function Prompt({ history = "app.history", message, when = true }) {
  return (
    <State id="Prompt">
      {state => {
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
      }}
    </State>
  );
}

export default Prompt;
