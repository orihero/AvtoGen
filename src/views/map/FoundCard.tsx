import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

const FoundCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    margin: 15,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'column',
  },
  indicator: {
    borderWidth: 2,
    borderRadius: 4,
    width: 40,
    borderColor: colors.lightGray,
  },
});

export default FoundCard;
