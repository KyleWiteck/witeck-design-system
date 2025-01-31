import * as Components from '@peopleticker/magnit-design/components';
import * as Hooks from '@peopleticker/magnit-design/hooks';
import * as Icons from '@peopleticker/magnit-design/icons';
import * as Theme from '@peopleticker/magnit-design/theme';
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
