import React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { BrowserRouter } from "carry-on-react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { State, Register, Render } from "carry-on-react";
import { FormView } from "carry-on-react-view";

export const muiCache = createCache({
  key: "mui",
  prepend: true
});

function AppFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>
        <strong>Oops! An error occured!</strong>
      </p>
      <p>
        <strong>Error:</strong> {error.toString()}
      </p>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

const helmetContext = {};
function DefaultSiteWrapper({ children }) {
  return (
    <State>
      <Render>
        {({ title }) => (
          <HelmetProvider context={helmetContext}>
            <Helmet>{title}</Helmet>
            {children}
          </HelmetProvider>
        )}
      </Render>
    </State>
  );
}

function MaterialApp({ children, ...props }) {
  return (
    <State>
      <Register>{{ ...props }}</Register>
      <Render>
        {({
          FallbackComponent = AppFallbackComponent,
          Router = BrowserRouter,
          SiteWrapper = DefaultSiteWrapper,
          basename,
          onError
        }) => (
          <Router basename={basename}>
            <CacheProvider value={muiCache}>
              <ErrorBoundary
                onError={onError}
                FallbackComponent={FallbackComponent}
              >
                <SiteWrapper>
                  <FormView id="app" noFormTag />
                </SiteWrapper>
              </ErrorBoundary>
            </CacheProvider>
          </Router>
        )}
      </Render>
    </State>
  );
}

/*
y = {
  theme: customTheme,
  FallbackComponent: () => "error!",
  links: {
    home: {
      url: "/",
      component: Home,
      icon: <HomeIcon />
    },
    blog: {
      url: "/blog",
      component: Blog,
      label: "Blog",
      icon: <BlogIcon />
    },
    about: {
      url: "/about",
      component: About,
      label: "About",
      icon: <AboutIcon />
    },
    account: {
      url: "/account",
      component: Account,
      authorized: true
    },
    github: {
      href: "https://github.com",
      target: "_blank",
      icon: <GithubIcon />
    },
    search: {
      label: <SearchField />
    }
  },
  nav: {
    top: ["home", "blog", "github", "search"],
    left: [],
    right: [],
    bottom: [
      ["f1", "f2", "f3"],
      ["f4", "f5", "f6"],
      ["f7", "f8", "about"]
    ]
  },
};

z = (
  <App basename="/">
    <Theme>{customTheme}</Theme>
    <FallbackComponent>
      <div>An error has occured.</div>
    </FallbackComponent>
    <AppBar>
      <HamburgerMenu />
      <NavLinks />
      <Spacer />
      <Search />
      <Notifications />
      <Account />
    </AppBar>
    <Switch>
      <Route url={"/"} component={Home} />
      <Route url={"/about"} component={About} />
      <Route url={"/user"} component={User} authorized />
      <Route url={"/login"} component={Login} />
      <Route url={"/shop"} component={Shop} authorized />
    </Switch>
    <Footer />
  </App>
);
*/
export default MaterialApp;
