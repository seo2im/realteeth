import type { SpinnerSize, SpinnerVariants } from './spinner.type';

const sizeClasses: Record<Exclude<SpinnerSize, number>, string> = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-[5px]',
  lg: 'w-16 h-16 border-[8px]',
};

export type SpinnerProps = {
  size?: SpinnerSize;
  variant?: SpinnerVariants;
  color?: string;
};

export function Spinner({ size = 'md', color = 'white', variant = 'default' }: SpinnerProps) {
  const sizeClass = typeof size === 'number' ? '' : sizeClasses[size];
  const isInverted = variant === 'inverted';

  const dynamicSize =
    typeof size === 'number'
      ? {
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${size / 8}px`,
        }
      : undefined;

  return (
    <div
      className={`rounded-full border-transparent ${sizeClass || 'w-10 h-10 border-[5px]'} animate-spin ${isInverted ? '[animation-direction:reverse]' : ''}`}
      style={{
        ...dynamicSize,
        borderTopColor: color,
        borderLeftColor: color,
        borderRightColor: color,
      }}
    />
  );
}
