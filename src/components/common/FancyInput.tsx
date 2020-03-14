import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors } from "../../constants";

interface FancyInputProps {
	pattern?: string;
	value: string;
	exceedController?: Function;
}
const FancyInput = ({
	pattern = "+998 | (_  _) _   _  _   _  _   _  _",
	value,
	exceedController
}: FancyInputProps) => {
	const [animation, setAnimation] = useState(new Animated.Value(0));
	let borderColor = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [colors.transparent, colors.white]
	});
	let generateContent = () => {
		let content = [];
		let parts = pattern.split("");
		let temp = "";
		for (let part of parts) {
			if (part === "_") {
				content.push({ type: "text", content: temp });
				content.push({ type: "input" });
				temp = "";
				continue;
			}
			temp += part;
		}
		return content;
	};
	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(animation, { toValue: 1, duration: 200 }),
				Animated.timing(animation, { toValue: 0, duration: 200 })
			])
		).start();
	}, [value]);
	useEffect(() => {
		if (value.length > counter) {
			exceedController(value.substr(0, counter));
		}
	}, [value]);
	let counter = 0;
	let cursorRendered = false;
	return (
		<View style={styles.container}>
			{generateContent().map(({ type, content }) => {
				switch (type) {
					case "text":
						return <Text style={styles.text}>{content}</Text>;
					case "input": {
						counter++;
						let animatedStyle = {
							borderRightWidth: 1,
							borderColor: colors.transparent
						};
						if (!cursorRendered && !value[counter - 1]) {
							cursorRendered = true;
							animatedStyle = { ...animatedStyle, borderColor };
						}
						return (
							<Animated.Text style={[styles.text, animatedStyle]}>
								{value[counter - 1] ? value[counter - 1] : " "}
							</Animated.Text>
						);
					}

					default:
						return null;
				}
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flexDirection: "row" },
	text: {
		color: colors.white,
		fontSize: 18
	}
});

export default FancyInput;
