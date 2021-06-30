import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import { BrowserRouter } from "carry-on-react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { create } from "jss";
import {
  StylesProvider,
  createGenerateClassName,
  jssPreset,
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core/styles";
import mergeAdvanced from "object-merge-advanced";
import { ErrorBoundary } from "react-error-boundary";
import FavIcon from "react-favicon";
import { State, Register, Render } from "carry-on-react";
import { deproxify } from "carry-on-utils";

const generateClassName = createGenerateClassName({ productionPrefix: "_" });
const jss = create(jssPreset());
const helmetContext = {};

const AppFallbackComponent = ({ error, resetErrorBoundary }) => (
  <div>
    <p>
      <strong>Oops! An error occured!</strong>
    </p>
    <p>
      <strong>Error:</strong> {error.toString()}
    </p>
    <button type="button" onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const themeState =
  theme =>
  ({ set }) => ({
    initialTheme: theme || {},
    theme: responsiveFontSizes(createMuiTheme(theme)),
    setTheme: t => {
      set(state => {
        state.initialTheme = t;
        state.theme = responsiveFontSizes(createMuiTheme(t));
      });
    },
    mergeTheme: t => {
      set(state => {
        const merged = mergeAdvanced(state.initialTheme, t);
        state.theme = responsiveFontSizes(createMuiTheme(merged));
      });
    }
  });

const MaterialApp = ({ children, ...props }) => (
  <State>
    <Register>{{ ...props }}</Register>
    <Register>{themeState(props.theme)}</Register>
    <Render>
      {({
        FallbackComponent = AppFallbackComponent,
        Router = BrowserRouter,
        basename,
        onError,
        theme,
        favIcon,
        title,
        scopedCss,
        CssBaselineComponent = scopedCss ? ScopedCssBaseline : CssBaseline,
        container
      }) => (
        <Router basename={basename}>
          <StylesProvider jss={jss} generateClassName={generateClassName}>
            <MuiThemeProvider theme={deproxify(theme)}>
              <CssBaselineComponent>
                <Container {...container}>
                  <ErrorBoundary
                    onError={onError}
                    FallbackComponent={FallbackComponent}
                  >
                    <HelmetProvider context={helmetContext}>
                      <Helmet>{title}</Helmet>
                      <FavIcon url="" {...favIcon} />
                      <AppBar />
                      {children}
                    </HelmetProvider>
                  </ErrorBoundary>
                </Container>
              </CssBaselineComponent>
            </MuiThemeProvider>
          </StylesProvider>
        </Router>
      )}
    </Render>
  </State>
);

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
