import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {measures, colors} from '../../constants';

export interface RoundButtonProps {
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  text?: string;
  full?: boolean;
  onPress: Function;
}

const RoundButton = ({
  fill,
  borderColor = colors.white,
  backgroundColor = 'transparent',
  text,
  full,
  onPress,
}: RoundButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.base,
          fill && styles.fill,
          full && styles.full,
          {backgroundColor, borderColor},
        ]}>
        <Text style={[styles.textBase, fill && styles.textFill]}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: measures.borderRadius * 3,
    borderWidth: 1,
    borderColor: colors.white,
    margin: 5,
  },
  full: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 55,
  },
  fill: {
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  textBase: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  textFill: {
    color: colors.accent,
  },
});

export default RoundButton;
