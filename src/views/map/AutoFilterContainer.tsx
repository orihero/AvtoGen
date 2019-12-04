import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  Animated,
  StyleSheet,
} from 'react-native';
import {colors} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';

const AutoFilterContainer = ({
  children,
  proceed = index => {},
  childStates,
  parentIndex,
}) => {
  const [active, setActive] = useState(parseInt(childStates[parentIndex]));
  let onCheck = index => {
    proceed(index);
    setActive(index);
  };
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isActive: active === index,
      setActive: () => onCheck(index),
    });
  });
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.white},
});

export default AutoFilterContainer;
