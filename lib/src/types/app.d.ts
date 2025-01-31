// declare module '*.svg' {
//   import * as React from 'react';

//   interface SvgProps extends React.SVGProps<SVGSVGElement> {
//     viewBox?: string;
//   }

//   const content: React.FunctionComponent<SvgProps> & {
//     viewBox?: string;
//   };

//   export const ReactComponent: React.FunctionComponent<SvgProps>;

//   export default content;
// }
declare module '*.svg' {
  import React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}
