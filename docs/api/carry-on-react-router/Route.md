---
id: Route
title: <Route>
---

```js live noInline
render(
  <HashRouter>
    <ul>
      <li>
        <Link to="/">Root</Link>
      </li>
      <li>
        <Link to="/page1">Page 1</Link>
      </li>
      <li>
        <Link to="/page2">Page 2</Link>
      </li>
    </ul>

    <div style={{ border: "2px solid red", padding: "12px 24px" }}>
      <h1>
        <Route exact path="/" render={() => "Root Route"} />
        <Route exact path="/page1" render={() => "Page 1"} />
        <Route exact path="/page2" render={() => "Page 2"} />
      </h1>
    </div>
  </HashRouter>
);
```
