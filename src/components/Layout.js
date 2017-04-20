import React from 'react';

function Layout({ router: { Link, params }, children }) {
  return (
    <div>
      <h3>Router</h3>
      <pre>params: {JSON.stringify(params)}</pre>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/page-one">Page One</Link></li>
        <li><Link href="/page-one/a/b">Page One (With params)</Link></li>
        <li><Link href="/page-two">Page Two</Link></li>
        <li><Link href="/askfjaslkj">404</Link></li>
      </ul>
      <hr />
      {children}
    </div>
  );
}

export default Layout;
