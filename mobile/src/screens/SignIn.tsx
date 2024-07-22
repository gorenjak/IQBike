import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {auth, baza} from '../config/firebase';
import {useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text} from '../components';
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, doc, getDoc, setDoc} from 'firebase/firestore';

const isAndroid = Platform.OS === 'android';

interface ISignIn {
  email: string;
  password: string;
}
interface ISignInValidation {
  email: boolean;
  password: boolean;
}

const SignIn = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();
  const [isValid, setIsValid] = useState<ISignInValidation>({
    email: false,
    password: false,
  });
  const [signin, setSignIn] = useState<ISignIn>({
    email: '',
    password: '',
  });

  const handleChange = useCallback(
    (value: ISignIn) => {
      setSignIn((state) => ({...state, ...value}));
    },
    [setSignIn],
  );

  const handleSignIn = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** sign in */
      signInWithEmailAndPassword(auth, signin.email, signin.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userDocRef = doc(collection(baza, 'uporabniki'), user.uid);
          getDoc(userDocRef)
            .then(async (doc) => {
              if (doc.exists()) {
                // Document found, you can access the user data from doc.data()
                const userData = doc.data();
                console.log(userData.id)
                await AsyncStorage.setItem('userId', userData.id);
                await AsyncStorage.setItem('userEmail', userData.email);
                console.log('User Data:', userData.id);
              } else {
                console.log('User not found in Firestore');
              }
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
            });
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log('Error signing in:', error);

          if (error.code === 'auth/user-not-found') {
            Alert.alert(t('signin.notfound'), t('signin.notfoundtext'));
          } else if (error.code === 'auth/wrong-password') {
            Alert.alert(t('signin.invalidpass'), t('signin.invalidpasstext'));
          } else {
            Alert.alert(t('signin.failedsignin'), t('signin.failedtext'));
          }
        });
    }
  }, [isValid, signin]);


  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(signin.email),
      password: regex.password.test(signin.password),
    }));
  }, [signin, setIsValid]);

  const styles = {
    imageCover: {
      height: sizes.height * 0.3,
    },
    imageBack: {
      width: 10,
      height: 18,
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
            <Button
              row
              flex={0}
              justify="flex-end"
              onPress={() => navigation.navigate('Home')}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.close}
                marginRight={6}
              />
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              {t('signin.title')}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid}>
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
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({password: value})}
                  success={Boolean(signin.password && isValid.password)}
                  danger={Boolean(signin.password && !isValid.password)}
                />
              </Block>
              <Button
                onPress={handleSignIn}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
              <Button
                outlined
                shadow={!isAndroid}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text bold tertiary transform="uppercase">
                  {t('signin.forgotpassword')}
                </Text>
              </Button>
              <Button
                tertiary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('SignUp')}>
                <Text bold tertiary transform="uppercase">
                  {t('common.signup')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default SignIn;
