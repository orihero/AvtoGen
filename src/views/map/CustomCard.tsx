import React, { useEffect, useState } from "react";
import {
	Animated,
	Dimensions,
	LayoutAnimation,
	StyleSheet,
	View
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import requests from "../../api/requests";
import AnimatedButton from "../../components/common/AnimatedButton";
import Text from "../../components/common/CustomText";
import RoundCheckbox, {
	RoundCheckboxProps
} from "../../components/common/RoundCheckbox";
import { colors } from "../../constants/index";
import { strings } from "../../locales/strings";
import { FilterItem } from "./AutoFilter";
import CardContent from "./CardContent";
import { warnUser } from "src/utils/warn";

interface FilterData {
	data: Array<FilterItem> | number;
	title: string;
}

let checkboxes = Array<RoundCheckboxProps & FilterData>();
checkboxes = [
	{
		backgroundColor: colors.ultraLightGray,
		icon: "path-18",
		color: colors.accent,
		activeBackColor: colors.accent,
		activeColor: colors.white,
		size: 20,
		data: [
			{ icon: "light", name: "Легковая" },
			{ icon: "jeep", name: "Джип" },
			{ icon: "miniven", name: "Минивен" },
			{ icon: "heavy", name: "Грузовая" }
		],
		title: strings.selectAuto,
		carType: true
	},
	{
		backgroundColor: colors.ultraLightGray,
		icon: "service",
		color: colors.accent,
		activeBackColor: colors.accent,
		activeColor: colors.white,
		size: 24,
		data: [
			{
				name: "Бесконтактная мойка кузова автомобиля, коврики пороги"
			},
			{
				name:
					"Чистка салона пылесосом и влажная уборка пластмассовых деталей"
			},
			{
				name: "Чистка стекол изнутри химическими средствами"
			},
			{
				name:
					"Полировка пластмассовых деталей салона химическими средствами"
			},
			{
				name: "Мойка двигателя и моторного отсека, продувка"
			},
			{
				name: "Мойка двигателя и моторного отсека, продувка"
			}
		],
		title: strings.selectService,
		service: true
	},
	{
		backgroundColor: colors.ultraLightGray,
		icon: "time",
		color: colors.accent,
		activeBackColor: colors.accent,
		activeColor: colors.white,
		size: 28,
		data: 1,
		title: strings.selectTime
	}
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

const CustomCard = ({ onSubmit, data, setData, loading }: CustomCardProps) => {
	const [active, setActive] = useState(0);
	const [childStates, setChildStates] = useState("100");
	const [services, setServices] = useState([]);
	const [carTypes, setCarTypes] = useState([]);

	const [progress, setProgress] = useState(new Animated.Value(0));
	const [allFieldsFilled, setAllFieldsFilled] = useState(false);

	useEffect(() => {
		let process = 1;

		if (data[0] === -1) {
			process -= 0.33;
		}
		if (Object.keys(data[1]).length <= 0) {
			process -= 0.33;
		}
		if (data[2] === "") {
			process -= 0.34;
		}
		Animated.spring(progress, { toValue: process }).start();
		if (process === 1) {
			setAllFieldsFilled(true);
		}
	}, [data]);

	let animation = new Animated.Value(0);
	let scroll;
	useEffect(() => {
		requests.main.services().then(res => {
			setServices(res.data.data);
		});
		requests.main
			.carTypes()
			.then(res => {
				setCarTypes(res.data.data);
			})
			.catch(res => {
				console.warn(res.response);
			});
	}, []);
	useEffect(() => {
		setTimeout(() => {
			if (scroll && scroll._component) {
				scroll._component.scrollTo({
					x: active * Dimensions.get("window").width
				});
			}
		}, 200);
	}, [active]);
	const selectFilter = index => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setActive(active === index ? -1 : index);
	};
	//When option is selected
	let proceed = val => {
		let newActive = active + 1;
		if (data[0] === -1) {
			newActive = 0;
			scrollTo(newActive, val);
			return;
		}
		if (Object.keys(data[1]).length <= 0) {
			newActive = 1;
			scrollTo(newActive, val);
			return;
		}
		if (data[2] === "") {
			newActive = 2;
			scrollTo(newActive, val);
			return;
		}
		if (newActive === checkboxes.length) {
			//start loading
			return;
		}
		scrollTo(newActive, val);
	};
	let scrollTo = (newActive, val) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setActive(newActive);
		setChildStates(changeValueAt(childStates, val, active));
	};
	//Pangesture handler scroll event
	let onScroll = Animated.event([
		{
			nativeEvent: {
				contentOffset: {
					x: animation
				}
			}
		}
	]);
	let wHeight = 300;
	let height = new Animated.Value(-wHeight);
	let onGestureEvent = Animated.event([
		{
			nativeEvent: {
				translationY: height
			}
		}
	]);
	let onHandlerStateChange = ({ nativeEvent }) => {
		if (nativeEvent.oldState === State.ACTIVE) {
			if (nativeEvent.translationY < 0) {
				Animated.spring(height, { toValue: -wHeight }).start(() => {
					// isExpanded = true;
					height.setOffset(-wHeight);
					height.setValue(0);
				});
			} else {
				Animated.spring(height, { toValue: wHeight }).start(() => {
					// isExpanded = false;
					height.setOffset(0);
					height.setValue(0);
				});
			}
		}
	};
	let contentHeight = Animated.subtract(0, height).interpolate({
		inputRange: [0, wHeight],
		outputRange: [0, wHeight],
		extrapolate: "clamp"
	});

	let shouldRender = active !== -1 && checkboxes[active];
	return (
		<Animated.View style={[styles.card]}>
			{shouldRender && checkboxes[active].data && (
				<View style={styles.dataWrapper}>
					<PanGestureHandler
						onGestureEvent={onGestureEvent}
						onHandlerStateChange={onHandlerStateChange}
					>
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
								services,
								carTypes,
								data,
								setData
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
					onPress={
						allFieldsFilled
							? () => onSubmit(data)
							: () => proceed(active + 1)
					}
					backgroundColor={colors.extraGray}
					borderColor={colors.extraGray}
					text={!allFieldsFilled ? strings.next : strings.findCarWash}
					fill
					full
					loading={loading}
					progress={progress}
					progressColor={colors.yellow}
					borderRadius={45}
				/>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	checkboxIndicator: {
		position: "absolute",
		width: 70,
		height: 70,
		borderRadius: 40,
		marginVertical: 15
	},
	initialWrapper: {
		paddingHorizontal: 30,
		paddingBottom: 10
	},
	fill: {
		flex: 1
	},
	card: {
		overflow: "hidden",
		margin: 15,
		backgroundColor: colors.white,
		// padding: 10,
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		borderRadius: 40,
		maxHeight: 550
	},
	servicesContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 15
	},
	filterWrapper: {
		borderColor: colors.lightGray,
		maxHeight: 250,
		paddingHorizontal: 10
	},
	dataWrapper: {},
	cardHeader: {
		backgroundColor: colors.ultraLightGray,
		alignItems: "center",
		padding: 10,
		flex: 1
	},
	cardHeaderText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.accent,
		textAlign: "center"
	},
	indicator: {
		width: 40,
		height: 4,
		borderRadius: 5,
		backgroundColor: colors.extraGray,
		margin: 10,
		marginTop: 5
	}
});

export default CustomCard;
