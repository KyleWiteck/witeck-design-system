import * as Components from '@KyleWiteck/witeck-design/components';
import * as Hooks from '@KyleWiteck/witeck-design/hooks';
import * as Icons from '@KyleWiteck/witeck-design/icons';
import * as Theme from '@KyleWiteck/witeck-design/theme';
import React from 'react';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...Components,
  ...Hooks,
  ...Theme,
  ...Icons
};

export default ReactLiveScope;
