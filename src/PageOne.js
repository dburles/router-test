import React from 'react';
import Layout from './Layout';
import { withRouter } from './router';

function PageOne({ router: { Link } }) {
  return (
    <Layout>
      <h1>Page One</h1>
      <Link href="/page-two">Another link to page two!</Link>
    </Layout>
  );
}

export default withRouter(PageOne);
