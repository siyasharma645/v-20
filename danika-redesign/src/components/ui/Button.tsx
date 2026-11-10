import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Button system (all variants share height, padding, 2px border and radius):
 *  - primary / brand : solid red, white text        -> use on white or blush surfaces
 *  - light           : solid white, red text        -> use on red, burgundy or photo surfaces
 *  - secondary       : white, red border, red text  -> second action on light surfaces
 *  - outline-light   : dark translucent, white border and text -> second action on red / photo surfaces
 */
type Variant = 'primary' | 'secondary' | 'light' | 'outline-light' | 'brand' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn border-2 font-bold leading-none whitespace-nowrap select-none transition duration-200 ease-out active:translate-y-px';
const variants: Record<Variant, string> = {
  primary: 'border-brand-700 bg-brand-700 text-white hover:border-brand-800 hover:bg-brand-800',
  brand: 'border-brand-700 bg-brand-700 text-white hover:border-brand-800 hover:bg-brand-800',
  light: 'border-white bg-white text-brand-700 hover:border-brand-50 hover:bg-brand-50',
  secondary: 'border-brand-700 bg-white text-brand-700 hover:bg-brand-50',
  'outline-light': 'border-white/80 bg-brand-950/40 text-white hover:border-white hover:bg-white hover:text-brand-700',
  ghost: 'border-transparent text-brand-700 hover:bg-brand-50',
};
const sizes: Record<Size, string> = {
  md: 'min-h-[48px] px-6 py-3 text-[0.95rem]',
  lg: 'min-h-[56px] px-8 py-4 text-base',
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/** Anchor styled as a button. All CTAs on this page are real links (tel:, #anchor or original-site URLs). */
export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: Props) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
