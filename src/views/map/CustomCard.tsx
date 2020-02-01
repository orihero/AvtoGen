import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Animated,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../constants/index';
import RoundButton from '../../components/common/RoundButton';
import RoundCheckbox, {
  RoundCheckboxProps,
} from '../../components/common/RoundCheckbox';
import { strings } from '../../locales/strings';
import { Icons } from '../../constants/icons';
import DefaultCheckbox from '../../components/common/DefaultCheckbox';
import AnimatedButton from '../../components/common/AnimatedButton';
import WheelPicker from './WheelPicker';
import AutoFilterContainer from './AutoFilterContainer';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Text from '../../components/common/CustomText';
import CardContent from './CardContent';
import { FilterItem } from './AutoFilter';
import requests from '../../api/requests';

interface FilterData {
  data: Array<FilterItem> | number;
  title: string;
}

let checkboxes = Array<RoundCheckboxProps & FilterData>();
checkboxes = [
  {
    backgroundColor: colors.ultraLightGray,
    icon: 'path-18',
    color: colors.accent,
    activeBackColor: colors.accent,
    activeColor: colors.white,
    size: 20,
    data: [
      { icon: 'light', name: 'Легковая' },
      { icon: 'jeep', name: 'Джип' },
      { icon: 'miniven', name: 'Минивен' },
      { icon: 'heavy', name: 'Грузовая' },
    ],
    title: strings.selectAuto,
  },
  {
    backgroundColor: colors.ultraLightGray,
    icon: 'service',
    color: colors.accent,
    activeBackColor: colors.accent,
    activeColor: colors.white,
    size: 24,
    data: [
      {
        name: 'Бесконтактная мойка кузова автомобиля, коврики пороги',
      },
      {
        name: 'Чистка салона пылесосом и влажная уборка пластмассовых деталей',
      },
      {
        name: 'Чистка стекол изнутри химическими средствами',
      },
      {
        name: 'Полировка пластмассовых деталей салона химическими средствами',
      },
      {
        name: 'Мойка двигателя и моторного отсека, продувка',
      },
      {
        name: 'Мойка двигателя и моторного отсека, продувка',
      },
    ],
    title: strings.selectService,
    services: true
  },
  {
    backgroundColor: colors.ultraLightGray,
    icon: 'time',
    color: colors.accent,
    activeBackColor: colors.accent,
    activeColor: colors.white,
    size: 28,
    data: 1,
    title: strings.selectTime,
  },
];

interface CustomCardProps {
  onSubmit?: Function;
}

let changeValueAt = (source, value, index) => {
  return source
    .substr(0, index)
    .concat(value)
    .concat(source.substr(index + 1, source.length));
};

const CustomCard = ({ onSubmit }: CustomCardProps) => {
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [childStates, setChildStates] = useState('00');
  const [services, setServices] = useState([])
  let animation = new Animated.Value(0);
  let scroll;
  useEffect(() => {
    requests.main.services().then(res => {
      setServices(res.data.data)
    })
  }, [])
  useEffect(() => {
    setTimeout(
      () => {
        if (scroll && scroll._component) {
          scroll._component.scrollTo({
            x: active * Dimensions.get('window').width,
          })
        }
      },
      200,
    );
  }, [active]);
  const selectFilter = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActive(active === index ? -1 : index);
  };
  //When option is selected
  let proceed = val => {
    if (active + 1 === checkboxes.length) {
      //start loading
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActive(active + 1);
    setChildStates(changeValueAt(childStates, val, active));
  };
  //Pangesture handler scroll event
  let onScroll = Animated.event([
    {
      nativeEvent: {
        contentOffset: {
          x: animation,
        },
      },
    },
  ]);
  let wHeight = 300;
  let height = new Animated.Value(-wHeight);
  let onGestureEvent = Animated.event([
    {
      nativeEvent: {
        translationY: height,
      },
    },
  ]);
  let onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      if (nativeEvent.translationY < 0) {
        Animated.spring(height, { toValue: -wHeight }).start(() => {
          isExpanded = true;
          height.setOffset(-wHeight);
          height.setValue(0);
        });
      } else {
        Animated.spring(height, { toValue: wHeight }).start(() => {
          isExpanded = false;
          height.setOffset(0);
          height.setValue(0);
        });
      }
    }
  };
  let contentHeight = Animated.subtract(0, height).interpolate({
    inputRange: [0, wHeight],
    outputRange: [0, wHeight],
    extrapolate: 'clamp',
  });

  let shouldRender = active !== -1 && checkboxes[active];
  return (
    <Animated.View style={[styles.card]}>
      {shouldRender && checkboxes[active].data && (
        <View style={styles.dataWrapper}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
            <View style={styles.cardHeader}>
              <View style={styles.indicator} />
              <Text style={styles.cardHeaderText}>
                {checkboxes[active].title}
              </Text>
            </View>
          </PanGestureHandler>
          <Animated.View style={{ height: contentHeight, flex: 1 }}>
            <CardContent
              {...{
                checkboxes,
                active,
                proceed,
                childStates,
                onScroll,
                scrollRef: r => (scroll = r),
                services
              }}
            />
          </Animated.View>
        </View>
      )}
      <View style={styles.initialWrapper}>
        <View style={styles.servicesContainer}>
          <View style={styles.checkboxIndicator} />
          {checkboxes.map((e, index) => {
            return (
              <RoundCheckbox
                {...e}
                index={index}
                key={index}
                parentIndex={active}
                setActive={selectFilter}
              />
            );
          })}
        </View>
        <AnimatedButton
          onPress={onSubmit}
          backgroundColor={colors.yellow}
          borderColor={colors.yellow}
          text={strings.findCarWash}
          fill
          full
          loading={loading}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  checkboxIndicator: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 40,
    marginVertical: 15,
  },
  initialWrapper: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  fill: {
    flex: 1,
  },
  card: {
    overflow: 'hidden',
    margin: 15,
    backgroundColor: colors.white,
    // padding: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 40,
    maxHeight: 550,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  filterWrapper: {
    borderColor: colors.lightGray,
    maxHeight: 250,
    paddingHorizontal: 10,
  },
  dataWrapper: {},
  cardHeader: {
    backgroundColor: colors.ultraLightGray,
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
    textAlign: 'center',
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: colors.extraGray,
    margin: 10,
    marginTop: 5,
  },
});

export default CustomCard;
