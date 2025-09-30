import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';

interface Props {
  endAdornment?: React.ReactNode;
  contentClassName?: string;
  className?: string;
  title?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  contentClassName,
  endAdornment,
  className,
  children,
  title,
}) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn('px-5 py-4', contentClassName)}>{children}</div>
    </div>
  );
};
