import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, Icons} from '../../constants';
import Text from './CustomText';

export interface PropertyProps {
  title: string;
  description?: string;
  icon?: string;
  rightText?: string;
  price?: string;
}

const Property = ({
  title,
  description,
  icon,
  rightText,
  price,
}: PropertyProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>{title}</Text>
        {!price && <Text style={styles.descriptionText}>{description}</Text>}
        {price && (
          <Text style={{...styles.rightText, fontSize: 20, fontWeight: '900'}}>
            {price}
          </Text>
        )}
      </View>
      <View style={styles.right}>
        {icon && <Icons color={colors.accent} size={18} name={icon} />}
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: colors.extraGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '400',
    marginVertical: 6,
  },
  descriptionText: {
    color: colors.lightGray,
    fontSize: 14,
    fontWeight: '100',
    // marginVertical: 10,
  },
  right: {
    justifyContent: 'flex-end',
  },
  rightText: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Property;
