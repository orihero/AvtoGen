import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import AutoFilterContainer from './AutoFilterContainer';
import WheelPicker from './WheelPicker';
import AutoFilter from './AutoFilter';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import RoundCheckbox from '../../components/common/RoundCheckbox';
import Animated from 'react-native-reanimated';

const {
  event,
  concat,
  abs,
  sub,
  sin,
  divide,
  multiply,
  greaterThan,
  cond,
  Extrapolate,
} = Animated;

const { width } = Dimensions.get('window');

const CardContent = ({
  checkboxes,
  active,
  proceed,
  childStates,
  scrollRef,
  onScroll,
  services,
  carTypes,
  data,
  setData
}) => {
  let onChange = (index, value) => {
    if (value !== undefined) {
      setData({ ...data, [1]: { ...data['1'], [index]: value } })
      return;
    }
    console.warn(index);

    setData({ ...data, [0]: index })
    proceed(1)
  }
  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        scrollEnabled={false}
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        contentContainerStyle={{
          width: width * checkboxes.length,
        }}
        onScroll={onScroll}
        decelerationRate={0.99}
        pagingEnabled
        horizontal>
        {checkboxes.map((e, i) => {
          return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: 30,
                width,
              }}>
              {e.data && e.data.length > 0 ? (
                <>
                  {(e.service ? services : e.carType ? carTypes : e.data).map((item, index) => {
                    return (
                      <AutoFilter
                        {...item}
                        key={index}
                        index={index}
                        isLast={index === checkboxes[active].data.length - 1}
                        service={e.service}
                        isActive={e.service ? data[i][index] : data[i] === item.id}
                        setActive={onChange}
                      />
                    );
                  })}
                </>
              ) : (
                  <WheelPicker setData={time => setData({ ...data, 2: time })} />
                )}
            </ScrollView>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default CardContent;
