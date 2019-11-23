import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {strings} from '../locales/strings';
import {measures, colors} from '../constants';
import {commonStyles} from '../constants/commonStyles';

let {width, height} = Dimensions.get('window');

export interface LogoWithTextProps {
  dark: boolean;
}

const LogoWithText = ({dark = true}: LogoWithTextProps) => {
  let source = dark
    ? require('../assets/images/dark-logo.png')
    : require('../assets/images/logo.png');
  return (
    <View style={[commonStyles.centeredContainer, {flex: null}]}>
      <Image source={source} style={styles.image} />
      <Text style={styles.text(dark)}>{strings.autoGen}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: dark => ({
    fontSize: 50,
    color: !dark ? colors.white : colors.accent,
  }),
  image: {
    width: 177.6,
    height: 38.4,
  },
});

export default LogoWithText;
