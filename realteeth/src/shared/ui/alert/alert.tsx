import React, { useMemo } from 'react';
import type { AlertSize, AlertType, AlertVariant } from './alert.type';
import { getAlertClasses, getAlertHeadClasses } from './alert.style';

type AlertProps = {
  head?: string;
  message: React.ReactNode;
  type?: AlertType;
  size?: AlertSize;
  variant?: AlertVariant;
};
export function Alert({
  head,
  message,
  type = 'info',
  size = 'md',
  variant = 'filled',
}: AlertProps) {
  const alertClasses = useMemo(() => {
    return getAlertClasses(type, size, variant, !!head);
  }, [type, size, variant, head]);

  const headClasses = useMemo(() => {
    return getAlertHeadClasses(type, size, variant);
  }, [type, size, variant]);

  return (
    <div className={alertClasses}>
      {head && <div className={headClasses}>{head}</div>}
      {typeof message === 'string' ? <div>{message}</div> : message}
    </div>
  );
}
