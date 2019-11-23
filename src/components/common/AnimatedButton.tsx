import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import {measures, colors} from '../../constants';

export interface AnimatedButtonProps {
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  text?: string;
  full?: boolean;
  loading?: boolean;
  onPress?: Function;
}

const AnimatedButton = ({
  fill,
  borderColor = colors.white,
  backgroundColor = 'transparent',
  text = '',
  full,
  loading,
  onPress,
}: AnimatedButtonProps) => {
  // let onLayout = ({nativeEvent}) => {
  //   if (width === 0) {
  //     console.warn(nativeEvent);
  //     setWidth(nativeEvent.layout.width);
  //   }
  // };
  let minSize = 30;
  // let animate = () => {
  //   Animated.spring(animation, {toValue: minSize});
  // };
  let revert = () => {};
  // let animation = new Animated.Value(width);
  // let height = animation.interpolate({
  //   inputRange: [0, width],
  //   outputRange: [minSize, 55],
  //   extrapolate: 'clamp',
  // });
  useEffect(() => {
    if (loading) {
      // console.warn('Should animate');
      // animate();
    } else {
      // console.warn(`'Should revert'`);
      // revert();
    }
  }, [loading]);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View>
        <View
          style={[
            styles.base,
            fill && styles.fill,
            full && styles.full,
            {backgroundColor, borderColor},
          ]}>
          <Text>{text}</Text>
        </View>
        {/* <View style={[full && styles.full]} /> */}
      </Animated.View>
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

export default AnimatedButton;
