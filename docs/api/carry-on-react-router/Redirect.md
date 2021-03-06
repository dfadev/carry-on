---
id: Redirect
title: <Redirect>
---

```js live noInline
const activeStyle = {
  color: "red"
};

render(
  <HashRouter>
    <ul>
      <li>
        <NavLink exact activeStyle={activeStyle} to="/">
          Root
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={activeStyle} to="/page1">
          Page 1
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={activeStyle} to="/page2">
          Page 2
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={activeStyle} to="/page3">
          Page 3
        </NavLink>
      </li>
    </ul>

    <div style={{ border: "2px solid red", padding: "12px 24px" }}>
      <h1>
        <Route exact path="/" render={() => "Root Route"} />
        <Route exact path="/page1" render={() => "Page 1"} />
        <Route exact path="/page2" render={() => "Page 2"} />
        <Route
          exact
          path="/page3"
          render={() => (
            <>
              <Prompt message="oops page closed, redirecting" />
              <Redirect to="/" />
            </>
          )}
        />
      </h1>
    </div>
  </HashRouter>
);
```
