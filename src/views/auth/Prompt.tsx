import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../constants';
import LogoWithText from '../../components/LogoWithText';
import RoundButton from '../../components/common/RoundButton';
import { strings } from '../../locales/strings';
import logoLight from '../../assets/images/logo-light.png';

const Prompt = ({ navigation }) => {
  let proceed = () => {
    navigation.navigate('CustomMap');
  };
  let authorize = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container} />
      <View style={styles.container}>
        <Image source={logoLight} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {/* <RoundButton onPress={proceed} text={strings.enter} full /> */}
          <RoundButton
            onPress={authorize}
            backgroundColor={colors.white}
            text={strings.enter}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 50,
    paddingVertical: 30,
  },
  logo: {
    width: 200,
    height: 200 / 1.19,
  },
});

export default Prompt;
