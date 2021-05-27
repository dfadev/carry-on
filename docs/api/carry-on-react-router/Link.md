---
id: Link
title: <Link>
---

Render a hyperlink.

## Properties

| Property  | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| `from`    | What store to retrieve state from.                                         |
| `history` | The key where location history resides in the store                        |
| `replace` | When clicked, replace the current location with this URL.                  |
| `to`      | When clicked, navigate to this URL and add an entry to navigation history. |
| `onClick` | When clicked, execute this function.                                       |
| `target`  | Pass thru `target` attribute to `a` HTML element                           |
| `force`   | Force location change via `window.location`.                               |
| `...rest` | The remaining props are passed to the link `a` element.                    |

```js live noInline
render(
  <HashRouter id="router">
    <ul>
      <li>
        <Link id="link1" to="/">Root</Link>
      </li>
      <li>
        <Link id="link2" to="/page1">Page 1</Link>
      </li>
      <li>
        <Link id="link3" to="/page2">Page 2</Link>
      </li>
    </ul>
    <div style={{ border: "2px solid red", padding: "12px 24px" }}>
      <h1>
        <Route id="route1" exact path="/" render={() => "Root Route"} />
        <Route id="route2" exact path="/page1" render={() => "Page 1"} />
        <Route id="route3" exact path="/page2" render={() => "Page 2"} />
      </h1>
    </div>
  </HashRouter>
);
```
