import React from 'react';
import {View, Text} from 'react-native';
import {commonStyles, colors} from '../../constants';
import RoundButton from '../../components/common/RoundButton';
import {strings} from '../../locales/strings';

const SelectLanguage = ({navigation}) => {
  let proceed = () => {
    navigation.navigate('FillInfo');
  };
  return (
    <View
      style={[
        commonStyles.centeredContainer,
        {backgroundColor: colors.ultraLightGray},
      ]}>
      <RoundButton
        onPress={proceed}
        text={strings.russian}
        backgroundColor={colors.white}
        textColor={colors.accent}
        big
      />
      <RoundButton
        onPress={proceed}
        text={strings.english}
        backgroundColor={colors.white}
        textColor={colors.accent}
        big
      />
      <RoundButton
        text={strings.uzbek}
        onPress={proceed}
        backgroundColor={colors.white}
        textColor={colors.accent}
        big
      />
    </View>
  );
};

export default SelectLanguage;
