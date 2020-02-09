import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import { colors, Icons } from '../../constants';
import DefaultCheckbox from '../../components/common/DefaultCheckbox';
import CheckBox from '@react-native-community/checkbox'

export interface FilterItem {
  name: string;
  icon?: string;
  index?: number;
  isLast?: boolean;
  setActive: Function;
  isActive: boolean;
}

let AutoFilter = ({
  icon,
  name,
  index,
  isLast,
  setActive,
  isActive,
  title,
  service,
  ...rest
}: FilterItem) => {
  return (
    <TouchableWithoutFeedback key={index} onPress={() => service ? setActive(index, !isActive) : setActive(index)}>
      <View
        style={[
          styles.autoFilterContainer,
        ]}>
        {icon && (
          // <Icons
          //   name={icon}
          //   style={{ width: 90 }}
          //   size={24 + index}
          //   color={colors.accent}
          // />
          <Image source={{ uri: icon }} style={styles.icon} />
        )}
        <View style={styles.fill}>
          <Text
            style={{
              ...styles.autoFilterText,
              fontWeight: icon ? 'bold' : '100',
            }}>
            {name}{title}
          </Text>
        </View>
        {service ? <CheckBox value={isActive} onValueChange={() => setActive(index, !isActive)} /> : <DefaultCheckbox isActive={isActive} setActive={() => setActive(index)} {...rest} />}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  autoFilterContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: colors.extraGray,
    alignItems: 'center',
  },
  autoFilterText: {
    color: colors.accent,
    fontSize: 16,
  },
  fill: {
    flex: 1,
  },
  icon: {
    width: 36,
    height: 20,
    marginRight: 15
  }
});

export default AutoFilter;
