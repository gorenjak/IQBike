import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {auth, baza} from '../config/firebase';
import {Block, Button, Image, Text} from '../components/';
import {useTheme, useTranslation} from '../hooks/';
import axios from 'axios';
import {API_URL} from '../config/server';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteDoc, doc} from 'firebase/firestore';


const Profile = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const labelColor = colors.text;
  const {t} = useTranslation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        setUserId(user_id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    fetchUserId();
  }, []);
  const confirmDeletionTitle = t('profilemenu.deleteyouraccountTitle');
  const confirmDeletionMessage = t('profilemenu.deleteyouraccountMessage');
  const cancelDeletion = t('profilemenu.cancelled');
  const deleteButton = t('profilemenu.delete');
  const handleDeleteAccount = async () => {
    Alert.alert(
      confirmDeletionTitle,
      confirmDeletionMessage,
      [
        {
          text: cancelDeletion,
          style: 'cancel',
        },
        {
          text: deleteButton,
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(userId);
              await deleteDoc(doc(baza, 'uporabniki', auth.currentUser.uid));
              await auth.currentUser.delete();
              navigation.navigate('SignUp');
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert(
                'Error',
                'An error occurred while deleting your account.',
              );
            }
          },
        },
      ],
    );
  };
  

  const deleteUser = async (customerId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/delete-customer/${customerId}`,
      );
      console.log(response.data.message); // Log the response from the server
      return response.data;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  };

  const styles = {
    imageProfile: {
      width: sizes.l * 2,
      height: sizes.l * 2,
    },
    imageBack: {
      width: 10,
      height: 18,
    },
  };

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          {/* Profile Header */}
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
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
              <Text p white marginLeft={sizes.s}>
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                style={styles.imageProfile}
                marginBottom={sizes.sm}
                source={assets.avatar}
              />
              <Text h5 center white>
                {user?.displayName}
              </Text>
              <Text p center white>
                {user?.email}
              </Text>
            </Block>
          </Image>
          {/* Payment Settings */}
          <Block paddingHorizontal={sizes.padding}>
            <Block scroll showsVerticalScrollIndicator={false}>
              <Block card row padding={sizes.padding} marginTop={sizes.m}>
                <Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text p semibold marginBottom={sizes.s}>
                      {t('profilemenu.paymentstitle')}
                    </Text>
                  </Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text color={labelColor}>{t('profilemenu.mysubscriptionstitle')}</Text>
                    <Button
                      row
                      flex={0}
                      justify="flex-end"
                      onPress={() =>
                        navigation.navigate('ProfileSubscriptions')
                      }>
                      <Image
                        radius={0}
                        style={styles.imageBack}
                        color={colors.gray}
                        source={assets.arrow}
                      />
                    </Button>
                  </Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text color={labelColor}>{t('profilemenu.paymentstitle')}</Text>
                    <Button
                      row
                      flex={0}
                      justify="flex-end"
                      onPress={() => navigation.navigate('ProfileReceipts')}>
                      <Image
                        radius={0}
                        style={styles.imageBack}
                        color={colors.gray}
                        source={assets.arrow}
                      />
                    </Button>
                  </Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text color={labelColor}>{t('profilemenu.myjourneys')}</Text>
                    <Button
                      row
                      flex={0}
                      justify="flex-end"
                      onPress={() => navigation.navigate('ProfileMyJourneys')}>
                      <Image
                        radius={0}
                        style={styles.imageBack}
                        color={colors.gray}
                        source={assets.arrow}
                      />
                    </Button>
                  </Block>
                </Block>
              </Block>

              {/* Other Settings */}
              <Block card row padding={sizes.padding} marginTop={sizes.m}>
                <Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text p semibold marginBottom={sizes.s}>
                      {t('profilemenu.other')}
                    </Text>
                  </Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text color={labelColor}>{t('policies.dataprotectionpolicytitle')}</Text>
                    <Button
                      row
                      flex={0}
                      justify="flex-end"
                      onPress={() =>
                        navigation.navigate('ProfileDataProtection')
                      }>
                      <Image
                        radius={0}
                        style={styles.imageBack}
                        color={colors.gray}
                        source={assets.arrow}
                      />
                    </Button>
                  </Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text color={labelColor}>{t('policies.legalnoticetitle')}</Text>
                    <Button
                      row
                      flex={0}
                      justify="flex-end"
                      onPress={() => navigation.navigate('ProfileLegalNotice')}>
                      <Image
                        radius={0}
                        style={styles.imageBack}
                        color={colors.gray}
                        source={assets.arrow}
                      />
                    </Button>
                  </Block>
                  <Block row flex={0} align="center" justify="space-between">
                    <Text color={labelColor}>{t('profilemenu.deleteyouraccount')}</Text>
                    <Button
                      row
                      flex={0}
                      justify="flex-end"
                      onPress={handleDeleteAccount}>
                      <Image
                        radius={0}
                        style={styles.imageBack}
                        color={colors.gray}
                        source={assets.arrow}
                      />
                    </Button>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
