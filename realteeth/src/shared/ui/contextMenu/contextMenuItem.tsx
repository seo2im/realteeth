import React from 'react';

export type ContextMenuItemProps = {
  children: React.ReactNode;
};
export function ContextMenuItem({ children }: ContextMenuItemProps) {
  return (
    <div className="px-3 py-2 cursor-pointer whitespace-nowrap hover:bg-black/5">{children}</div>
  );
}
