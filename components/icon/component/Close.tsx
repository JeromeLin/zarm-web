import React from 'react';

const SvgClose = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 26 26"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <g strokeWidth={2.6} fill="none" fillRule="evenodd">
      <path d="M1 1l23.884 23.884M24.884 1L1 24.884" />
    </g>
  </svg>
);

export default SvgClose;
