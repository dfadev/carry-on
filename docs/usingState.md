---
id: usingState
title: Using State
---

## Import

```JavaScript
import { State } from "carry-on-react";
```

## Basic usage

### Default store

The child node of a `State` component is a render function. The render function
is given the store state as it's first parameter.

```JavaScript
const App = props => (
  <State>
    {state => ({
      <div>
        {state.field}
      </div>
    })}
  </State>
);
```

### Named store

A named store can be accessed using the `from` property:

```JavaScript
const App = props => (
  <State from="Store1">
    {state => ({
      <div>
        {state.field}
      </div>
    })}
  </State>
);
```

## Access tracking

In the above examples there are no selectors indicating which fields the `State`
component should subscribe to. This is because when the render function is
executed the state is monitored for usage via a Proxy. The usage tracking is
then used to determine which state fields will cause the `State` component to
update.

In the next example, the first `State` component will update when `field1`
changes, and the second `State` component will update when `field2` changes.

```JavaScript
const App = props => (
  <div>
    <State>
      {state => ({
        <div>
          {state.field1}
        </div>
      })}
    </State>
    <State>
      {state => ({
        <div>
          {state.field2}
        </div>
      })}
    </State>
  </div>
);
```

### Strict

The list of monitored state fields does not change once created. You can force
every render to be monitored by specifying the `strict` property.

```JavaScript
const App = props => (
  <State strict>
    {state => ({
      <div>
        {state.field}
      </div>
    })}
  </State>
);
```

## Constant

If the state needed is constant, the `constant` property will prevent any
render updates after the first render.

```JavaScript
const App = props => (
  <State constant>
    {state => ({
      <div>
        {state.releaseVersion}
      </div>
    })}
  </State>
);
```

## Path

A string `path` property can be used to choose a specific object or value:

```JavaScript
const App = props => (
  <State path="dotted.path.array[0].field">
    {field => ({
      <div>
        {field}
      </div>
    })}
  </State>
);
```

## Select

An optional selector can be used with the `select` property. When the `select`
property is used, access tracking will be applied to the `select` function and
not the render function.

```JavaScript
const App = props => (
  <State select={state => state.field}>
    {field => ({
      <div>
        {field}
      </div>
    })}
  </State>
);
```

## Default value

The `default` property lets you subsitute a default value when the state is
undefined.

```JavaScript
const App = props => (
  <State select={state => state.field} default="Undefined state.">
    {field => ({
      <div>
        {field}
      </div>
    })}
  </State>
);
```

## Delayed updates

In some cases, state change updates may arrive too quickly for a component to
sensibly make use of. The `throttle` and `debounce` properties will apply the
corresponding delay to any state change updates a `State` component is
subscribed to.

### Throttle

```JavaScript
const App = props => (
  <State throttle={100}>
    {state => ({
      <div>
        {state.mouseX}, {state.mouseY}
      </div>
    })}
  </State>
);
```

### Debounce

```JavaScript
const App = props => (
  <State debounce={500}>
    {state => ({
      <div>
        {state.documentModel.toHtml()}
      </div>
    })}
  </State>
);
```

## Debugging

Three properties are available for debugging.

`debug` will log debug messages.
`verbose` will log verbose debug messages.
`id` will set an identifier to include in the log messages.

```JavaScript
const App = props => (
  <State debug verbose id="Field div">
    {state => ({
      <div>
        {state.field}
      </div>
    })}
  </State>
);
```

### Global

Debugging can be turned on for all `State` components:

```JavaScript
State.Debug = true;
State.Verbose = true;
```

## Lifecycle Events

Use the `onMount` and `onUnmount` properties when you need to execute
actions during those lifecycle events.

```JavaScript
const App = props => (
  <State
    onMount={state => { console.log("State mounted", state); }}
    onUnmount={state => { console.log("State unmounted", state); }}
  >
    {state => ({
      <div>
        {state.field}
      </div>
    })}
  </State>
);
```

## carryOn factory

The `carryOn` factory function is available as shorthand for a typical stateful component:

```JavaScript
import { carryOn } from "carry-on-react";

const Nav = carryOn((props, state) => (
  <ul>{state.site.nav.map(item => <li key={item}>{item}</li>)}</ul>
));

const Menu = carryOn((props, state) => (
  <ul>{state.site.menu.map(item => <li key={item}>item</li>)}</ul>
));

const Content = carryOn((props, state) => (<div>{state.site.content}</div>));

const state = {
  site: {
    components: {
      nav: Nav,
      menu: Menu,
      content: Content
    },
    menu: ["one", "two", "three"],
    nav: ["a", "b", "c"],
    content: "Read This"
  }
};

register({ state });

const App = carryOn((
  // Component props
  { title, className },
  // Store state
  {
    site: {
      components: { nav, menu, content }
    }
  }
) => (
  <div className={className}>
    <h1>{title}</h1>
    <nav />
    <menu />
    <div>
      <content />
    </div>
  </div>
));
```
