import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {colors, Icons} from '../../constants';
import DefaultCheckbox from '../../components/common/DefaultCheckbox';

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
  ...rest
}: FilterItem) => {
  return (
    <TouchableWithoutFeedback onPress={() => setActive(index)}>
      <View
        style={[
          styles.autoFilterContainer,
        ]}>
        {icon && (
          <Icons
            name={icon}
            style={{width: 90}}
            size={24 + index}
            color={colors.accent}
          />
        )}
        <View style={styles.fill}>
          <Text
            style={{
              ...styles.autoFilterText,
              fontWeight: icon ? 'bold' : '100',
            }}>
            {name}
          </Text>
        </View>
        <DefaultCheckbox isActive={isActive} setActive={setActive} {...rest} />
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
});

export default AutoFilter;
