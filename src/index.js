import React from 'react';
import ReactDOM from 'react-dom';
import { nest } from 'recompose';
import Router from './router';
import Layout from './containers/Layout';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PageOne from './containers/PageOne';
import PageTwo from './components/PageTwo';

const routes = [
  { path: '/', component: Home },
  { path: '/page-one', component: PageOne },
  { path: '/page-one/:one/:two', component: PageOne },
  { path: '/page-two', component: PageTwo },
];

// Let's just apply the layout to every component
const RouterWithLayout = nest(Layout, Router);

ReactDOM.render(
  <RouterWithLayout routes={routes} notFoundComponent={NotFound} />,
  document.getElementById('root'),
);
