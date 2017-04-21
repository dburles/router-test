import React from 'react';
import ReactDOM from 'react-dom';
import { nest } from 'recompose';
import queryString from 'query-string';
import Router, { browserHistory } from './router';
import Layout from './containers/Layout';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PageOne from './containers/PageOne';
import PageTwo from './components/PageTwo';
import QueryStringTest from './containers/QueryStringTest';

const routes = [
  { path: '/', component: Home },
  { path: '/page-one', component: PageOne },
  { path: '/page-one/:one', component: PageOne },
  { path: '/page-one/:one/:two', component: PageOne },
  { path: '/page-two', component: PageTwo },
  { path: '/query-string-test', component: QueryStringTest },
  {
    path: '/redirect-to-page-one/:one',
    redirect: ({ one }) =>
      browserHistory.pushState({}, null, `/page-one/${one}`),
  },
];

// Let's just apply the layout to every component
const RouterWithLayout = nest(Layout, Router);

const mapRouterProps = router => ({
  router: {
    ...router,
    query: queryString.parse(location.search),
  },
});

ReactDOM.render(
  <RouterWithLayout
    routes={routes}
    notFoundComponent={NotFound}
    mapRouterProps={mapRouterProps}
  />,
  document.getElementById('root'),
);
