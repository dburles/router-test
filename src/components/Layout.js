import React from 'react';
import './Layout.css';

function Layout({ router: { Link, params, location }, children }) {
  return (
    <div>
      <h3>Router</h3>
      <pre>params: {JSON.stringify(params)}</pre>
      <ul>
        <li>
          <Link href="/" className={location.pathname === '/' && 'active'}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/page-one"
            className={location.pathname === '/page-one' && 'active'}
          >
            Page One
          </Link>
        </li>
        <li>
          <Link
            href="/page-one/a/b"
            className={
              new RegExp('/page-one/.*').test(location.pathname) && 'active'
            }
          >
            Page One (with params)
          </Link>
        </li>
        <li>
          <Link
            href="/page-two"
            className={location.pathname === '/page-two' && 'active'}
          >
            Page Two
          </Link>
        </li>
        <li>
          <Link
            href="/query-string-test?a=foo&b=2&c=bar"
            className={
              new RegExp('/query-string-test?.*').test(location.pathname) &&
                'active'
            }
          >
            Query String Test
          </Link>
        </li>
        <li>
          <Link href="/redirect-to-page-one/redirected">
            Redirect (with arguments)
          </Link>
        </li>
        <li><Link href="/askfjaslkj">404</Link></li>
      </ul>
      <hr />
      {children}
    </div>
  );
}

export default Layout;
