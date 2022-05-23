import React from 'react';
import Playground from '@theme/Playground';
import ReactLiveScope from '../ReactLiveScope';
import CodeBlock from '@theme-init/CodeBlock';

const transformCode = code => {
  const removeImports = code
    .split("\n")
    .filter(line => !line.startsWith("import"))
    .join("\n");
  return removeImports;
};

const withLiveEditor = (Component) => {
  function WrappedComponent(props) {
    if (props.live) {
      // @ts-expect-error: we have deliberately widened the type of language prop
      return <Playground scope={ReactLiveScope} transformCode={transformCode} {...props} />;
    }
    return <Component {...props} />;
  }
  return WrappedComponent;
};
export default withLiveEditor(CodeBlock);
