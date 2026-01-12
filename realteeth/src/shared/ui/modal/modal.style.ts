import type { ModalAnimationTypes } from './modal.type';

export const modalAnimationKeyframes: Record<ModalAnimationTypes, string> = {
  fade: `
    @keyframes modal-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  slide: `
    @keyframes modal-slide-in {
      from {
        transform: translateY(-2rem);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  zoom: `
    @keyframes modal-zoom-in {
      from {
        transform: scale(0.95);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  `,
};
