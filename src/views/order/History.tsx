import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import RoundButton, {
  RoundButtonProps,
} from '../../components/common/RoundButton';
import { colors } from '../../constants';
import strings from '../../locales/strings';
import OrderItem from './OrderItem';
import { demoOrder } from '../account/Account';
import OrderPill from '../../components/OrderPill';
import request from '../../api/requests';

let activeButton: RoundButtonProps = {
  backgroundColor: colors.yellow,
  text: colors.black,
  borderColor: colors.transparent,
};
let inActiveButton: RoundButtonProps = {
  borderColor: colors.lightGray,
  textColor: colors.darkGray,
};

const History = () => {
  const [activeIndex, setactiveIndex] = useState(0);
  const [data, setData] = useState([]);
  let effect = async () => {
    let res = await request.main.books('');
    setData(res.data.data)
  }
  useEffect(() => {
    effect()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* <RoundButton
          full
          flex
          borderColor={colors.lightGray}
          textColor={colors.darkGray}
          text={strings.inWeek}
          backgroundColor={colors.ultraLightGray}
        />
        <RoundButton
          full
          flex
          backgroundColor={colors.yellow}
          text={strings.inToday}
        /> */}
      </View>
      <FlatList
        keyExtractor={(e, i) => i.toString()}
        renderItem={({ item, ...props }) => <OrderPill {...props} {...{ item }} />}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: colors.ultraLightGray,
  },
  row: {
    flexDirection: 'row',
  },
});

export { History };
