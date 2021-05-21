---
id: carryOn
title: carryOn
---

## Import

```js
import { carryOn } from "carry-on-react";
```

## `carryOn(`_`opt`_`,`_`renderFn`_`)`

A convenience function for creating a React component that can access store state.

```js live noInline
import { carryOn } from "carry-on-react";

const Nav = carryOn((props, state) => (
  <ul>
    {state.site.nav.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
));

const Menu = carryOn((props, state) => (
  <ul>
    {state.site.menu.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
));

const Content = carryOn((props, state) => <div>{state.site.content}</div>);

const App = carryOn(
  // Use object parameter to specify State properties
  {
    // id is used for log messages and the component's displayName
    id: "App",
    // use of register property:
    register: {
      state: {
        site: {
          components: {
            nav: Nav,
            menu: Menu,
            content: Content
          },
          menu: ["one", "two", "three"],
          nav: ["a", "b", "c"],
          content: "The content"
        }
      }
    },
    // components dont change
    constant: true
  },
  // Use function parameter to specify render function
  (
    // Component props
    { title },
    // Store state
    {
      site: {
        components: { nav: Nav, menu: Menu, content: Content }
      }
    }
  ) => (
    <div>
      <h1>{title}</h1>
      <Nav />
      <Menu />
      <div>
        <Content />
      </div>
    </div>
  )
);

render(<App title="CarryOn" />);
```

## Parameters

| Parameter | Description                                                                            |
| --------- | -------------------------------------------------------------------------------------- |
| opt       | An object specifying the props to pass to the underlying `State` component.            |
| renderFn  | A render function called with props and store state. It should return a React element. |
