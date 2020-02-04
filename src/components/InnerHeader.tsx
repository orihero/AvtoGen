import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderBackButton } from 'react-navigation-stack';
import { colors } from '../constants';
import { strings } from '../locales/strings';
import { withNavigation } from 'react-navigation';

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
        transparent && { backgroundColor: colors.ultraLightGray },
        !back && { paddingTop: 15 }
      ]}>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={styles.header}>
        {back ? <View style={[styles.side, { marginLeft: -15 }]}>
          <HeaderBackButton
            tintColor={colors.darkGray}
            onPress={() => {
              console.warn('thought');
              navigation.pop(1)
            }}
          />
        </View> : <View style={styles.side} />}
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

export default withNavigation(InnerHeader);
