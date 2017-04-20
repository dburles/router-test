import React from 'react';
import ReactDOM from 'react-dom';
import { nest } from 'recompose';
import App, { route } from './router';
import Layout from './containers/Layout';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PageOne from './containers/PageOne';
import PageTwo from './components/PageTwo';

route(
  [
    { path: '/', component: Home },
    { path: '/page-one', component: PageOne },
    { path: '/page-one/:one/:two', component: PageOne },
    { path: '/page-two', component: PageTwo },
  ],
  NotFound,
);

// Let's just apply the layout to every component
const AppWithLayout = nest(Layout, App);

ReactDOM.render(<AppWithLayout />, document.getElementById('root'));
