import React, { useCallback, useId, useMemo, useState } from 'react';
import type { InputState } from './input.type';

type InputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  withSearchIcon?: boolean;
  withSearchButton?: boolean;
  onSearchClick?: () => void;
  searchButtonLabel?: string;
  ref?: React.Ref<HTMLInputElement>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>;

export function Input({
  id,
  placeholder = '',
  value,
  onChange,
  disabled,
  error,
  className = '',
  withSearchIcon = true,
  withSearchButton = false,
  onSearchClick,
  searchButtonLabel = '검색',
  ...inputProps
}: InputProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const [hoverState, setHoverState] = useState<'hover' | 'default' | 'focused'>('default');

  const state: InputState = useMemo(() => {
    if (disabled) return 'disabled';
    if (error) return 'error';
    return hoverState;
  }, [disabled, error, hoverState]);

  // Tailwind 클래스 생성
  const inputClasses = useMemo(() => {
    const baseClasses = 'w-full box-border outline-none transition-colors flex-1 min-w-0';
    const sizeClasses = 'text-base leading-6 px-4 py-3';
    const variantClasses = withSearchButton
      ? 'border-2 border-r-0 border-white/30 rounded-l-lg rounded-r-none text-white bg-white/10 font-bold'
      : 'border-2 border-white/30 rounded-lg text-white bg-white/10 font-bold';

    // State 클래스
    let stateClasses = '';
    switch (state) {
      case 'disabled':
        stateClasses = 'bg-gray-200 cursor-not-allowed text-gray-400 border-gray-300';
        break;
      case 'hover':
        stateClasses = 'border-white/50';
        break;
      case 'focused':
        stateClasses = 'border-white';
        break;
      case 'error':
        stateClasses = 'border-red-500 bg-red-50 text-red-700';
        break;
      default:
        break;
    }

    const iconPadding = withSearchIcon ? 'pl-10' : '';
    const buttonPadding = withSearchButton ? 'pr-4' : '';
    return `${baseClasses} ${sizeClasses} ${variantClasses} ${stateClasses} ${iconPadding} ${buttonPadding} ${className}`.trim();
  }, [state, withSearchIcon, withSearchButton, className]);

  const onMouseEnter = useCallback(() => {
    if (!disabled && !error) {
      setHoverState('hover');
    }
  }, [disabled, error]);

  const onMouseLeave = useCallback(() => {
    if (!disabled && !error) {
      setHoverState('default');
    }
  }, [disabled, error]);

  const onFocus = useCallback(() => {
    if (!disabled) {
      setHoverState('focused');
    }
  }, [disabled]);

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (inputProps.onBlur) {
        inputProps.onBlur(e);
      }
      if (!disabled) {
        setHoverState('default');
      }
    },
    [disabled, inputProps]
  );

  return (
    <div className="relative w-full flex items-stretch">
      {withSearchIcon && (
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      )}
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        {...inputProps}
      />
      {withSearchButton && (
        <button
          type="button"
          className="flex items-center justify-center rounded-r-lg rounded-l-none border-2 border-l-0 border-white/30 bg-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/25 active:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={onSearchClick}
          disabled={disabled}
        >
          {searchButtonLabel}
        </button>
      )}
    </div>
  );
}
