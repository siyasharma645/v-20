import type { Config } from 'tailwindcss';

/**
 * DESIGN TOKENS: Danika red-and-white brand system.
 * Source values live as CSS variables in src/app/globals.css (:root) and are referenced here with
 * the `<alpha-value>` format so opacity utilities (bg-brand-700/80) keep working.
 *
 *   brand-700  #920009  primary brand red (header, hero, key bands, headings on light backgrounds)
 *   brand-800  #6F0007  deep burgundy (footer, top bar, hover/pressed states)
 *   brand-500  #B5121B  secondary red (accents, lighter dividers on red)
 *   brand-50   #FCEEEF  soft red/blush section background
 *   line       #E8C9CC  subtle border
 *   ink        #292323  charcoal (text and image overlays only)
 * Yellow is NOT a UI colour: it survives only inside the logo artwork.
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('c-offwhite'),
        white: v('c-white'),
        line: v('c-line'),
        ink: { DEFAULT: v('c-charcoal'), soft: v('c-charcoal-soft') },
        brand: {
          50: v('c-brand-50'), 100: v('c-brand-100'), 200: v('c-brand-200'),
          500: v('c-brand-500'), 600: v('c-brand-600'), 700: v('c-brand-700'),
          800: v('c-brand-800'), 900: v('c-brand-900'), 950: v('c-brand-950'),
        },
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      // ONE radius for the whole site: --ui-radius (10px, defined in globals.css). btn / field / card / ui are aliases of it,
      // so buttons, inputs, cards, menus and widgets can never drift apart. Use `rounded-full` only for intentionally circular icons.
      borderRadius: { ui: 'var(--ui-radius)', btn: 'var(--ui-radius)', field: 'var(--ui-radius)', card: 'var(--ui-radius)' },
      boxShadow: {
        card: '0 1px 2px rgba(111,0,7,.05), 0 8px 24px -12px rgba(111,0,7,.16)',
        lift: '0 2px 4px rgba(111,0,7,.08), 0 18px 40px -14px rgba(111,0,7,.32)',
      },
      keyframes: {
        'fade-down': { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'fade-down': 'fade-down .18s ease-out' },
    },
  },
  plugins: [],
};
export default config;
