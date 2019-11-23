import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import LogoWithText from '../../components/LogoWithText';
import RoundButton from '../../components/common/RoundButton';
import {strings} from '../../locales/strings';

const Prompt = ({navigation}) => {
  let proceed = () => {
    navigation.navigate('CustomMap');
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container} />
      <View style={styles.container}>
        <LogoWithText dark={false} />
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <RoundButton onPress={proceed} text={strings.enter} full />
          <RoundButton
            onPress={proceed}
            backgroundColor={colors.white}
            text={strings.authorize}
            full
            fill
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.accent,
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 50,
    paddingVertical: 30,
  },
});

export default Prompt;
