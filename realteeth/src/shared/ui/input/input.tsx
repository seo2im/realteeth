import React, { useCallback, useId, useMemo, useState } from 'react';
import type { InputSize, InputVariant, InputState } from './input.type';

type InputProps = {
  id?: string;
  variant?: InputVariant;
  value: string;
  onChange: (value: string) => void;
  size?: InputSize;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>;

export function Input({
  id,
  variant = 'box',
  size = 'md',
  placeholder = '',
  value,
  onChange,
  disabled,
  error,
  className = '',
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
    const baseClasses = 'w-full box-border outline-none transition-colors';

    // Size 클래스
    const sizeClasses = {
      sm: 'text-sm leading-5 px-3 py-2.5',
      md: 'text-base leading-6 px-4 py-3',
      lg: 'text-lg px-5 py-3.5',
    }[size];

    // Variant 클래스
    let variantClasses = '';
    switch (variant) {
      case 'underlined':
        variantClasses = 'border-0 border-b border-gray-300 rounded-none bg-white text-black';
        break;
      case 'gray':
        variantClasses = 'border-0 bg-gray-100 text-gray-500 rounded-lg';
        break;
      case 'box':
      default:
        variantClasses = 'border border-gray-300 rounded-lg bg-white text-black';
        break;
    }

    // State 클래스
    let stateClasses = '';
    switch (state) {
      case 'disabled':
        stateClasses = 'bg-gray-200 cursor-not-allowed text-gray-400 border-gray-300';
        break;
      case 'hover':
        stateClasses = 'border-blue-500';
        break;
      case 'focused':
        stateClasses = 'border-blue-500';
        break;
      case 'error':
        stateClasses = 'border-red-500 bg-red-50 text-red-700';
        break;
      default:
        break;
    }

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${stateClasses} ${className}`.trim();
  }, [variant, size, state, className]);

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
  );
}

export default Input;
