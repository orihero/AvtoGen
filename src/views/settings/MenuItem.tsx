import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icons, colors } from '../../constants';

interface MenuItemProps {
  text: string;
  iconName: string;
  onPress?: Function
}

const MenuItem = ({ text, iconName, onPress }: MenuItemProps) => {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Icons name={iconName} size={20} color={colors.darkGray} />
      </View>
    </TouchableWithoutFeedback>
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
  text: { fontWeight: '100', color: colors.darkGray, fontSize: 16 },
});

export default MenuItem;
