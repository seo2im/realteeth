import type { SnackbarAnimation, SnackbarPostion } from './snackbar.type';

/**
 * Snackbar 기본 클래스를 반환합니다
 */
export function getSnackbarClasses(): string {
  return 'fixed text-white shadow-lg max-w-xs md:max-w-sm lg:max-w-md z-[1000]';
}

/**
 * Snackbar 위치 클래스를 반환합니다
 */
export function getPositionClasses(position: SnackbarPostion): string {
  const baseClasses = ' ';
  switch (position) {
    case 'top':
      return `${baseClasses} top-5 left-1/2 -translate-x-1/2`;
    case 'bottom':
      return `${baseClasses} bottom-5 left-1/2 -translate-x-1/2`;
    case 'top-left':
      return `${baseClasses} top-5 left-5`;
    case 'top-right':
      return `${baseClasses} top-5 right-5`;
    case 'bottom-left':
      return `${baseClasses} bottom-5 left-5`;
    case 'bottom-right':
      return `${baseClasses} bottom-5 right-5`;
    default:
      return `${baseClasses} bottom-5 left-1/2 -translate-x-1/2`;
  }
}

/**
 * Drag 스타일을 반환합니다
 */
export function getSnackbarDragClasses(
  position: SnackbarPostion,
  dragOffset: { x: number; y: number },
  isDragging: boolean
): React.CSSProperties {
  const needsCenterTransform = position === 'top' || position === 'bottom';
  return {
    transform: needsCenterTransform
      ? `translate(calc(-50% + ${dragOffset.x}px), ${dragOffset.y}px)`
      : `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
  };
}

export const snackbarAnimationKeyframes: Record<SnackbarAnimation, string> = {
  fade: `
    @keyframes snackbar-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes snackbar-fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,
  slide: `
    @keyframes snackbar-slide-in-top-center {
      from {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
    @keyframes snackbar-slide-out-top-center {
      from {
        transform: translate(-50%, 0);
        opacity: 1;
      }
      to {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
    }
    @keyframes snackbar-slide-in-bottom-center {
      from {
        transform: translate(-50%, 100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
    @keyframes snackbar-slide-out-bottom-center {
      from {
        transform: translate(-50%, 0);
        opacity: 1;
      }
      to {
        transform: translate(-50%, 100%);
        opacity: 0;
      }
    }
    @keyframes snackbar-slide-in-top {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes snackbar-slide-out-top {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
    @keyframes snackbar-slide-in-bottom {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes snackbar-slide-out-bottom {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100%);
        opacity: 0;
      }
    }
    @keyframes snackbar-slide-in-left {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes snackbar-slide-out-left {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(-100%);
        opacity: 0;
      }
    }
    @keyframes snackbar-slide-in-right {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes snackbar-slide-out-right {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `,
  grow: `
    @keyframes snackbar-grow-in {
      from {
        transform: scale(0.8);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes snackbar-grow-out {
      from {
        transform: scale(1);
        opacity: 1;
      }
      to {
        transform: scale(0.8);
        opacity: 0;
      }
    }
    @keyframes snackbar-grow-in-center {
      from {
        transform: translate(-50%, 0) scale(0.8);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0) scale(1);
        opacity: 1;
      }
    }
    @keyframes snackbar-grow-out-center {
      from {
        transform: translate(-50%, 0) scale(1);
        opacity: 1;
      }
      to {
        transform: translate(-50%, 0) scale(0.8);
        opacity: 0;
      }
    }
  `,
};

export function getAnimationStyle(animation: SnackbarAnimation, position: SnackbarPostion): string {
  if (animation === 'fade') {
    return 'animate-[snackbar-fade-in_0.3s_ease-out]';
  }

  if (animation === 'slide') {
    if (position === 'top') {
      return 'animate-[snackbar-slide-in-top-center_0.3s_ease-out]';
    }
    if (position === 'bottom') {
      return 'animate-[snackbar-slide-in-bottom-center_0.3s_ease-out]';
    }
    if (position === 'top-left' || position === 'top-right') {
      return 'animate-[snackbar-slide-in-top_0.3s_ease-out]';
    }
    if (position === 'bottom-left' || position === 'bottom-right') {
      return 'animate-[snackbar-slide-in-bottom_0.3s_ease-out]';
    }
  }

  if (animation === 'grow') {
    if (position === 'top' || position === 'bottom') {
      return 'animate-[snackbar-grow-in-center_0.3s_ease-out]';
    }
    return 'animate-[snackbar-grow-in_0.3s_ease-out]';
  }

  return '';
}

export function getExitAnimationStyle(
  animation: SnackbarAnimation,
  position: SnackbarPostion
): string {
  if (animation === 'fade') {
    return 'animate-[snackbar-fade-out_0.3s_ease-out]';
  }

  if (animation === 'slide') {
    if (position === 'top') {
      return 'animate-[snackbar-slide-out-top-center_0.3s_ease-out]';
    }
    if (position === 'bottom') {
      return 'animate-[snackbar-slide-out-bottom-center_0.3s_ease-out]';
    }
    if (position === 'top-left' || position === 'top-right') {
      return 'animate-[snackbar-slide-out-top_0.3s_ease-out]';
    }
    if (position === 'bottom-left' || position === 'bottom-right') {
      return 'animate-[snackbar-slide-out-bottom_0.3s_ease-out]';
    }
  }

  if (animation === 'grow') {
    if (position === 'top' || position === 'bottom') {
      return 'animate-[snackbar-grow-out-center_0.3s_ease-out]';
    }
    return 'animate-[snackbar-grow-out_0.3s_ease-out]';
  }

  return '';
}
