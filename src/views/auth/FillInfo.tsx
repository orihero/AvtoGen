import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {commonStyles, colors} from '../../constants';
import RoundInput from '../../components/common/RoundInput';
import {strings} from '../../locales/strings';
import RoundButton from '../../components/common/RoundButton';

const SelectLanguage = ({navigation}) => {
  let proceed = () => {
    navigation.navigate('CustomMap');
  };
  return (
    <View style={[styles.container]}>
      <View>
        <RoundInput placeholder={strings.name} />
        <RoundInput placeholder={strings.surname} />
      </View>
      <View style={styles.row}>
        <RoundButton
          full
          onPress={proceed}
          fill
          flex
          backgroundColor={colors.ultraLightGray}
          borderColor={colors.lightGray}
          text={strings.skip}
        />
        <RoundButton
          flex
          onPress={proceed}
          full
          fill
          textColor={colors.white}
          backgroundColor={colors.accent}
          text={strings.next}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: colors.ultraLightGray,
    flex: 1,
    paddingVertical: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SelectLanguage;
