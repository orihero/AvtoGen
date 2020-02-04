import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import {UserProps} from '../../views/account/OrderCard';

const UserInfo = ({
  image = 'https://i7.pngguru.com/preview/393/995/701/aspria-fitness-computer-icons-user-clip-art-my-account-icon-thumbnail.jpg',
  name = 'Николай Соболев',
  phone = '8 99 000 11 25',
}: UserProps) => {
  return (
    <View style={styles.userInfo}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={styles.contact}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  contact: {
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
  },
  phone: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '100',
  },
});

export default UserInfo;
