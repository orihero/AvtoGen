import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {colors, Icons} from '../../constants';
import {strings} from '../../locales/strings';
import Avatar from './Avatar';
import {DrawerItem} from '../../components/DrawerContent';
import MenuItem from './MenuItem';
import SafeAreaView from 'react-native-safe-area-view';

const Account = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.userInfo}>
            <Avatar />
            <Text style={styles.nameText}>Scarlett Johansson</Text>
          </View>
          <View style={styles.contact}>
            <View>
              <Icons
                name={'phone'}
                size={18}
                color={colors.darkGray}
                style={{paddingHorizontal: 8, marginBottom: 2.2}}
              />
              <Text
                style={{
                  color: colors.darkGray,
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginHorizontal: 8,
                }}>
                ID
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: colors.darkGray,
                  fontSize: 16,
                }}>
                +998 99 000 01 02
              </Text>
              <Text style={{color: colors.darkGray, fontSize: 16}}>
                025658974
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <MenuItem text={strings.myOrders} iconName="list" />
          <MenuItem text={strings.call} iconName={'headphone'} />
          <MenuItem text={strings.settings} iconName={'gear'} />
        </View>
      </View>
      <View style={styles.footer}>
        <DrawerItem text={strings.exit} iconName={'logout'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    paddingHorizontal: 30,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userInfo: {justifyContent: 'center', alignItems: 'center'},
  footer: {},
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  nameText: {
    fontSize: 20,
    color: colors.darkGray,
  },
});

export default Account;
