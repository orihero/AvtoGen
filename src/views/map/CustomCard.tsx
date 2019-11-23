import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import {colors} from '../../constants/index';
import RoundButton from '../../components/common/RoundButton';
import RoundCheckbox, {
  RoundCheckboxProps,
} from '../../components/common/RoundCheckbox';
import {strings} from '../../locales/strings';
import {Icons} from '../../constants/icons';
import DefaultCheckbox from '../../components/common/DefaultCheckbox';
import AnimatedButton from '../../components/common/AnimatedButton';
import WheelPicker from './WheelPicker';

interface FilterData {
  data: Array<FilterItem> | number;
  title: string;
}

interface FilterItem {
  name: string;
  icon?: string;
  index?: number;
  isLast?: boolean;
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
      {icon: 'light', name: 'Легковая'},
      {icon: 'jeep', name: 'Джип'},
      {icon: 'miniven', name: 'Минивен'},
      {icon: 'heavy', name: 'Грузовая'},
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

let AutoFilter = ({icon, name, index, isLast}: FilterItem) => {
  return (
    <View
      style={[
        styles.autoFilterContainer,
        isLast && {borderBottomColor: colors.accent, borderBottomWidth: 0.5},
      ]}>
      {icon && (
        <Icons
          name={icon}
          style={{width: 90}}
          size={24 + index}
          color={colors.accent}
        />
      )}
      <View style={styles.fill}>
        <Text
          style={[
            styles.autoFilterText,
            {
              fontSize: icon ? 16 : 12,
              fontWeight: icon ? 'regular' : 'bold',
            },
          ]}>
          {name}
        </Text>
      </View>
      <DefaultCheckbox />
    </View>
  );
};

interface CustomCardProps {
  onSubmit?: Function;
}

const CustomCard = ({onSubmit}: CustomCardProps) => {
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const selectFilter = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActive(index === active ? -1 : index);
  };
  let applyFilters = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  let shouldRender = active !== -1 && checkboxes[active];
  return (
    <View style={styles.card}>
      {shouldRender && checkboxes[active].data && (
        <View style={styles.dataWrapper}>
          <View style={styles.cardHeader}>
            <View style={styles.indicator} />
            <Text style={styles.cardHeaderText}>
              {checkboxes[active].title}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.filterWrapper}>
            {checkboxes[active].data.length > 0 ? (
              checkboxes[active].data.map((item, index) => {
                return (
                  <AutoFilter
                    {...item}
                    key={index}
                    index={index}
                    isLast={index == checkboxes[active].data.length - 1}
                  />
                );
              })
            ) : (
              <WheelPicker />
            )}
          </ScrollView>
        </View>
      )}
      <View style={styles.initialWrapper}>
        <View style={styles.servicesContainer}>
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
          onPress={applyFilters}
          backgroundColor={colors.yellow}
          borderColor={colors.yellow}
          text={strings.findCarWash}
          fill
          full
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  initialWrapper: {
    paddingHorizontal: 30,
  },
  fill: {
    flex: 1,
  },
  card: {
    margin: 15,
    backgroundColor: colors.white,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 40,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  autoFilterContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderColor: colors.accent,
    alignItems: 'center',
  },
  filterWrapper: {
    borderColor: colors.lightGray,
    maxHeight: 250,
  },
  autoFilterText: {
    color: colors.accent,
    fontSize: 16,
  },
  dataWrapper: {},
  cardHeader: {
    // backgroundColor: colors.ultraLightGray,
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
    backgroundColor: colors.lightGray,
    margin: 10,
    marginTop: 5,
  },
});

export default CustomCard;