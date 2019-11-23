import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Picker from 'react-native-wheel-picker';
import {colors} from '../../constants';
import {strings} from '../../locales/strings';
var PickerItem = Picker.Item;

const WheelPicker = () => {
  let [pickerData, setPickerData] = useState({
    selectedData: 1,
    itemList: ['la', 'la', 'la', 'la', 'la', 'la', 'la', 'la', 'la'],
    dayList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    monthList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    yearList: ['2017', '2018', '2019', '2020', '2021'],
    hourList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    minuteList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.title}>{strings.day}</Text>
          <Picker
            style={styles.picker}
            selectedValue={pickerData.selectedData}
            itemStyle={{color: 'black', fontSize: 18}}
            // onValueChange={index => onPickerSelect(index)}>
          >
            {pickerData.dayList.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: -23,
          }}>
          /
        </Text>
        <View style={styles.pickerWrapper}>
          <Text style={styles.title}>{strings.month}</Text>
          <Picker
            style={styles.picker}
            selectedValue={pickerData.selectedData}
            itemStyle={{color: 'black', fontSize: 18}}
            // onValueChange={index => onPickerSelect(index)}>
          >
            {pickerData.monthList.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: -23,
          }}>
          /
        </Text>
        <View style={styles.pickerWrapper}>
          <Text style={styles.title}>{strings.year}</Text>
          <Picker
            style={styles.picker}
            selectedValue={pickerData.selectedData}
            itemStyle={{color: 'black', fontSize: 18}}
            // onValueChange={index => onPickerSelect(index)}>
          >
            {pickerData.yearList.map((value, i) => (
              <PickerItem label={value} value={i} key={i} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.title}>{strings.time}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Picker
              style={styles.picker}
              selectedValue={pickerData.selectedData}
              itemStyle={{color: 'black', fontSize: 18}}
              // onValueChange={index => onPickerSelect(index)}>
            >
              {pickerData.hourList.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 4,
              }}>
              :
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={pickerData.selectedData}
              itemStyle={{color: 'black', fontSize: 18}}
              // onValueChange={index => onPickerSelect(index)}>
            >
              {pickerData.minuteList.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.yellow,
  },
  title: {
    fontSize: 20,
  },
  pickerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  picker: {
    width: 40,
    height: 65,
    marginVertical: 10,
  },

  top: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    paddingTop: 10,
    flexDirection: 'row',
  },
});

export default WheelPicker;
