import React, { useEffect, useMemo } from 'react';
import { Portal } from '@shared/ui/portal/portal';
import { modalAnimationKeyframes } from './modal.style';
import type {
  ModalAnimationTypes,
  ModalCloseButtonPositions,
  ModalPositions,
  ModalSizes,
  ModalVariants,
} from './modal.type';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const overlayPositionClass: Record<ModalPositions, string> = {
  center: 'items-center justify-center',
  top: 'items-start justify-center pt-20',
  bottom: 'items-end justify-center pb-8',
};

const sizeClass: Record<ModalSizes, string> = {
  sm: 'w-80 max-w-[90vw]',
  md: 'w-[28rem] max-w-[90vw]',
  lg: 'w-[40rem] max-w-[90vw]',
  xl: 'w-[56rem] max-w-[90vw]',
};

const variantClass: Record<ModalVariants, string> = {
  default: '',
  fullscreen: 'w-screen h-screen max-w-screen max-h-screen rounded-none',
};

const animationClass: Record<ModalAnimationTypes, string> = {
  fade: 'animate-[modal-fade-in_0.2s_ease-out]',
  slide: 'animate-[modal-slide-in_0.3s_ease-out]',
  zoom: 'animate-[modal-zoom-in_0.2s_ease-out]',
};

const closeButtonPositionClass: Record<Exclude<ModalCloseButtonPositions, 'none'>, string> = {
  'top-right': 'top-3 right-3',
  'top-left': 'top-3 left-3',
  'bottom-right': 'bottom-3 right-3',
  'bottom-left': 'bottom-3 left-3',
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: ModalVariants;
  size?: ModalSizes;
  position?: ModalPositions;
  animationType?: ModalAnimationTypes;
  closeOnEsc?: boolean;
  closeButtonPosition?: ModalCloseButtonPositions;
};

export function Modal({
  isOpen,
  onClose,
  children,
  variant = 'default',
  size = 'md',
  position = 'center',
  animationType = 'fade',
  closeOnEsc = true,
  closeButtonPosition = 'none',
}: ModalProps) {
  const overlayClass = useMemo(
    () => cx('fixed inset-0 bg-black/50 flex z-[1000]', overlayPositionClass[position]),
    [position]
  );

  const containerClass = useMemo(
    () =>
      cx(
        'relative bg-white p-6 rounded-lg shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]',
        sizeClass[size],
        variantClass[variant],
        animationClass[animationType]
      ),
    [size, variant, animationType]
  );

  const closeButtonClass = useMemo(() => {
    if (closeButtonPosition === 'none') return '';
    return cx(
      'absolute w-8 h-8 rounded text-2xl text-gray-500 flex items-center justify-center transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none',
      closeButtonPositionClass[closeButtonPosition]
    );
  }, [closeButtonPosition]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <style>{modalAnimationKeyframes[animationType]}</style>
      <div className={overlayClass} onClick={onClose}>
        <div className={containerClass} onClick={(e) => e.stopPropagation()}>
          {closeButtonPosition !== 'none' && (
            <button className={closeButtonClass} onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
}
