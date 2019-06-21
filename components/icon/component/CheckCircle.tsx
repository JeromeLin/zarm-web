import React from 'react';

const SvgCheckCircle = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 37 37"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <g strokeWidth={2.6} fill="none" fillRule="evenodd">
      <path
        d="M35 18.5C35 27.613 27.613 35 18.5 35S2 27.613 2 18.5 9.387 2 18.5 2 35 9.387 35 18.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.1 18.389l4.423 4.58 10.372-10.013" />
    </g>
  </svg>
);

export default SvgCheckCircle;
