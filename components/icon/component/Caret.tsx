import React from 'react';

const SvgCaret = props => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 15 21"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <g stroke="none" fillRule="evenodd">
      <path d="M.278 6.535L5.998.667A1.472 1.472 0 0 1 8.095.656l5.848 5.872c.611.613.176 1.658-.69 1.658H.975c-.86 0-1.296-1.035-.696-1.651M.278 14.04l5.72 5.867c.572.59 1.518.594 2.098.011l5.848-5.871c.611-.614.176-1.659-.69-1.659H.975c-.86 0-1.296 1.035-.696 1.651" />
    </g>
  </svg>
);

export default SvgCaret;
