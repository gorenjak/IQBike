import React from 'react';
import {Block, Text} from '../components/';
import {useTheme, useTranslation} from '../hooks/';

const ProfileLegalNotice = () => {
  const {sizes} = useTheme();

  const styles = {
    contentContainer: {
      paddingHorizontal: sizes.s,
      paddingBottom: sizes.padding,
    },
  };

  const {t} = useTranslation();
  const legalNoticePolicy = t('policies.legalnotice');
  const legalNoticeTitle = t('policies.legalnoticetitle');

  return (
    <Block safe marginTop={sizes.md}>
      <Block scroll contentContainerStyle={styles.contentContainer}>
        <Block flex={0} align="center" marginTop={sizes.l} paddingHorizontal={sizes.s}>
          <Text h2 center marginBottom={sizes.sm}>
            {legalNoticeTitle}
          </Text>
          <Text p>{legalNoticePolicy}</Text>
        </Block>
      </Block>
    </Block>
  );
};

export default ProfileLegalNotice;
