import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icons} from '../constants/icons';
import {colors} from '../constants/colors';

const Header = ({text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Icons name="menu" size={15} />
      </View>
      <View style={styles.middle}>
        <Text>{text}</Text>
      </View>
      <View style={styles.right}>
        <Icons name="search" size={17} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    // zIndex: 1000,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 10,
    // borderTopRightRadius: 0,
    // borderTopLeftRadius: 0,
    margin: 15,
    marginTop: 0,
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 10,
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
