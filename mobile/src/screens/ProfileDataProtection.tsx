import React from 'react';
import {Block, Text} from '../components/';
import {useTheme, useTranslation} from '../hooks/';

const ProfileDataProtection = () => {
  const {sizes} = useTheme();

  const styles = {
    contentContainer: {
      paddingHorizontal: sizes.s,
      paddingBottom: sizes.padding,
    },
  };

  const {t} = useTranslation();
  const dataProtectionPolicy = t('policies.dataprotectionpolicy');
  const dataProtectionPolicyTitle = t('policies.dataprotectionpolicytitle');

  return (
    <Block safe marginTop={sizes.md}>
      <Block scroll contentContainerStyle={styles.contentContainer}>
        <Block flex={0} align="center" marginTop={sizes.l} paddingHorizontal={sizes.s}>
          <Text h3 center>
            {dataProtectionPolicyTitle}
          </Text>
          <Text p>{dataProtectionPolicy}</Text>
        </Block>
      </Block>
    </Block>
  );
};

export default ProfileDataProtection;
