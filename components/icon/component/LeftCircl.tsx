import React from 'react';

const SvgLeftCircl = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 36 36"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <g
      transform="rotate(-90 18 16)"

      strokeWidth={2.6}
      fill="none"
      fillRule="evenodd"
    >
      <circle cx={16} cy={16} r={16} />
      <path d="M10.088 18.912l5.976-6 5.848 6" />
    </g>
  </svg>
);

export default SvgLeftCircl;
