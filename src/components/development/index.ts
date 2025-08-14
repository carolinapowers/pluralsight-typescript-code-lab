import React from 'react';

// Only export in development
export const DevPanel = process.env.NODE_ENV === 'development' 
  ? () => React.createElement('div', null, 'Development Panel')
  : () => null;