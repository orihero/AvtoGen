import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icons, colors} from '../../constants';

interface MenuItemProps {
  text: string;
  iconName: string;
}

const MenuItem = ({text, iconName}: MenuItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Icons name={iconName} size={20} color={colors.darkGray} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: colors.extraGray,
  },
  text: {fontWeight: '100', color: colors.darkGray, fontSize: 16},
});

export default MenuItem;
