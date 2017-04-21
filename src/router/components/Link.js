import React from 'react';
import { handleLink } from '../router';

export default function Link({ href, children, ...props }) {
  return (
    <a {...props} href={href} onClick={handleLink(href)}>
      {children}
    </a>
  );
}
