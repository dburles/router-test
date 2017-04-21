import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parser from 'route-parser';
import Link from './components/Link';
import NotFound from './components/NotFound';

let routes = [];
let notFoundComponent = NotFound;
let mapRouterProps = router => ({ router });

const subscriptions = [];

const subscribe = fn => {
  subscriptions.push(fn);
  return () => subscriptions.splice(subscriptions.indexOf(fn), 1);
};

const notify = () => subscriptions.forEach(fn => fn());

window.onpopstate = () => notify();

const getRoute = () => routes.find(({ path }) => path.match(location.pathname));

const getComponent = () => {
  const route = getRoute();
  return route ? route.component : notFoundComponent;
};

const browserHistory = {
  pushState(...args) {
    history.pushState(...args);
    notify();
  },
};

const handleLink = href => event => {
  event.preventDefault();
  browserHistory.pushState({}, null, href);
};

const getRouteParams = () => {
  const route = getRoute();
  return route ? route.path.match(location.pathname) : {};
};

class Renderer extends Component {
  subscription = subscribe(() => this.setState({}));

  componentDidUpdate() {
    const route = getRoute();
    if (route && route.redirect) {
      route.redirect(getRouteParams());
    }
  }

  componentWillUnmount() {
    this.subscription();
  }

  render() {
    const route = getRoute();
    if (route && route.redirect) {
      return null;
    }
    return React.createElement(getComponent(), this.props);
  }
}

const Router = props => {
  routes = props.routes.map(({ path, component, redirect }) => ({
    path: new Parser(path),
    component,
    redirect,
  }));

  if (props.notFoundComponent) {
    notFoundComponent = props.notFoundComponent;
  }

  if (props.mapRouterProps) {
    mapRouterProps = props.mapRouterProps;
  }

  return React.createElement(Renderer);
};

Router.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      component: PropTypes.func,
      redirect: PropTypes.func,
    }),
  ).isRequired,
  notFoundComponent: PropTypes.func,
  mapRouterProps: PropTypes.func,
};

const withRouter = WrappedComponent => class extends Component {
  subscription = subscribe(() => this.setState({}));

  componentWillUnmount() {
    this.subscription();
  }

  render() {
    return React.createElement(WrappedComponent, {
      ...this.props,
      ...mapRouterProps({
        Link,
        params: getRouteParams(),
        location: window.location,
      }),
    });
  }
};

export default Router;
export { withRouter, handleLink, browserHistory };
