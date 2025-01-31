import Close from '../../../assets/icons/Close.svg?react';
import ArrowDropDown from '../../../assets/icons/arrow-drop-down.svg?react';
import ArrowDropUp from '../../../assets/icons/arrow-drop-up.svg?react';
import ArrowRight from '../../../assets/icons/arrow-right.svg?react';
import Cancel from '../../../assets/icons/cancel.svg?react';
import CheckMark from '../../../assets/icons/check-mark.svg?react';
import CheckboxBlank from '../../../assets/icons/checkbox-blank.svg?react';
import CheckboxIndeterminate from '../../../assets/icons/checkbox-indeterminate.svg?react';
import Checkbox from '../../../assets/icons/checkbox.svg?react';
import ChevronDown from '../../../assets/icons/chevron-down.svg?react';
import ChevronUp from '../../../assets/icons/chevron-up.svg?react';
import DoubleForwardArrow from '../../../assets/icons/double-forward-arrow.svg?react';
import Drag from '../../../assets/icons/drag.svg?react';
import Error from '../../../assets/icons/error.svg?react';
import FirstPage from '../../../assets/icons/first-page.svg?react';
import Gear from '../../../assets/icons/gear.svg?react';
import History from '../../../assets/icons/history.svg?react';
import Home from '../../../assets/icons/home.svg?react';
import ImagePlaceholder from '../../../assets/icons/image-placeholder.svg?react';
import Info from '../../../assets/icons/info.svg?react';
import LastPage from '../../../assets/icons/last-page.svg?react';
import Logout from '../../../assets/icons/logout.svg?react';
import Mail from '../../../assets/icons/mail.svg?react';
import Menu from '../../../assets/icons/menu.svg?react';
import Notifications from '../../../assets/icons/notifications.svg?react';
import Plus from '../../../assets/icons/plus.svg?react';
import SearchPage from '../../../assets/icons/search-page.svg?react';
import Search from '../../../assets/icons/search.svg?react';
import CheckCircle from '../../../assets/icons/success.svg?react';
import User from '../../../assets/icons/user.svg?react';
import Warning from '../../../assets/icons/warning.svg?react';
import { Icon, createStyledIcon } from '../../icons/createStyledIcon';

// NOTE: When adding new SVG icons, please ensure that you remove the "width" and "height" attributes
// so that the system can set these automatically. Additionally, make sure to replace the main color
// with "currentColor" instead of using a hexadecimal value. This will enable the icon to inherit or
// pick up the color through the "color" prop.
const IconsObject = {
  Menu: createStyledIcon({ name: 'Menu', svg: Menu }),
  Plus: createStyledIcon({ name: 'Plus', svg: Plus }),
  Home: createStyledIcon({ name: 'Home', svg: Home }),
  ChevronUp: createStyledIcon({ name: 'ChevronUp', svg: ChevronUp }),
  ChevronDown: createStyledIcon({ name: 'ChevronDown', svg: ChevronDown }),
  ArrowRight: createStyledIcon({ name: 'ArrowRight', svg: ArrowRight }),
  Mail: createStyledIcon({ name: 'Mail', svg: Mail }),
  Gear: createStyledIcon({ name: 'Gear', svg: Gear }),
  History: createStyledIcon({ name: 'History', svg: History }),
  Drag: createStyledIcon({ name: 'Drag', svg: Drag }),
  Check: createStyledIcon({ name: 'Check', svg: Checkbox }),
  Indeterminate: createStyledIcon({ name: 'Indeterminate', svg: CheckboxIndeterminate }),
  ArrowDropDown: createStyledIcon({ name: 'ArrowDropDown', svg: ArrowDropDown }),
  ArrowDropUp: createStyledIcon({ name: 'ArrowDropUp', svg: ArrowDropUp }),
  Search: createStyledIcon({ name: 'Search', svg: Search }),
  Close: createStyledIcon({ name: 'Close', svg: Close }),
  Error: createStyledIcon({ name: 'Error', svg: Error }),
  Cancel: createStyledIcon({ name: 'Cancel', svg: Cancel }),
  Notifications: createStyledIcon({ name: 'Notifications', svg: Notifications }),
  User: createStyledIcon({ name: 'User', svg: User }),
  Logout: createStyledIcon({ name: 'Logout', svg: Logout }),
  Warning: createStyledIcon({ name: 'Warning', svg: Warning }),
  Info: createStyledIcon({ name: 'Info', svg: Info }),
  Success: createStyledIcon({ name: 'Success', svg: CheckCircle }),
  FirstPage: createStyledIcon({ name: 'FirstPage', svg: FirstPage }),
  LastPage: createStyledIcon({ name: 'LastPage', svg: LastPage }),
  CheckMark: createStyledIcon({ name: 'CheckMark', svg: CheckMark }),
  ImagePlaceholder: createStyledIcon({ name: 'ImagePlaceholder', svg: ImagePlaceholder }),
  DoubleForwardArrow: createStyledIcon({ name: 'DoubleForwardArrow', svg: DoubleForwardArrow }),
  SearchPage: createStyledIcon({ name: 'SearchPage', svg: SearchPage }),
  Checkbox: createStyledIcon({ name: 'CheckboxBlank', svg: Checkbox }),
  CheckboxBlank: createStyledIcon({ name: 'Checkbox', svg: CheckboxBlank }),
  CheckboxIndeterminate: createStyledIcon({
    name: 'CheckboxBlank',
    svg: CheckboxIndeterminate
  })
} satisfies Record<string, Icon>;

/**
 * @deprecated Use ESM Icons instead
 * */
export const Icons = { ...IconsObject } as const;

export interface IconsByNameProps {
  name: keyof typeof Icons;
}

/**
 * @deprecated Use ESM Icons instead
 * */
export const IconsByName = ({ name, ...props }: IconsByNameProps) => {
  const IconComponent = Icons[name];
  return <IconComponent {...props} />;
};
