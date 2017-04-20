import React, { Component } from 'react';

const subscriptions = [];

function subscribe(fn) {
  subscriptions.push(fn);
  return function() {
    subscriptions.splice(subscriptions.indexOf(fn), 1);
  };
}

function notify() {
  subscriptions.forEach(fn => fn());
}

window.onpopstate = event => notify();

const handleLink = href => event => {
  event.preventDefault();
  history.pushState({}, null, href);
  notify();
};

function Link({ href, children }) {
  return (
    <a href={href} onClick={handleLink(href)}>
      {children}
    </a>
  );
}

function withState(WrappedComponent) {
  return class extends Component {
    subscription = subscribe(() => this.setState({}));

    componentWillUnmount() {
      this.subscription();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

const router = { Link: withState(Link) };

export const withRouter = WrappedComponent => props => (
  <WrappedComponent {...props} router={router} />
);

class Router extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getComponent() {
    const { component } = this.props.routes.find(
      ({ path, component }) => path === document.location.pathname,
    );
    return component;
  }

  render() {
    const RoutedComponent = this.getComponent();
    return <RoutedComponent />;
  }
}

export default withState(Router);
