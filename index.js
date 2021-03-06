import React from 'react'

export const initialAction = {type: '__init__'}

export default function Stateful (WrappedComponent, reducer) {
  class StatefulComponent extends React.Component {
    constructor (props) {
      super(props)
      if (typeof reducer !== 'function' && reducer.length !== 2) {
        throw new Error('reducer needs to be a function of shape (state, action) => state')
      }
      this.state = reducer(undefined, initialAction)
    }

    dispatch (action) {
      this.setState(state => reducer(state, action))
    }

    render () {
      if (defined(this.props.dispatch)) {
        console.warn(`${StatefulComponent.displayName}: You provided a "dispatch" prop. This will be ignored. Remove the prop to get rid of this message.`)
      }
      if (defined(this.props.state)) {
        console.warn(`${StatefulComponent.displayName}: You provided a "state" prop. This will be ignored. Remove the prop to get rid of this message.`)
      }
      return (
        <WrappedComponent
          {...this.props}
          dispatch={this.dispatch.bind(this)}
          state={this.state}
        />
      )
    }
  }

  StatefulComponent.displayName = `Stateful(${getComponentDisplayName(WrappedComponent)})`

  return StatefulComponent
}

function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

function defined (x) {
  return typeof x !== 'undefined'
}
