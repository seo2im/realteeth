import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  getAnimationStyle,
  getExitAnimationStyle,
  snackbarAnimationKeyframes,
} from './snackbar.style';
import type { SnackbarAnimation } from './snackbar.type';

export type SnackbarProps = {
  message: ReactNode;
  duration?: number;
  onClose?: () => void;
  snackbarAnimation?: SnackbarAnimation;
};
export function Snackbar({
  message,
  duration = 3000,
  onClose,
  snackbarAnimation = 'slide',
}: SnackbarProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseClasses = useMemo(() => {
    const positionClasses = 'bottom-5 left-1/2';
    const snackbarClasses = 'fixed text-white shadow-lg max-w-xs md:max-w-sm lg:max-w-md z-[1000]';
    return `${snackbarClasses} ${positionClasses}`;
  }, []);

  const animationClasses = useMemo(() => {
    if (isClosing) {
      return getExitAnimationStyle(snackbarAnimation);
    } else if (isAnimating) {
      return getAnimationStyle(snackbarAnimation);
    }
    // 애니메이션이 없을 때만 Tailwind로 중앙 정렬
    return '-translate-x-1/2';
  }, [snackbarAnimation, isAnimating, isClosing]);

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
    if (!isClosing) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, handleClose, isClosing]);

  return (
    <>
      <style>{snackbarAnimationKeyframes[snackbarAnimation]}</style>
      <div className={`${baseClasses} ${animationClasses}`.trim()}>{message}</div>
    </>
  );
}
