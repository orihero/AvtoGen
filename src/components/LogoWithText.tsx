import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {strings} from '../locales/strings';
import {measures, colors} from '../constants';
import {commonStyles} from '../constants/commonStyles';

let {width, height} = Dimensions.get('window');

export interface LogoWithTextProps {
  dark?: boolean;
}

const LogoWithText = ({dark = false}: LogoWithTextProps) => {
  let source = dark
    ? require('../assets/images/dark-logo.png')
    : require('../assets/images/logo.png');
  return (
    <View style={[commonStyles.centeredContainer, {flex: null}]}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180 / 1.24,
  },
});

export default LogoWithText;
