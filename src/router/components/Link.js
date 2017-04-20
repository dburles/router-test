import React from 'react';
import { handleLink } from '../router';

export default function Link({ href, children }) {
  return (
    <a href={href} onClick={handleLink(href)}>
      {children}
    </a>
  );
}
