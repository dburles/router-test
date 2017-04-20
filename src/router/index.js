import React, { Component } from 'react';

let routes = [];
let setState;

function getComponent() {
  const { component } = routes.find(
    ({ path, component }) => path === document.location.pathname,
  );
  return component;
}

function onStateChange(cb) {
  setState = cb;
}

window.onpopstate = event => setState();

const handleLink = href => event => {
  event.preventDefault();
  history.pushState({}, null, href);
  setState();
};

function Link({ href, children }) {
  return (
    <a href={href} onClick={handleLink(href)}>
      {children}
    </a>
  );
}

const router = { Link };

export const withRouter = WrappedComponent => props => (
  <WrappedComponent {...props} router={router} />
);

export default class Router extends Component {
  constructor(props) {
    super(props);
    routes = props.routes;
    onStateChange(() => this.setState({}));
  }

  render() {
    const RoutedComponent = getComponent();
    return <RoutedComponent />;
  }
}
