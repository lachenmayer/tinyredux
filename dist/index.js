'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialAction = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Stateful;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialAction = exports.initialAction = { type: '__init__' };

function Stateful(WrappedComponent, reducer) {
  var StatefulComponent = function (_React$Component) {
    _inherits(StatefulComponent, _React$Component);

    function StatefulComponent(props) {
      _classCallCheck(this, StatefulComponent);

      var _this = _possibleConstructorReturn(this, (StatefulComponent.__proto__ || Object.getPrototypeOf(StatefulComponent)).call(this, props));

      if (typeof reducer !== 'function' && reducer.length !== 2) {
        throw new Error('reducer needs to be a function of shape (state, action) => state');
      }
      _this.state = reducer(undefined, initialAction);
      return _this;
    }

    _createClass(StatefulComponent, [{
      key: 'dispatch',
      value: function dispatch(action) {
        this.setState(function (state) {
          return reducer(state, action);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        if (defined(this.props.dispatch)) {
          console.warn(StatefulComponent.displayName + ': You provided a "dispatch" prop. This will be ignored. Remove the prop to get rid of this message.');
        }
        if (defined(this.props.state)) {
          console.warn(StatefulComponent.displayName + ': You provided a "state" prop. This will be ignored. Remove the prop to get rid of this message.');
        }
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          dispatch: this.dispatch.bind(this),
          state: this.state
        }));
      }
    }]);

    return StatefulComponent;
  }(_react2.default.Component);

  StatefulComponent.displayName = 'Stateful(' + getComponentDisplayName(WrappedComponent) + ')';

  return StatefulComponent;
}

function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

function defined(x) {
  return typeof x !== 'undefined';
}
