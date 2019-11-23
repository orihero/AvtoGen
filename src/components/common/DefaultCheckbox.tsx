import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Icons, colors} from '../../constants';

export interface DefaultCheckboxProps {
  color?: string;
  backgroundColor?: string;
  size?: number;
  activeColor?: string;
  activeBackColor?: string;
  index?: number;
  parentIndex?: number;
  setActive?: Function;
}

const DefaultCheckbox = ({
  backgroundColor = 'transparent',
  color = colors.yellow,
  size = 20,
  activeColor,
  activeBackColor = colors.yellow,
  setActive,
  index,
  parentIndex,
}: DefaultCheckboxProps) => {
  let isActive = parentIndex === index;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(index);
      }}>
      <View
        style={[
          styles.container,
          {width: size, height: size, borderRadius: size},
        ]}>
        <View
          style={[
            styles.innerContainer,
            isActive ? {backgroundColor: activeBackColor} : {backgroundColor},
            {width: size * 0.6, height: size * 0.6, borderRadius: size},
          ]}></View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.yellow,
  },
  innerContainer: {},
});

export default DefaultCheckbox;
