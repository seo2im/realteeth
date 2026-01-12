/* eslint-disable react-hooks/refs */
import { useCallback, useRef } from 'react';

export function createDebouncedClickHandler<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * useDebounce Hook - 컴포넌트 내에서 debounce된 콜백을 생성
 * dependency를 자동으로 추적하여 최신 값으로 실행됩니다.
 *
 * @example
 * const debouncedClick = useDebounce(() => {
 *   onClick(address); // address가 변경되어도 자동으로 최신 값 사용
 * }, 300);
 *
 * <div onClick={debouncedClick}>...</div>
 */
export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // 항상 최신 callback을 참조
  callbackRef.current = callback;

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay] // callback은 dependency에서 제외 (ref로 최신 값 참조)
  );
}
