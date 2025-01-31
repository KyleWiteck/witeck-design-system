import NoConnection from '../../../assets/img/no_connection.png';
import NoData from '../../../assets/img/no_data.png';
import NoRecords from '../../../assets/img/no_records.png';
import NoUser from '../../../assets/img/no_user.png';
import { ErrorBase, ErrorBaseProps } from './Base';

export interface ErrorComponentProps extends Omit<ErrorBaseProps, 'image' | 'headline'> {
  headline?: string;
}

export function NotFoundUI(props: ErrorComponentProps) {
  const { headline = 'No Data Found', message = 'We couldn’t find the data in our records.', ...otherProps } = props;
  return <ErrorBase headline={headline} message={message} image={{ src: NoRecords, alt: headline }} {...otherProps} />;
}

export function ForbiddenUI(props: ErrorComponentProps) {
  const {
    headline = 'Forbidden Access',
    message = 'You are forbidden from accessing this resource.',
    ...otherProps
  } = props;
  return (
    <ErrorBase headline={headline} message={message} image={{ src: NoConnection, alt: headline }} {...otherProps} />
  );
}

export function NotAuthenticatedUI(props: ErrorComponentProps) {
  const {
    headline = 'Authentication Required',
    message = 'You must be logged in to access this resource. Please login to continue.',
    ...otherProps
  } = props;
  return <ErrorBase headline={headline} message={message} image={{ src: NoUser, alt: headline }} {...otherProps} />;
}

export function UnknownErrorUI(props: ErrorComponentProps) {
  const {
    headline = 'Oops, an unexpected error occurred.',
    message = 'We apologize for the inconvenience. Please try again later. If the issue persists, contact support.',
    ...otherProps
  } = props;

  return (
    <ErrorBase headline={headline} message={message} image={{ src: NoData, alt: 'Unknown error' }} {...otherProps} />
  );
}
