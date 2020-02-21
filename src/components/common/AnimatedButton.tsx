import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import { measures, colors } from '../../constants';

export interface AnimatedButtonProps {
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  text?: string;
  full?: boolean;
  loading?: boolean;
  bold?: boolean;
  onPress?: Function;
  maxSize?: number;
  minSize?: number;
}

const AnimatedButton = ({
  fill,
  borderColor = colors.white,
  backgroundColor = 'transparent',
  text = '',
  full,
  loading,
  onPress,
  maxSize = 200,
  minSize = 60,
  bold,
}: AnimatedButtonProps) => {
  const [width, setWidth] = useState(maxSize);
  const [animation, setAnimation] = useState(new Animated.Value(width));
  let onLayout = ({ nativeEvent }) => {
    if (width === 0) {
      console.warn(nativeEvent);
      setWidth(nativeEvent.layout.width);
    }
  };
  // let animate = () => {
  //   Animated.spring(animation, {toValue: minSize});
  // };
  let revert = () => {
    animation.stopAnimation();
    setWidth(maxSize)
    Animated.timing(animation, {
      duration: 100,
      toValue: maxSize,
    }).start();
  };

  useEffect(() => {
    if (loading) {
      console.warn('Should animate');
      animate();
    } else {
      console.warn(`'Should revert'`);
      revert();
    }
  }, [loading]);
  let animate = () => {
    animation.stopAnimation();
    setWidth(minSize)
    Animated.timing(animation, {
      duration: 100,
      toValue: minSize,
    }).start();
  };
  let localPress = () => {
    onPress();
  };
  let opacity = animation.interpolate({
    inputRange: [minSize, maxSize],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  let height = animation.interpolate({
    inputRange: [minSize, maxSize],
    outputRange: [minSize, 55],
  });
  return (
    <TouchableWithoutFeedback onPress={localPress}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          onLayout={onLayout}
          style={[
            styles.base,
            fill && styles.fill,
            full && styles.full,
            { backgroundColor, borderColor, width: animation, height },
          ]}>
          <Animated.Text style={{ opacity, fontWeight: bold ? 'bold' : '400' }}>
            {text}
          </Animated.Text>
          {width === minSize && (
            <View style={{ position: 'absolute' }}>
              <ActivityIndicator size={'large'} color={colors.accent} />
            </View>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  base: {
    // padding: 5,
    // paddingHorizontal: 15,
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
