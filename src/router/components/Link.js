import React from 'react';
import { handleLink } from '../router';

export default function Link({
  href,
  children,
  active,
  activeClassName,
  ...props
}) {
  const activeClass = activeClassName || 'active';
  let className = props.className;

  if (active) {
    className = props.className
      ? `${props.className} ${activeClass}`
      : activeClass;
  }
  return (
    <a {...props} href={href} onClick={handleLink(href)} className={className}>
      {children}
    </a>
  );
}
