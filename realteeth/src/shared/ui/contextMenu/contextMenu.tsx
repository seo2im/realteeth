import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { ContextMenuItem } from './contextMenuItem';

export type ContextMenuProps = {
  children: React.ReactNode[];
  position: { x: number; y: number };
  visible: boolean;
  onClose: () => void;
  dividerIndex?: number[];
};
export function ContextMenu({
  children,
  position,
  visible,
  onClose,
  dividerIndex = [],
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ x: position.x, y: position.y });

  useEffect(() => {
    if (!visible) return;

    function handleOutsideClick(event: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      onClose();
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [visible, onClose]);

  const handleMenuRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && visible) {
        menuRef.current = node;

        const menuRect = node.getBoundingClientRect();
        const parentElement = node.parentElement;
        if (!parentElement) return;

        const parentRect = parentElement.getBoundingClientRect();

        let adjustedX = position.x;
        let adjustedY = position.y;

        if (adjustedX + menuRect.width > parentRect.width) {
          adjustedX = parentRect.width - menuRect.width - 10;
        }

        if (adjustedX < 0) {
          adjustedX = 10;
        }

        if (adjustedY + menuRect.height > parentRect.height) {
          adjustedY = position.y - menuRect.height;
        }

        if (adjustedY < 0) {
          adjustedY = 10;
        }

        setMenuPosition({ x: adjustedX, y: adjustedY });
      }
    },
    [position.x, position.y, visible]
  );

  if (!visible) return null;

  return (
    <div onClick={onClose} className="absolute inset-0 z-10 w-full h-full">
      <div
        ref={handleMenuRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute z-20 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] rounded-lg w-40 md:w-48 "
        style={{
          top: menuPosition.y,
          left: menuPosition.x,
        }}
      >
        {children.map((child, index) => (
          <Fragment key={index}>
            {dividerIndex && dividerIndex.includes(index) && (
              <div className="h-px bg-black/10 my-1" />
            )}
            <ContextMenuItem>{child}</ContextMenuItem>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
