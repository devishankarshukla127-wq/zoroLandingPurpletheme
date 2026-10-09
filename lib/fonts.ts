import localFont from 'next/font/local'

/*
 * Satoshi (Fontshare, free licence) served from /public/fonts.
 * Each role loads only the weights it should render, so a stray `font-bold`
 * cannot pull in a weight outside the Black / Medium / Regular set.
 */

export const displayFont = localFont({
  src: [{ path: '../public/fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' }],
  variable: '--font-display-face',
  display: 'swap',
})

export const bodyFont = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-body-face',
  display: 'swap',
})

export const labelFont = localFont({
  src: [{ path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' }],
  variable: '--font-label-face',
  display: 'swap',
})

export const fontVariables = [displayFont.variable, bodyFont.variable, labelFont.variable].join(' ')
