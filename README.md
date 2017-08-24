# tinyredux

![banner](https://img.shields.io/badge/does%20this%20need%20a%20badge%3F-no%2C%20read%20the%20source-red.png)


> [Redux](http://redux.js.org/) implemented with React setState(). For when you want a reducer, but you can't be bothered with connecting stores and all that.

One of Redux's biggest appeals is that you can use it with any view framework, as long as it has some semblance of sanity.

But sometimes you're just deep in writing some hacky React code, and you start getting sick of having to use `.setState` everywhere, so you feel like ugh maybe I should import Redux, but can I really be bothered, so maybe I'll just do what [Dan Abramov says to people that might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), but hey this could be a nice npm module, after all there is an [`is-negative`](https://www.npmjs.com/package/is-negative) package so why be ashamed and this does actually save me some brain cycles so why not publish it so that it may save others some brain cycles too.

So here we are.

Simply wrap your component in the [HOC](https://facebook.github.io/react/docs/higher-order-components.html) exported by this module, write a reducer, and start dispatching.

## Example

```js
import Stateful from 'tinyredux'

function reducer (state = {count: 0}, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
  }
  return state
}

const Component = ({state, dispatch}) => (
  <div>
    Count: {state.count}
    <button onClick={() => dispatch({type: 'increment'})}>+</button>
    <button onClick={() => dispatch({type: 'decrement'})}>-</button>
  </div>
)

const Counter = Stateful(Component, reducer)

// Now you can use <Counter /> wherever you like! :)
```

## API

### `Stateful(component: React.Component, reducer: (state: S, action: A) => S) => React.Component`

A [HOC](https://facebook.github.io/react/docs/higher-order-components.html) which returns a component with two additional props:

- `state: S` The state that is returned by the `reducer`.
- `dispatch: A => void` A function that can be used to call the reducer with a new action.

If you accidentally pass props called `state` or `dispatch` to this component, you will get a warning that the props you passed will be ignored.

The reducer needs to be a function that takes two arguments: `state` and `action`. The `state` always needs to be an `Object` due to how `setState` works under the hood, but the `action` type can be anything.

The `reducer` is called once when the component is constructed. The `state` parameter is always `undefined` on the initial call. The `action` parameter has an opaque value which you should never need to match on. It is exported as `initialAction` so you can check it for `===` equality, but you should never need to do that. (Feel free to prove me wrong - it's your code, you can do whatever you want.)

A common pattern is to define the initial state using [default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters), like this:

```js
function reducer (state = {whatever: 'initial state you want'}, action) {
  // ... do something with actions
  return state
}
```

This only works in modern browsers, but if you're using React, then you're going to transpilimumbojumbobabelify the whole mess anyway.

## Install

```
npm install tinyredux
```

## TODO

- [ ] Implement `mapDispatchToProps` / `mapStateToProps` from Redux's [`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) API.

## Maintainers

[@lachenmayer](https://github.com/lachenmayer)

## Contribute

PRs accepted.

## License

MIT © 2017 harry lachenmayer
