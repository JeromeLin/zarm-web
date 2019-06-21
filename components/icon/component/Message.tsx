import React from 'react';

const SvgMessage = props => (
  <svg
    viewBox="0 0 32 27"
    fill="currentColor"
    stroke="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <g stroke="currentColor" strokeWidth={2.6} fill="none" fillRule="evenodd">
      <path d="M27.917 24.846H4a2 2 0 0 1-1.999-2V4a2 2 0 0 1 2-2h23.917a2 2 0 0 1 2 2v18.846a2 2 0 0 1-2 2z" />
      <path d="M2 7.605l13.958 5.818 13.958-5.818" />
    </g>
  </svg>
);

export default SvgMessage;
