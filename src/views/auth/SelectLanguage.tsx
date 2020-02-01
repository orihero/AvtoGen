import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, colors } from '../../constants';
import RoundButton from '../../components/common/RoundButton';
import { strings } from '../../locales/strings';
import { setLanguage } from '../../redux/actions'
import { connect } from 'react-redux';

const SelectLanguage = ({ navigation }) => {
  let proceed = (lang) => {

    navigation.navigate('FillInfo');
  };
  return (
    <View
      style={[
        commonStyles.centeredContainer,
        { backgroundColor: colors.ultraLightGray },
      ]}>
      <RoundButton
        onPress={() => proceed('ru')}
        text={strings.russian}
        backgroundColor={colors.white}
        textColor={colors.accent}
        big
      />
      <RoundButton
        onPress={() => proceed('en')}
        text={strings.english}
        backgroundColor={colors.white}
        textColor={colors.accent}
        big
      />
      <RoundButton
        text={strings.uzbek}
        onPress={() => proceed('uz')}
        backgroundColor={colors.white}
        textColor={colors.accent}
        big
      />
    </View>
  );
};

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = {
  setLanguage
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
