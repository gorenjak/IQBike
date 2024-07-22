import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Text from './Text';
import {useTranslation} from '../hooks';

interface ScanButtonProps {
  onPress: () => void;
}

const ScanButton: React.FC<ScanButtonProps> = ({onPress}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity onPress={onPress} style={styles.scanButtonContainer}>
      <MaterialIcons style={styles.buttonText} name="lock-open" size={35} color="white" />
      <Text h5 secondary center bold style={styles.buttonText}>
        {t('home.lockbutton')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scanButtonContainer: {
    position: 'absolute',
    bottom: -130,
    alignSelf: 'center',
    backgroundColor: '#333',
    borderRadius: 100,
    padding: 35,
    height: 250,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
});

export default ScanButton;
