import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import RoundButton, { RoundButtonProps } from '../../components/common/RoundButton';
import { colors } from '../../constants';
import { strings } from '../../locales/strings';
import OrderCard, { OrderProps } from './OrderCard';

export let demoOrder: OrderProps = {
  properties: [
    {
      title: 'Дата посещения',
      rightText: '16:35',
      description: '03.12.2019',
    },
    {
      title: 'Тип автомобиля',
      icon: 'light',
      description: 'Легковой',
    },
    {
      title: 'Тип услуги',
      description: 'Бесконтактная мойка кузова автомобиля, коврики пороги',
    },
    { title: 'Цена умлуги', price: '40 000 сум' },
  ],
  user: null,
};


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

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <RoundButton
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
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(e, i) => i.toString()}
        renderItem={({ item, ...props }) => <OrderCard {...props} {...item} />}
        data={[demoOrder, demoOrder, demoOrder, demoOrder]}
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

