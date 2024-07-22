import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {auth} from '../config/firebase';
import * as regex from '../constants/regex';
import {useTheme, useTranslation} from '../hooks';
import {Block, Button, Input, Image, Text} from '../components';
import {sendPasswordResetEmail} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
const isAndroid = Platform.OS === 'android';
interface ISignInValidation {
  email: boolean;
}
interface ISignIn {
  email: string;
}
export default function ForgotPassword() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();
  const [isValid, setIsValid] = useState<ISignInValidation>({
    email: false,
  });
  const [signin, setSignIn] = useState<ISignIn>({
    email: '',
  });

  const handleChange = useCallback(
    (value: ISignIn) => {
      setSignIn((state) => ({...state, ...value}));
    },
    [setSignIn],
  );
  const handleResetPassword = () => {
    if (signin.email) {
      console.log(signin.email);
      sendPasswordResetEmail(auth, signin.email)
        .then(() => {
          console.log('uspešno');
          Alert.alert(
            t('forgotpassword.resetPasswordSent'),
            t('forgotpassword.senttext'),
          );
        })
        .catch((error) => {
          console.log('Error sending password reset email:', error);
          Alert.alert(
            t('forgotpassword.resetPasswordFailed'),
            t('forgotpassword.failedtext'),
          );
        });
    }
  };

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(signin.email),
    }));
  }, [signin, setIsValid]);

  const styles = {
    imageCover: {
      height: sizes.height * 0.3,
    },
  };

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            style={styles.imageCover}>
            <Text h4 center white marginTop={sizes.l} marginBottom={sizes.md}>
              {t('forgotpassword.title')}
            </Text>
            <Text p center white>
              {t('forgotpassword.subtitle')}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.125 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid}
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  success={Boolean(signin.email && isValid.email)}
                  danger={Boolean(signin.email && !isValid.email)}
                  onChangeText={(value) => handleChange({email: value})}
                />
              </Block>

              <Button
                onPress={handleResetPassword}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  {t('forgotpassword.forgotpassword')}
                </Text>
              </Button>
            </Block>
          </Block>
          <Block marginTop={250}>
            <Button
              outlined
              shadow={!isAndroid}
              onPress={() => navigation.navigate('SignIn')}>
              <Text bold tertiary transform="uppercase">
                {t('forgotpassword.back')}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
