import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import App from './router';

const routes = [
  { path: '/', component: Home },
  { path: '/page-one', component: PageOne },
  { path: '/page-two', component: PageTwo },
];

ReactDOM.render(<App routes={routes} />, document.getElementById('root'));
