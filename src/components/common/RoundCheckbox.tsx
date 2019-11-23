import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Icons} from '../../constants/icons';

export interface RoundCheckboxProps {
  color: string;
  backgroundColor: string;
  icon: string;
  size?: number;
  activeColor: string;
  activeBackColor: string;
  index?: number;
  parentIndex?: number;
  setActive?: Function;
}

const RoundCheckbox = ({
  backgroundColor,
  color,
  icon,
  size = 20,
  activeColor,
  activeBackColor,
  setActive,
  index,
  parentIndex,
}: RoundCheckboxProps) => {
  let isActive = parentIndex === index;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(index);
      }}>
      <View
        style={[
          styles.container,
          isActive ? {backgroundColor: activeBackColor} : {backgroundColor},
        ]}>
        <Icons name={icon} color={isActive ? activeColor : color} size={size} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundCheckbox;
