import React from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icons as Comp} from '../../constants/icons';

export interface RoundCheckboxProps {
  color: string | Animated.Value | Animated.AnimatedInterpolation;
  backgroundColor: string | Animated.Value | Animated.AnimatedInterpolation;
  icon: string;
  size?: number;
  activeColor: string;
  activeBackColor: string;
  index: number;
  parentIndex?: number;
  setActive?: Function;
}

let Icons = Animated.createAnimatedComponent(Comp);

const RoundCheckbox = ({
  backgroundColor,
  color,
  icon,
  size = 20,
  activeColor,
  setActive,
  index,
  parentIndex,
  activeBackColor,
}: RoundCheckboxProps) => {
  let isActive = parentIndex === index;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(index);
      }}>
      <Animated.View
        style={[
          styles.container,
          {backgroundColor: isActive ? activeBackColor : backgroundColor},
        ]}>
        <Icons
          name={icon}
          size={size}
          style={{
            zIndex: 5,
            color: isActive ? activeColor : color,
          }}
        />
      </Animated.View>
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
