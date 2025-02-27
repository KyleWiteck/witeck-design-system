import { EmptyConnectionIcon, EmptyDataIcon, EmptyDoneIcon, EmptyRecordsIcon, EmptyUsersIcon } from '../../icons';
import { EmptyState, EmptyStateProps } from './Base';

export interface EmptyStateComponentProps extends Omit<EmptyStateProps, 'icon' | 'headline'> {
  headline?: string;
}

export function NotFoundUI(props: EmptyStateComponentProps) {
  const { headline = 'No Data Found', message = 'We couldn’t find the data in our records.', ...otherProps } = props;
  return <EmptyState headline={headline} message={message} icon={EmptyRecordsIcon} {...otherProps} />;
}

export function ForbiddenUI(props: EmptyStateComponentProps) {
  const {
    headline = 'Forbidden Access',
    message = 'You are forbidden from accessing this resource.',
    ...otherProps
  } = props;
  return <EmptyState headline={headline} message={message} icon={EmptyConnectionIcon} {...otherProps} />;
}

export function NotAuthenticatedUI(props: EmptyStateComponentProps) {
  const {
    headline = 'Authentication Required',
    message = 'You must be logged in to access this resource. Please login to continue.',
    ...otherProps
  } = props;
  return <EmptyState headline={headline} message={message} icon={EmptyUsersIcon} {...otherProps} />;
}

export function UnknownErrorUI(props: EmptyStateComponentProps) {
  const {
    headline = 'Oops, an unexpected error occurred',
    message = 'We apologize for the inconvenience. Please try again later. If the issue persists, contact support.',
    ...otherProps
  } = props;

  return <EmptyState headline={headline} message={message} icon={EmptyDataIcon} {...otherProps} />;
}

export function DoneUI(props: EmptyStateComponentProps) {
  const { headline = 'You’re all caught up', noActions = true, ...otherProps } = props;

  return <EmptyState headline={headline} icon={EmptyDoneIcon} noActions={noActions} {...otherProps} />;
}
