import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {OrderProps} from '../account/OrderCard';

interface Props {
  item: OrderProps;
}

export default function OrderItem({}: Props): ReactElement {
  return <View />;
}
