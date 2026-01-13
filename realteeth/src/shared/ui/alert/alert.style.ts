import type { AlertType, AlertVariant } from './alert.type';

const sizeClasses: Record<string, { container: string; head: string }> = {
  sm: {
    container: 'text-sm leading-5',
    head: 'text-base leading-6',
  },
  md: {
    container: 'text-base leading-6',
    head: 'text-lg leading-7',
  },
  lg: {
    container: 'text-lg leading-7',
    head: 'text-xl leading-8',
  },
};

const filledVariantClasses: Record<AlertType, string> = {
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
};

const outlinedVariantClasses: Record<AlertType, string> = {
  info: 'bg-transparent border border-blue-500 text-blue-500',
  success: 'bg-transparent border border-green-500 text-green-500',
  warning: 'bg-transparent border border-yellow-500 text-yellow-500',
  danger: 'bg-transparent border border-red-500 text-red-500',
};

export function getAlertClasses(
  type: AlertType,
  size: string,
  variant: AlertVariant,
  hasHead: boolean
): string {
  const variantClass =
    variant === 'outlined' ? outlinedVariantClasses[type] : filledVariantClasses[type];
  const fontWeight = hasHead ? '' : 'font-bold';
  const sizeClass = sizeClasses[size]?.container || sizeClasses.md.container;

  return `rounded px-4 py-3 ${variantClass} ${sizeClass} ${fontWeight}`.trim();
}

export function getAlertHeadClasses(type: AlertType, size: string, variant: AlertVariant): string {
  const variantClass =
    variant === 'outlined' ? outlinedVariantClasses[type] : filledVariantClasses[type];
  const sizeClass = sizeClasses[size]?.head || sizeClasses.md.head;

  return `font-bold mb-1 ${variantClass} ${sizeClass}`.trim();
}
