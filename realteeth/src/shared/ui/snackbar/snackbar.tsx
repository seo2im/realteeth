import React, { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  getAnimationStyle,
  getExitAnimationStyle,
  snackbarAnimationKeyframes,
  getSnackbarClasses,
  getPositionClasses,
  getSnackbarDragClasses,
} from './snackbar.style';
import type { SnackbarAnimation, SnackbarPostion } from './snackbar.type';

export type SnackbarProps = {
  message: ReactNode;
  duration?: number;
  onClose?: () => void;
  snackbarPosition?: SnackbarPostion;
  snackbarAnimation?: SnackbarAnimation;
  dragable?: boolean;
};
export function Snackbar({
  message,
  duration = 3000,
  onClose,
  snackbarAnimation = 'slide',
  snackbarPosition = 'bottom',
  dragable = false,
}: SnackbarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const baseClasses = useMemo(() => {
    const positionClasses = getPositionClasses(snackbarPosition);
    const cursorClass = dragable ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : '';
    return `${getSnackbarClasses()}${positionClasses} ${cursorClass}`;
  }, [snackbarPosition, dragable, isDragging]);

  const animationClasses = useMemo(() => {
    if (!isDragging) {
      if (isClosing) {
        return getExitAnimationStyle(snackbarAnimation, snackbarPosition);
      } else if (isAnimating) {
        return getAnimationStyle(snackbarAnimation, snackbarPosition);
      }
    }
    return '';
  }, [snackbarAnimation, snackbarPosition, isDragging, isAnimating, isClosing]);

  const dragStyle = useMemo(() => {
    if (isDragging || dragOffset.x !== 0 || dragOffset.y !== 0) {
      return getSnackbarDragClasses(snackbarPosition, dragOffset, isDragging);
    }
    return {};
  }, [snackbarPosition, dragOffset, isDragging]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 250);
  }, [onClose]);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => clearTimeout(animationTimer);
  }, []);

  useEffect(() => {
    if (isClosing && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [isClosing]);

  useEffect(() => {
    if (!dragable && !isClosing) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, handleClose, isClosing, dragable]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!dragable || isAnimating || isClosing) return;

      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      };

      // 타이머 일시 중지
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    },
    [dragable, isAnimating, dragOffset, isClosing]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragable) return;

      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;

      setDragOffset({ x: newX, y: newY });
    },
    [isDragging, dragable]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !dragable || isClosing) return;

    setIsDragging(false);

    // 포지션에 따라 닫히는 방향 결정
    const isTopPosition =
      snackbarPosition === 'top' ||
      snackbarPosition === 'top-left' ||
      snackbarPosition === 'top-right';
    const isBottomPosition =
      snackbarPosition === 'bottom' ||
      snackbarPosition === 'bottom-left' ||
      snackbarPosition === 'bottom-right';

    let shouldClose = false;

    if (isTopPosition) {
      shouldClose = dragOffset.y < -30;
    } else if (isBottomPosition) {
      shouldClose = dragOffset.y > 30;
    }

    if (shouldClose) {
      handleClose();
    } else {
      // 원래 위치로 복귀
      setDragOffset({ x: 0, y: 0 });

      // 타이머 재시작
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          handleClose();
        }, duration);
      }
    }
  }, [isDragging, dragable, dragOffset, handleClose, duration, isClosing, snackbarPosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <style>{snackbarAnimationKeyframes[snackbarAnimation]}</style>
      <div
        className={`${baseClasses} ${animationClasses}`.trim()}
        style={dragStyle}
        onMouseDown={handleMouseDown}
      >
        {message}
      </div>
    </>
  );
}
