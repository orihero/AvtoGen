import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Animated,
	TouchableWithoutFeedback,
	Platform
} from "react-native";
import Picker from "react-native-wheel-picker";
import { colors } from "../../constants";
import { strings } from "../../locales/strings";
var PickerItem = Picker.Item;

const WheelPicker = ({ setData }) => {
	const [dayIndex, setDayIndex] = useState(0);
	const [animation, setanimation] = useState(new Animated.Value(0));
	const [first, setFirst] = useState(true);
	let date = new Date(Date.now());
	let [pickerData, setPickerData] = useState({
		selectedHour: date.getHours() + 1,
		selectedMinute: 0,
		hourList: Array.from({ length: 24 }, (v, k) => parseInt(k).toString()),
		minuteList: Array.from({ length: 60 }, (v, k) => parseInt(k).toString())
	});
	let left = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ["16.5%", "58%"],
		extrapolate: "clamp"
	});
	let color = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [colors.accent, colors.yellow],
		extrapolate: "clamp"
	});
	let reverseColor = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [colors.yellow, colors.accent],
		extrapolate: "clamp"
	});
	let isFirst =
		pickerData.selectedHour === date.getHours() + 1 &&
		pickerData.selectedMinute === 0;
	let changeData = ({
		hour = pickerData.selectedHour,
		minute = pickerData.selectedMinute
	}) => {
		let dayInTime = dayIndex * 24 * 60 * 60 * 1000;
		let date = new Date(Date.now() + dayInTime);
		let isFirst = hour === date.getHours() + 1 && minute === 0;
		let newHour = hour < 10 ? "0" + hour.toString() : hour;
		let newMinute = minute < 10 ? "0" + minute.toString() : minute;
		if (!isFirst) {
			let stringifiedData = `${date.getFullYear()}-${
				date.getMonth() < 10
					? "0" + (date.getMonth() + 1).toString()
					: date.getMonth() + 1
			}-${
				date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
			} ${newHour}:${newMinute}`;
			setData(stringifiedData);
		}
	};

	useEffect(() => {
		changeData({});
	}, [dayIndex]);
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<Text style={styles.title}>{strings.day}</Text>
			<View style={styles.top}>
				<TouchableWithoutFeedback
					onPress={() => {
						Animated.timing(animation, {
							toValue: 1 ^ dayIndex
						}).start(() => {
							setDayIndex(1 ^ dayIndex);
						});
					}}
				>
					<Animated.Text
						style={[styles.dayText, { color: reverseColor }]}
					>
						{strings.today}
					</Animated.Text>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={() => {
						Animated.spring(animation, {
							toValue: 1 ^ dayIndex
						}).start(() => {
							setDayIndex(1 ^ dayIndex);
						});
					}}
				>
					<Animated.Text style={[styles.dayText, { color }]}>
						{strings.tomorrow}
					</Animated.Text>
				</TouchableWithoutFeedback>
				<Animated.View style={[styles.indicator, { left }]} />
			</View>
			<Text style={[styles.title, { marginTop: 10 }]}>
				{strings.time}
			</Text>
			<View style={styles.bottom}>
				<View style={styles.pickerWrapper}>
					<Picker
						style={styles.picker}
						selectedValue={pickerData.selectedHour}
						itemStyle={{
							color: "black",
							fontSize: 30,
							fontWeight: "bold"
						}}
						onValueChange={index => {
							changeData({ hour: index });
							setPickerData({
								...pickerData,
								selectedHour: index
							});
						}}
					>
						{pickerData.hourList.map((value, i) => (
							<PickerItem label={value} value={i} key={i} />
						))}
					</Picker>
					<View style={styles.border} />
					<View style={[styles.border, { left: "55%" }]} />
					<Text style={styles.pickerText}>{strings.hours}</Text>
				</View>
				<View style={styles.pickerWrapper}>
					<Picker
						style={styles.picker}
						selectedValue={pickerData.selectedMinute}
						itemStyle={{
							color: "black",
							fontSize: 30,
							fontWeight: "bold"
						}}
						onValueChange={index => {
							changeData({ minute: index });
							setPickerData({
								...pickerData,
								selectedMinute: index
							});
						}}
					>
						{pickerData.minuteList.map((value, i) => (
							<PickerItem
								label={value < 10 ? `0${value}` : value}
								value={i}
								key={i}
							/>
						))}
					</Picker>
					<View style={styles.border} />
					<View style={[styles.border, { left: "45%" }]} />
					<Text style={styles.pickerText}>{strings.minutes}</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 30,
		paddingTop: 20
	},
	border: {
		position: "absolute",
		backgroundColor: colors.darkGray,
		height: 40,
		width: 2,
		borderRadius: 1,
		top: 40
	},
	title: {
		fontSize: 18,
		fontWeight: "bold"
	},
	pickerWrapper: {
		flexDirection: "row",
		paddingHorizontal: 5
	},
	picker: {
		width: 40,
		height: Platform.OS === "android" ? 118 : 30
	},
	pickerText: {
		color: colors.extraGray,
		fontSize: 18,
		bottom: -48,
		left: 10
	},
	top: {
		flexDirection: "row",
		paddingVertical: 20,
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	bottom: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingBottom: 20
	},
	dayText: {
		color: colors.accent,
		fontSize: 20
	},
	indicator: {
		backgroundColor: colors.yellow,
		width: 80,
		height: 3,
		position: "absolute",
		bottom: 10
	}
});

export default WheelPicker;
