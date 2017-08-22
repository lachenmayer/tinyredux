import test from 'ava'
import React from 'react'
import Renderer from 'react-test-renderer'

import Stateful, {initialAction} from './'

test('Stateful component adds dispatch, state props & passes down other props', t => {
  function reducer (state, action) {
    return {some: 'state'}
  }
  const Component = props => {
    t.is(typeof props.dispatch, 'function')
    t.is(props.dispatch.length, 1)
    t.deepEqual(props.state, {some: 'state'})
    t.is(props.someOtherProp, 'is passed down')
    return null
  }
  const StatefulComponent = Stateful(Component, reducer)
  Renderer.create(<StatefulComponent someOtherProp={'is passed down'} />)
  t.is(StatefulComponent.displayName, 'Stateful(Component)')
})

test('state is set as props', t => {
  function reducer (state, action) {
    return {foo: 'bar'}
  }
  const Component = props => {
    t.deepEqual(props.state, {foo: 'bar'})
    return null
  }
  const StatefulComponent = Stateful(Component, reducer)
  Renderer.create(<StatefulComponent />)
})

test('reducer is called with undefined state & initial action first', t => {
  function reducer (state, action) {
    t.is(state, undefined)
    t.is(action, initialAction)
  }
  const Component = props => null
  const StatefulComponent = Stateful(Component, reducer)
  Renderer.create(<StatefulComponent />)
})

test.cb('dispatch calls reducer with given action & updates state', t => {
  let dispatched = false
  const Component = props => {
    if (!dispatched) {
      setTimeout(() => { props.dispatch('action') }, 1)
      dispatched = true
    } else {
      t.deepEqual(props.state, {success: 'is inevitable'})
      t.end()
    }
    return null
  }
  function reducer (state = {}, action) {
    if (action === 'action') {
      return {success: 'is inevitable'}
    }
    return state
  }
  const StatefulComponent = Stateful(Component, reducer)
  Renderer.create(<StatefulComponent />)
})
