import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Picker from 'react-native-wheel-picker';
import {colors} from '../../constants';
import {strings} from '../../locales/strings';
var PickerItem = Picker.Item;

const WheelPicker = () => {
  const [dayIndex, setDayIndex] = useState(0);
  let [pickerData, setPickerData] = useState({
    selectedHour: 15,
    selectedMinute: 30,
    hourList: Array.from({length: 24}, (v, k) => (parseInt(k) + 1).toString()),
    minuteList: Array.from({length: 60}, (v, k) =>
      (parseInt(k) + 1).toString(),
    ),
  });
  let animation = new Animated.Value(0);
  let left = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['16.5%', '58%'],
    extrapolate: 'clamp',
  });
  let color = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.accent, colors.yellow],
    extrapolate: 'clamp',
  });
  let reverseColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.yellow, colors.accent],
    extrapolate: 'clamp',
  });
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{strings.day}</Text>
      <View style={styles.top}>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.timing(animation, {
              toValue: 1 ^ dayIndex,
            }).start(() => {
              setDayIndex(1 ^ dayIndex);
            });
          }}>
          <Animated.Text style={[styles.dayText, {color: reverseColor}]}>
            {strings.today}
          </Animated.Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.spring(animation, {toValue: 1 ^ dayIndex}).start(() => {
              setDayIndex(1 ^ dayIndex);
            });
          }}>
          <Animated.Text style={[styles.dayText, {color}]}>
            {strings.tomorrow}
          </Animated.Text>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.indicator, {left}]} />
      </View>
      <Text style={[styles.title, {marginTop: 10}]}>{strings.time}</Text>
      <View style={styles.bottom}>
        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={pickerData.selectedHour}
            itemStyle={{color: 'black', fontSize: 30, fontWeight: 'bold'}}
            onValueChange={index =>
              setPickerData({...pickerData, selectedHour: index})
            }>
            {pickerData.hourList.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
          <Text style={styles.pickerText}>{strings.hours}</Text>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={pickerData.selectedMinute}
            itemStyle={{color: 'black', fontSize: 30, fontWeight: 'bold'}}
            onValueChange={index =>
              setPickerData({...pickerData, selectedMinute: index})
            }>
            {pickerData.minuteList.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
          <Text style={styles.pickerText}>{strings.minutes}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  picker: {
    width: 40,
    height: Platform.OS === 'android' ? 120 : 30,
    borderWidth: 1,
  },
  pickerText: {
    color: colors.extraGray,
    fontSize: 18,
    bottom: -48,
    left: 10,
  },
  top: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 20,
  },
  dayText: {
    color: colors.accent,
    fontSize: 20,
  },
  indicator: {
    backgroundColor: colors.yellow,
    width: 80,
    height: 3,
    position: 'absolute',
    bottom: 10,
  },
});

export default WheelPicker;
