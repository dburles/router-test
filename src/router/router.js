import React, { Component } from 'react';
import parser from 'route-parser';
import Link from './components/Link';
import NotFound from './components/NotFound';

let routes = [];
let notFoundComponent = NotFound;

const subscriptions = [];

export function subscribe(fn) {
  subscriptions.push(fn);
  return function() {
    subscriptions.splice(subscriptions.indexOf(fn), 1);
  };
}

function notify() {
  subscriptions.forEach(fn => fn());
}

window.onpopstate = event => notify();

function getRoute() {
  return routes.find(({ path }) => path.match(document.location.pathname));
}

function getComponent() {
  const route = getRoute();
  return route ? route.component : notFoundComponent;
}

const handleLink = href => event => {
  event.preventDefault();
  history.pushState({}, null, href);
  notify();
};

function Router() {
  return React.createElement(getComponent());
}

function route(routeMap, component) {
  if (typeof component === 'function') {
    notFoundComponent = component;
  }
  routes = routeMap.map(({ path, component }) => ({
    path: new parser(path),
    component,
  }));
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

function getRouteParams() {
  const route = getRoute();
  return route ? route.path.match(document.location.pathname) : {};
}

function withRouter(WrappedComponent) {
  return class extends Component {
    subscription = subscribe(() => this.setState({}));

    componentWillUnmount() {
      this.subscription();
    }

    router() {
      return { Link: withState(Link), params: getRouteParams() };
    }

    render() {
      return <WrappedComponent {...this.props} router={this.router()} />;
    }
  };
}

export default withState(Router);
export { route, withRouter, handleLink };
