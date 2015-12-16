'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ExecutionEnvironment = require('exenv');

var SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {};

module.exports = React.createClass({
  displayName: 'ReactGateway',

  propTypes: {
    to: React.PropTypes.instanceOf(SafeHTMLElement).isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.element.isRequired
  },

  componentDidMount: function() {
    this.props.to.ownerDocument.createElement('div');
    if (this.props.className) this.gatewayNode.className = this.props.className;
    this.props.to.appendChild(this.gatewayNode);
    this.renderIntoGatewayNode(this.props);
  },

  componentWillReceiveProps: function(props) {
    this.renderIntoGatewayNode(props);
  },

  componentWillUnmount: function() {
    ReactDOM.unmountComponentAtNode(this.gatewayNode);
    this.gatewayNode.parentNode.removeChild(this.gatewayNode);
    delete this.gatewayNode;
  },

  renderIntoGatewayNode: function(props) {
    delete props.ref;
    ReactDOM.unstable_renderSubtreeIntoContainer(this, props.children, this.gatewayNode);
  },

  render: function() {
    return null;
  }
});
