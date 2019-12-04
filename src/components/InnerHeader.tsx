import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import {Icons, colors} from '../constants';
import {strings} from '../locales/strings';
import {HeaderBackButton} from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';

const InnerHeader = ({
  navigation,
  back,
  transparent,
  title = strings.settings,
}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        transparent && {backgroundColor: colors.ultraLightGray},
      ]}>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={styles.header}>
        <View style={[styles.side, {marginLeft: -15}]}>
          <HeaderBackButton
            tintColor={colors.darkGray}
            onPress={() => {
              if (back) navigation.navigate(back);
              else navigation.goBack();
            }}
          />
        </View>
        <View style={styles.headerMiddle}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.side} />
      </View>
      {!transparent && <View style={styles.border} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  side: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: colors.darkGray,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerMiddle: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 0.8,
  },
  border: {
    height: 1,
    backgroundColor: colors.extraGray,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
});

export default InnerHeader;
