import React, { useCallback, useRef, useState } from 'react';
import Portal from '../portal/portal';
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

  const handleMenuRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && visible) {
        menuRef.current = node;

        const menuRect = node.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let adjustedX = position.x;
        let adjustedY = position.y;

        // 오른쪽 화면 밖으로 나가는 경우
        if (adjustedX + menuRect.width > viewportWidth) {
          adjustedX = viewportWidth - menuRect.width - 10;
        }

        // 왼쪽 화면 밖으로 나가는 경우
        if (adjustedX < 10) {
          adjustedX = 10;
        }

        // 아래쪽 화면 밖으로 나가는 경우
        if (adjustedY + menuRect.height > viewportHeight) {
          adjustedY = viewportHeight - menuRect.height - 10;
        }

        // 위쪽 화면 밖으로 나가는 경우
        if (adjustedY < 10) {
          adjustedY = 10;
        }

        setMenuPosition({ x: adjustedX, y: adjustedY });
      }
    },
    [position.x, position.y, visible]
  );

  if (!visible) return null;

  return (
    <Portal>
      <div onClick={onClose} className="absolute inset-0 z-1000 w-full h-full">
        <div
          ref={handleMenuRef}
          onClick={(e) => e.stopPropagation()}
          className="fixed z-1000 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] rounded-lg"
          style={{
            top: menuPosition.y,
            left: menuPosition.x,
          }}
        >
          {children.map((child, index) => (
            <>
              {dividerIndex && dividerIndex.includes(index) && (
                <div className="h-px bg-black/10 my-1" />
              )}
              <ContextMenuItem key={index}>{child}</ContextMenuItem>
            </>
          ))}
        </div>
      </div>
    </Portal>
  );
}
