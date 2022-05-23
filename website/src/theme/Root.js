import React from "react";
import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";
import { ColorModeProvider } from '@docusaurus/theme-common';

export const muiCache = createCache({
  'key': 'mui',
  'prepend': true,
});

const Root = ({ children }) => (
  <CacheProvider value={muiCache}>
    <ColorModeProvider>
      {children}
    </ColorModeProvider>
  </CacheProvider>
);

export default Root;
