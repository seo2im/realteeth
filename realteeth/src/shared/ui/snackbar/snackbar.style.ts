import type { SnackbarAnimation } from './snackbar.type';

// Only support 'bottom' position animations
export const snackbarAnimationKeyframes: Record<SnackbarAnimation, string> = {
  fade: `
    @keyframes snackbar-fade-in {
      from {
        transform: translateX(-50%);
        opacity: 0;
      }
      to {
        transform: translateX(-50%);
        opacity: 1;
      }
    }
    @keyframes snackbar-fade-out {
      from {
        transform: translateX(-50%);
        opacity: 1;
      }
      to {
        transform: translateX(-50%);
        opacity: 0;
      }
    }
  `,
  slide: `
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
  `,
  grow: `
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

export function getAnimationStyle(animation: SnackbarAnimation): string {
  if (animation === 'fade') {
    return 'animate-[snackbar-fade-in_0.3s_ease-out_forwards]';
  }

  if (animation === 'slide') {
    return 'animate-[snackbar-slide-in-bottom-center_0.3s_ease-out_forwards]';
  }

  if (animation === 'grow') {
    return 'animate-[snackbar-grow-in-center_0.3s_ease-out_forwards]';
  }

  return '';
}

export function getExitAnimationStyle(animation: SnackbarAnimation): string {
  if (animation === 'fade') {
    return 'animate-[snackbar-fade-out_0.3s_ease-out_forwards]';
  }

  if (animation === 'slide') {
    return 'animate-[snackbar-slide-out-bottom-center_0.3s_ease-out_forwards]';
  }

  if (animation === 'grow') {
    return 'animate-[snackbar-grow-out-center_0.3s_ease-out_forwards]';
  }

  return '';
}
