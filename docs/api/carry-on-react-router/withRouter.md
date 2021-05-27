---
id: withRouter
title: withRouter
---

```js live noInline
const storeId = "withRouterExample";

const RootPage = withRouter(props => (
  <>
    <h1>Root</h1>
    <Inspector data={props} expandLevel={5} />
  </>
));

const Page1 = withRouter(props => (
  <>
    <h1>Page 1</h1>
    <Inspector data={props} expandLevel={5} />
  </>
));

const Page2 = withRouter(props => (
  <>
    <h1>Page 2</h1>
    <Inspector data={props} expandLevel={5} />
  </>
));

const activeStyle = {
  color: "red"
};

render(
  <HashRouter from={storeId}>
    <ul>
      <li>
        <NavLink from={storeId} exact activeStyle={activeStyle} to="/">
          Root
        </NavLink>
      </li>
      <li>
        <NavLink from={storeId} activeStyle={activeStyle} to="/page1">
          Page 1
        </NavLink>
      </li>
      <li>
        <NavLink from={storeId} activeStyle={activeStyle} to="/page2">
          Page 2
        </NavLink>
      </li>
    </ul>
    <div style={{ border: "2px solid red", padding: "12px 24px" }}>
      <Route
        from={storeId}
        exact
        path="/"
        render={() => <RootPage from={storeId} />}
      />
      <Route
        from={storeId}
        exact
        path="/page1"
        render={() => <Page1 from={storeId} />}
      />
      <Route
        from={storeId}
        exact
        path="/page2"
        render={() => <Page2 from={storeId} />}
      />
    </div>
    <StateInspector from={storeId} />
  </HashRouter>
);
```
