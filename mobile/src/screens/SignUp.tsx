import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {auth, baza} from '../config/firebase';
import {useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {API_URL} from '../config/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const SignUp = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [customer, setCustomer] = useState(null);
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    agreed: false,
  });

  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value: IRegistration) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const currentUser = auth.currentUser;
  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      createUserWithEmailAndPassword(
        auth,
        registration.email,
        registration.password,
      )
        .then((result) => {
          updateProfile(result.user, {
            displayName: registration.name,
          }).catch((error) => {
            console.log('ERROR -> failed to update profile -> ' + error);
          });
        })
        .then(async () => {
          const response = await fetch(`${API_URL}/create-customer`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: registration.email,
            }),
          });
          const {customer} = await response.json();
          setCustomer(customer);
          setDoc(doc(baza, 'uporabniki', auth.currentUser.uid), {
            id: customer.id,
            username: registration.name,
            email: registration.email,
            isAdmin: registration.isAdmin,
          });
          await AsyncStorage.setItem('userId', customer.id);
          await AsyncStorage.setItem('userEmail', customer.email);
          console.log(customer.id)
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log('Error creating user:', error);

          if (error.code === 'auth/email-already-in-use') {
            Alert.alert(
              t('register.emailinuse'),
              t('register.emailinusetext'),
              [
                {
                  text: 'OK',
                },
                {
                  text: t('register.gosignin'),
                  onPress: () => navigation.navigate('SignIn'),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(t('register.failedsignup'), t('register.failedsignuptext'));

          }
        });
    }
  }, [isValid, registration]);


  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  const styles = {
    imageCover: {
      height: sizes.height * 0.3,
    },
    imageBack: {
      width: 10,
      height: 18,
    },
  };

  const handleLegalNoticeLink = () => {
    navigation.navigate('ProfileLegalNotice');
  };

  const handleDataPrivacyLink = () => {
    navigation.navigate('ProfileDataProtection');
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
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                style={styles.imageBack}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
            </Button>
            <Text h4 center white marginBottom={sizes.md}>
              {t('register.title')}
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
                  label={t('common.name')}
                  placeholder={t('common.namePlaceholder')}
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({name: value})}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  success={Boolean(registration.email && isValid.email)}
                  danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={(value) => handleChange({email: value})}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({password: value})}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({agreed: value})}
                />
                <Text paddingRight={sizes.s}>
                  {t('common.agree')}
                  <Text
                    semibold
                    style={{
                      alignSelf: 'flex-start',
                      paddingBottom: 2,
                      color: colors.primary,
                    }}
                    onPress={() => navigation.navigate('ProfileLegalNotice')}>
                    {t('policies.legalnoticetitlecorrected')}
                  </Text>{' '}
                  {t('common.and')}{' '}
                  <TouchableOpacity onPress={handleDataPrivacyLink}>
                    <Text semibold>
                      {t('policies.dataprotectionpolicytitlecorrected')}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </Block>
              <Button
                onPress={handleSignUp}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold white transform="uppercase">
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

export default SignUp;
