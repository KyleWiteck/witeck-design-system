export const partialDisclosureProps = [
  {
    name: 'isOpen',
    default: 'false',
    type: 'boolean',
    description: 'Determines if the disclosure is open or closed.'
  },
  {
    name: 'onOpen',
    default: 'undefined',
    type: '() => void',
    description: 'Callback function triggered when the disclosure is opened.'
  },
  {
    name: 'onClose',
    default: 'undefined',
    type: '() => void',
    description: 'Callback function triggered when the disclosure is closed.'
  },
  {
    name: 'onToggle',
    default: 'undefined',
    type: '() => void',
    description: 'Callback function triggered when the disclosure is toggled between open and closed states.'
  }
];
