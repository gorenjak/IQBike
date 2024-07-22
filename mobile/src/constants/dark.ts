import {
  ITheme,
  ThemeColors,
  ThemeGradients,
  ThemeSizes,
  ThemeSpacing,
} from './types';

import { THEME as commonTheme } from './theme';

export const COLORS: ThemeColors = {
  // default text color
  text: '#b6b6b6',

  // base colors
  /** UI color for #primary */
  primary: '#717171',
  /** UI color for #secondary */
  secondary: '#FFFFFF',
  /** UI color for #tertiary */
  tertiary: '#717171',

  // non-colors
  black: '#b6b6b6',
  white: '#282828',

  //icon-colors
  blackIcon: '#e7e7e7',
  whiteIcon: '#121212',

  dark: '#282828',
  light: '#FFFFFF',

  // gray variations
  /** UI color for #gray */
  gray: '#8b8b8b',

  // colors variations
  /** UI color for #danger */
  danger: '#EA0606',
  /** UI color for #warning */
  warning: '#FFC107',
  /** UI color for #success */
  success: '#82D616',
  /** UI color for #info */
  info: '#17C1E8',

  /** UI colors for navigation & card */
  card: '#3f3f3f',
  background: '#282828',

  /** UI color for shadowColor */
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.3)',

  /** UI color for input borderColor on focus */
  focus: '#717171',
  input: '#e4e4e4',

  /** UI color for switch checked/active color */
  switchOn: '#282828',
  switchOff: '#E9ECEF',

  /** UI color for checkbox icon checked/active color */
  checkbox: ['#3f3f3f', '#282828'],
  checkboxIcon: '#FFFFFF',

  /** social colors */
  facebook: '#3B5998',
  twitter: '#55ACEE',
  dribbble: '#EA4C89',

  /** icon tint color */
  icon: '#b6b6b6',

  /** blur tint color */
  blurTint: 'dark',

  /** product link color */
  link: '#447352',
};

export const GRADIENTS: ThemeGradients = {
  primary: ['#C9EFC7', '#C9EFC7'],
  secondary: ['#b6b6b6', '#b6b6b6'],
  info: ['#21D4FD', '#2152FF'],
  success: ['#98EC2D', '#17AD37'],
  warning: ['#FBCF33', '#F53939'],
  danger: ['#FF667C', '#EA0606'],

  light: ['#121212', '#121212'],
  dark: ['#8b8b8b', '#8b8b8b'],

  white: [String(COLORS.white), '#282828'],
  black: [String(COLORS.black), '#b6b6b6'],

  divider: ['#A8A3A5', '#A8A3A5'],
  menu: ['#b6b6b6', '#b6b6b6', '#b6b6b6'],
};

export const SIZES: ThemeSizes = {
  // global sizes
  base: 8,
  text: 14,
  radius: 4,
  padding: 20,
  paddingTop: 110,
  paddingBottom: 300,

  // font sizes
  h1: 44,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 18,
  p: 16,

  // button sizes
  buttonBorder: 1,
  buttonRadius: 8,
  socialSize: 64,
  socialRadius: 16,
  socialIconSize: 26,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: 46,
  inputBorder: 1,
  inputRadius: 30,
  inputPadding: 12,

  // card sizes
  cardRadius: 16,
  cardPadding: 10,

  // image sizes
  imageRadius: 14,
  avatarSize: 32,
  avatarRadius: 8,

  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  // product link size
  linkSize: 12,

  /** font size multiplier: for maxFontSizeMultiplier prop */
  multiplier: 2,
};

export const SPACING: ThemeSpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7,
};

export const THEME: ITheme = {
  ...commonTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: { ...SIZES, ...commonTheme.sizes, ...SPACING },
};
