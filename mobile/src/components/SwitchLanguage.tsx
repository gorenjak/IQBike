import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  Platform,
  ViewStyle,
  StyleSheet,
  Image,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { ISwitchProps } from '../constants/types';
import useTheme from '../hooks/useTheme';

const SwitchLanguage = ({
  id = 'SwitchLanguage',
  checked = false,
  thumbColor = 'white',
  activeFillColor,
  inactiveFillColor,
  duration = 250,
  thumbStyle,
  switchStyle,
  style,
  onPress,
  haptic = true,
  thumbImageOn,
  thumbImageOff,
  ...props
}: ISwitchProps) => {
  const [isChecked, setChecked] = useState(checked);
  const { colors, sizes } = useTheme();

  const animation = useRef(new Animated.Value(isChecked ? 28 : 2)).current;

  const handleToggle = useCallback(() => {
    setChecked(!isChecked);
    onPress?.(!isChecked);

    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [isChecked, haptic, setChecked, onPress]);

  useEffect(() => {
    Animated.timing(animation, {
      duration,
      useNativeDriver: false,
      toValue: isChecked ? 28 : 2,
    }).start();
  }, [isChecked, animation, duration]);

  /* update local state for isChecked when checked prop is updated */
  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(checked);
    }
  }, [isChecked, checked]);

  const switchStyles = StyleSheet.flatten([
    {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: colors.white,
      height: sizes.switchHeight,
    },
    switchStyle,
  ]) as ViewStyle;

  const thumbStyles = StyleSheet.flatten([
    thumbStyle,
    {
      width: sizes.switchThumb,
      height: sizes.switchThumb,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: sizes.shadowOffsetWidth,
        height: sizes.shadowOffsetHeight,
      },
      shadowOpacity: sizes.shadowOpacity,
      shadowRadius: sizes.shadowRadius,
      elevation: sizes.elevation,
      borderRadius: sizes.switchThumb / 2,
      transform: [{ translateX: animation }],
      justifyContent: 'center',
      alignItems: 'center',
    },
  ]) as ViewStyle;

  const containerStyles = StyleSheet.flatten([
    style,
    {
      overflow: 'hidden',
      width: sizes.switchWidth,
      height: sizes.switchHeight,
      borderRadius: sizes.switchHeight,
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const switchID =
    Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

  return (
    <Pressable
      {...switchID}
      hitSlop={sizes.s}
      onPress={handleToggle}
      style={containerStyles}
      {...props}>
      <Animated.View style={switchStyles}>
        <Animated.View style={thumbStyles}>
          <Image
            source={isChecked ? thumbImageOff : thumbImageOn}
            style={{ width: sizes.switchThumb, height: sizes.switchThumb, borderRadius: sizes.switchThumb / 2 }}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(SwitchLanguage);
