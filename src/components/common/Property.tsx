import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { colors, Icons } from "../../constants";
import Text from "./CustomText";

export interface PropertyProps {
	title: string;
	description?: string;
	icon?: string;
	rightText?: string;
	price?: string;
}

const Property = ({
	title,
	description,
	icon,
	rightText,
	price
}: PropertyProps) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.titleText}>{title}</Text>
				{!price && !rightText && (
					<Text style={styles.descriptionText}>{description}</Text>
				)}
				{typeof price !== "undefined" ? (
					<Text
						style={{
							...styles.rightText,
							fontSize: 20,
							fontWeight: "900"
						}}
					>
						{price}
					</Text>
				) : (
					<></>
				)}
			</View>
			<View style={styles.right}>
				{icon && (
					<Image
						source={{ uri: icon }}
						style={{ width: 40, height: 22.4 }}
					/>
				)}
				{rightText ? (
					<Text style={styles.rightText}>{rightText}</Text>
				) : (
					<></>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1,
		borderColor: colors.extraGray,
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10
	},
	titleText: {
		fontSize: 18,
		color: colors.accent,
		fontWeight: "400",
		marginVertical: 6
	},
	descriptionText: {
		color: colors.lightGray,
		fontSize: 14,
		fontWeight: "100"
		// marginVertical: 10,
	},
	right: {
		justifyContent: "flex-end"
	},
	rightText: {
		color: colors.accent,
		fontSize: 18,
		fontWeight: "bold"
	}
});

export default Property;
