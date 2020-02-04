import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { withNavigation } from 'react-navigation';
import { Icons, colors } from '../constants';

const drawerContent = [
  {
    text: 'Мои заказы',
    iconName: 'exception1',
    isAnt: true,
    navigateTo: 'Settings',
  },
  {
    text: 'Позвонить в поддержку ',
    iconName: 'customerservice',
    isAnt: true,
    navigateTo: 'Settings',
  },
  {
    text: 'Настройки',
    iconName: 'tool',
    isAnt: true,
    navigateTo: 'Settings',
  },
  {
    text: 'Выход',
    iconName: 'leftsquareo',
    isAnt: true,
    navigateTo: 'Settings',
    bottom: true,
  },
];

const CustomDrawer = ({ navigation }) => (
  <View style={styles.contentContainer}>
    <>
      <UserInfo
        user={{
          avatar_url:
            'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
          name: 'd27sa87821j',
          phone: '+998 99 888 88 88',
        }}
      />
      {drawerContent.map(
        (e, key) => !e.bottom && <DrawerItem {...{ key, ...e }} />,
      )}
    </>
    <View style={styles.versionContainer}>
      <DrawerItem {...drawerContent[drawerContent.length - 1]} />
    </View>
  </View>
);

const UserInfo = ({ user }) => {
  if (!user) {
    user = {};
  }
  return (
    <View style={styles.userContainer}>
      <Image style={styles.userAvatar} source={{ uri: user.avatar_url }} />
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{user.name}</Text>
        <Text style={styles.pointsText}>{user.phone}</Text>
      </View>
    </View>
  );
};

export const DrawerItem = withNavigation(
  ({ text, iconName, key, bold, iconText, onPress }) => (
    <TouchableWithoutFeedback
      onPress={onPress}>
      <View key={key} style={[styles.drawerItem, bold && { paddingVertical: 0 }]}>
        <View style={[styles.iconContainer]}>
          {iconText ? (
            <Text style={[styles.drawerText]}>{iconText}</Text>
          ) : (
              <Icons name={iconName} size={22} color={colors.darkGray} />
            )}
        </View>
        <Text style={[styles.drawerText, bold && { fontWeight: 'bold' }]}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ),
);

const styles = StyleSheet.create({
  versionContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    alignItems: 'flex-end',
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    width: 50,
  },
  drawerText: {
    fontSize: 16,
    color: colors.darkGray,
  },
  userContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: 'black',
    marginBottom: 10,
  },
  nameContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  nameText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsText: {
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default CustomDrawer;
