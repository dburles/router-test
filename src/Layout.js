import React from 'react';
import { withRouter } from './router';

function Layout({ router: { Link }, children }) {
  return (
    <div>
      <ul>
        <li><Link href="/page-one">Page One</Link></li>
        <li><Link href="/page-two">Page Two</Link></li>
      </ul>
      {children}
    </div>
  );
}

export default withRouter(Layout);
