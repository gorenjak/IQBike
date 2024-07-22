import {Dimensions, Platform} from 'react-native';
import {
  ICommonTheme,
  ThemeAssets,
  ThemeFonts,
  ThemeIcons,
  ThemeLineHeights,
  ThemeWeights,
} from './types';

const {width, height} = Dimensions.get('window');

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
  text: 'normal',
  h1: Platform.OS === 'ios' ? '700' : 'normal',
  h2: Platform.OS === 'ios' ? '700' : 'normal',
  h3: Platform.OS === 'ios' ? '700' : 'normal',
  h4: Platform.OS === 'ios' ? '700' : 'normal',
  h5: Platform.OS === 'ios' ? '600' : 'normal',
  p: 'normal',

  thin: Platform.OS === 'ios' ? '100' : 'normal',
  extralight: Platform.OS === 'ios' ? '200' : 'normal',
  light: Platform.OS === 'ios' ? '300' : 'normal',
  normal: Platform.OS === 'ios' ? '400' : 'normal',
  medium: Platform.OS === 'ios' ? '500' : 'normal',
  semibold: Platform.OS === 'ios' ? '600' : 'normal',
  bold: Platform.OS === 'ios' ? '700' : 'normal',
  extrabold: Platform.OS === 'ios' ? '800' : 'normal',
  black: Platform.OS === 'ios' ? '900' : 'normal',
};

export const ICONS: ThemeIcons = {
  apple: require('../assets/icons/apple.png'),
  google: require('../assets/icons/google.png'),
  facebook: require('../assets/icons/facebook.png'),
  arrow: require('../assets/icons/arrow.png'),
  articles: require('../assets/icons/articles.png'),
  basket: require('../assets/icons/basket.png'),
  bell: require('../assets/icons/bell.png'),
  calendar: require('../assets/icons/calendar.png'),
  chat: require('../assets/icons/chat.png'),
  check: require('../assets/icons/check.png'),
  clock: require('../assets/icons/clock.png'),
  close: require('../assets/icons/close.png'),
  components: require('../assets/icons/components.png'),
  document: require('../assets/icons/document.png'),
  documentation: require('../assets/icons/documentation.png'),
  extras: require('../assets/icons/extras.png'),
  flight: require('../assets/icons/flight.png'),
  gift: require('../assets/icons/gift.png'),
  home: require('../assets/icons/home.png'),
  hotel: require('../assets/icons/hotel.png'),
  image: require('../assets/icons/image.png'),
  location: require('../assets/icons/location.png'),
  logout: require('../assets/icons/logout.png'),
  mail: require('../assets/icons/mail.png'),
  menu: require('../assets/icons/menu.png'),
  more: require('../assets/icons/more.png'),
  notification: require('../assets/icons/notification.png'),
  office: require('../assets/icons/office.png'),
  payment: require('../assets/icons/payment.png'),
  profile: require('../assets/icons/profile.png'),
  register: require('../assets/icons/register.png'),
  rental: require('../assets/icons/rental.png'),
  search: require('../assets/icons/search.png'),
  settings: require('../assets/icons/settings.png'),
  star: require('../assets/icons/star.png'),
  train: require('../assets/icons/train.png'),
  user: require('../assets/icons/user.png'),
  users: require('../assets/icons/users.png'),
  warning: require('../assets/icons/warning.png'),
  icon: require('../assets/icons/favicon.png'),
};

export const ASSETS: ThemeAssets = {
  // fonts
  RalewayLight: require('../assets/fonts/Raleway-Light.ttf'),
  RalewayRegular: require('../assets/fonts/Raleway-Regular.ttf'),
  RalewaySemiBold: require('../assets/fonts/Raleway-SemiBold.ttf'),
  RalewayExtraBold: require('../assets/fonts/Raleway-ExtraBold.ttf'),
  RalewayBold: require('../assets/fonts/Raleway-Bold.ttf'),
  // backgrounds/logo
  logo: require('../assets/images/logo.png'),
  header: require('../assets/images/header.png'),
  background: require('../assets/images/background.png'),
  ios: require('../assets/images/ios.png'),
  android: require('../assets/images/android.png'),
  // avatars
  avatar: require('../assets/images/avatar.png'),
};

export const FONTS: ThemeFonts = {
  // based on font size
  text: 'Raleway-Regular',
  h1: 'Raleway-Bold',
  h2: 'Raleway-Bold',
  h3: 'Raleway-Bold',
  h4: 'Raleway-Bold',
  h5: 'Raleway-SemiBold',
  p: 'Raleway-Regular',

  // based on fontWeight
  thin: 'Raleway-Light',
  extralight: 'Raleway-Light',
  light: 'Raleway-Light',
  normal: 'Raleway-Regular',
  medium: 'Raleway-SemiBold',
  semibold: 'Raleway-SemiBold',
  bold: 'Raleway-Bold',
  extrabold: 'Raleway-ExtraBold',
  black: 'Raleway-ExtraBold',
};

export const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22,
};

export const THEME: ICommonTheme = {
  icons: ICONS,
  assets: {...ICONS, ...ASSETS},
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: {width, height},
};
