---
id: usingState
title: Using State
---

## Import

```js
import { State } from "carry-on-react";
```

## Basic usage

### Default store

The child node of a `State` component is a render function. The render function
is given the store state as it's first parameter.

```js live noInline
register({ state: { field1: "value" } });

render(<State>{state => state.field1}</State>);
```

### Named store

A named store can be accessed using the `from` property:

```js live noInline
register("Store1", { state: { field1: "value" } });

render(<State from="Store1">{state => state.field1}</State>);
```

### Use Hook

Functional components have the `useCarryOn` hook to access state.

```js live noInline
const Component = () => {
  const [field1, set] = useCarryOn({
    from: "Store1",
    register: {
      state: {
        field1: "value"
      }
    },
    select: state => state.field1
  });
  return <div>{field1}</div>;
};

render(
  <>
    <Component />
    <StateInspector from="Store1" />
  </>
);
```

## Access tracking

When using the `State` component, selectors indicating which fields should be subscribed to are optional. This is because when the render function executes the state is monitored for usage via a `Proxy`. The usage tracking is
then used to determine which state fields will cause the `State` component to
update.

In the next example, the first `State` component will update when `field1`
changes, and the second `State` component will update when `field2` changes.

```js live noInline
register({ state: { field1: "value", field2: "value" } });

render(
  <div>
    <State>{state => <div>{state.field1}</div>}</State>
    <State>{state => <div>{state.field2}</div>}</State>
  </div>
);
```

### Strict

The list of monitored state fields does not change once created. You can force
every render to be monitored by specifying the `strict` property.

```js live noInline
register({ state: { field1: "value" } });

render(<State strict>{state => <div>{state.field1}</div>}</State>);
```

## Constant

If the state needed is constant, the `constant` property will prevent any
render updates after the first render.

```js live noInline
register({ state: { field1: "value" } });

render(<State constant>{state => <div>{state.field1}</div>}</State>);
```

## Path

A string `path` property can be used to choose a specific object or value. Dotted paths and indexes are supported.

```js live noInline
register({ state: { field1: "value" } });

render(<State path="field1">{field1 => <div>{field1}</div>}</State>);
```

## Select

An optional selector can be used with the `select` property. When the `select`
property is used, access tracking will be applied to the `select` function and
not the render function.

```js live noInline
register({ state: { field1: "value" } });

render(
  <State select={state => state.field1}>{field1 => <div>{field1}</div>}</State>
);
```

## Default value

The `default` property lets you subsitute a default state value when the store state specified by the path property is undefined.

```js live noInline
render(
  <State
    id="defaultValueExample"
    from="unknownStore"
    path="unknownField"
    default="Undefined field."
  >
    {field => <div>{field}</div>}
  </State>
);
```

## Delayed updates

In some cases, state change updates may arrive too quickly for a component to
sensibly make use of. The `throttle` and `debounce` properties will apply the
corresponding delay to any state change updates a `State` component is
subscribed to.

### Throttle

```js live noInline
const eventHandler = e => {
  set(state => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
  });
};

document.addEventListener("mousemove", eventHandler);

render(
  <State
    throttle={500}
    onUnmount={() => {
      document.removeEventListener("mousemove", eventHandler);
    }}
  >
    {state => (
      <div>
        {state.mouseX}, {state.mouseY}
      </div>
    )}
  </State>
);
```

### Debounce

```js live noInline
const eventHandler = e => {
  set(state => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
  });
};

document.addEventListener("mousemove", eventHandler);

render(
  <State
    debounce={500}
    onUnmount={() => {
      document.removeEventListener("mousemove", eventHandler);
    }}
  >
    {state => (
      <div>
        {state.mouseX}, {state.mouseY}
      </div>
    )}
  </State>
);
```

## Debugging

Three properties are available for debugging. Debug messages are sent to the console.

`debug` will log debug messages.
`verbose` will log verbose debug messages.
`id` will set an identifier to include in the log messages.

```js live noInline
state({ field1: "value" });

render(
  <State debug verbose id="Field div">
    {state => <div>{state.field1}</div>}
  </State>
);
```

### Global Debugging

Debugging can be turned on or off for all `State` components:

```js
State.Debug = true;
State.Verbose = true;
```

## Lifecycle Events

Use the `onMount` and `onUnmount` properties when you need to execute
actions during those lifecycle events.

```js live noInline
state({ field1: "value" });

render(
  <State
    onMount={state => {
      console.log("State mounted", state);
    }}
    onUnmount={state => {
      console.log("State unmounted", state);
    }}
  >
    {state => <div>{state.field1}</div>}
  </State>
);
```
