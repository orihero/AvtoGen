import React from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { commonStyles, colors } from "../../constants/index";

interface RoundInputProps {
	value?: string;
	placeholder: string;
}

const RoundInput = ({ placeholder, onChangeText, value, ...rest }) => {
	return (
		<View style={[commonStyles.shadow, styles.wrapper]}>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={colors.darkGray}
				{...{ onChangeText, ...rest }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 30,
		paddingVertical: Platform.OS === "android" ? 0 : 15,
		borderRadius: 300,
		backgroundColor: colors.white,
		marginHorizontal: 40,
		marginVertical: 8,
		paddingTop: Platform.select({ android: 5, default: 0 })
	}
});

export default RoundInput;
