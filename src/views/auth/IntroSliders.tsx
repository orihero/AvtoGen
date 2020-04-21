import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Dimensions,
	StatusBar,
	Animated
} from "react-native";
import { measures, colors } from "../../constants/index";
import LogoWithText from "../../components/LogoWithText";
import { commonStyles } from "../../constants/commonStyles";
import logo1 from "../../assets/images/first-slider.png";
import logo2 from "../../assets/images/second-slider.png";
import logo3 from "../../assets/images/third-slider.png";
import RoundButton from "../../components/common/RoundButton";
import { strings } from "../../locales/strings";
import CustomMap from "../map/MapView";
import Prompt from "./Prompt";

interface SliderProps {
	sliders: SliderData[];
}
export interface SliderData {
	image: object;
	text: string;
}

interface SliderContentProps {
	slider: SliderData;
	index: number;
	length: number;
	onPress: Function;
}

interface PaginationProps {
	value: Animated.Value;
	count: number;
}

let { width, height } = Dimensions.get("window");

const SliderContent = ({
	slider,
	index,
	length,
	onPress
}: SliderContentProps) => {
	return (
		<View style={styles.contentContainer} key={index}>
			<View style={commonStyles.centeredContainer}>
				<Image style={styles.image} source={slider.image} />
			</View>
			<View
				style={[commonStyles.centeredContainer, styles.textContainer]}
			>
				<LogoWithText />
				<Text style={{ padding: 30, textAlign: "center" }}>
					{slider.text}
				</Text>
			</View>
		</View>
	);
};

const Pagination = ({ value, count }: PaginationProps) => {
	let values = [];
	for (let i = 0; i < count; i++) {
		values[i] = value.interpolate({
			inputRange: [
				(i - 1) * width,
				i * width,
				(i + 1) * width,
				count * width
			],
			outputRange: [1, 1.5, 1, 1],
			extrapolate: "clamp"
		});
	}
	let bottom = value.interpolate({
		inputRange: [-width, width * count - 2, width * count],
		outputRange: [30, 30, -20],
		extrapolate: "clamp"
	});
	return (
		<Animated.View style={[styles.paginationContainer, { bottom }]}>
			{values.map((scale, index) => {
				return (
					<Animated.View
						key={index}
						style={[styles.indicator, { transform: [{ scale }] }]}
					/>
				);
			})}
		</Animated.View>
	);
};

let data = Array<SliderData>();
data.push({ image: logo1, text: "Онлайн поиск автомоек в вашем городе!" });
data.push({
	image: logo2,
	text: "Не стойте в очереди, планируйте свое время и мойку авто с гарантией"
});
data.push({
	image: logo3,
	text: "Пользуйтесь нашим приложением и расскажите друзьям!"
});

const Slider = ({ sliders = data, navigation }: SliderProps) => {
	let value = new Animated.Value(0);
	const [scrollEnabled, setScrollEnabled] = useState(true);
	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				scrollEnabled={scrollEnabled}
				onMomentumScrollEnd={event => {
					setScrollEnabled(
						event.nativeEvent.contentOffset.x !==
							sliders.length * width
					);
				}}
				onScroll={Animated.event([
					{
						nativeEvent: {
							contentOffset: {
								x: value
							}
						}
					}
				])}
				pagingEnabled
			>
				{sliders.map((e, index) => {
					return (
						<SliderContent
							slider={e}
							key={index}
							index={index}
							length={sliders.length}
							onPress={() => {
								navigation.navigate("Prompt");
							}}
						/>
					);
				})}
				<View style={{ width }}>
					<Prompt navigation={navigation} />
				</View>
			</ScrollView>
			<Pagination value={value} count={sliders.length} />
		</View>
	);
};

let imageWidth = width - measures.padding * 2;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		width: imageWidth,
		height: imageWidth / 2.32
	},
	textContainer: {
		justifyContent: "flex-start"
	},
	contentContainer: {
		width,
		height: height - 30
	},
	text: {
		textAlign: "center",
		width: 177,
		paddingTop: 30,
		color: colors.lightGray
	},
	paginationContainer: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "center",
		width
	},
	indicator: {
		borderRadius: 15,
		width: 10,
		height: 10,
		backgroundColor: colors.accent,
		margin: 10
	}
});

export default Slider;
