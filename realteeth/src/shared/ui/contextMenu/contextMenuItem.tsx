import React from 'react';

export type ContextMenuItemProps = {
  children: React.ReactNode;
};
export function ContextMenuItem({ children }: ContextMenuItemProps) {
  return (
    <div className="px-5 py-3 cursor-pointer whitespace-nowrap hover:bg-black/5">{children}</div>
  );
}
