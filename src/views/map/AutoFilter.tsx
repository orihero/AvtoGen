import React from "react";
import {
	View,
	Text,
	TouchableWithoutFeedback,
	StyleSheet,
	Image,
	Platform,
	Switch
} from "react-native";
import { colors, Icons } from "../../constants";
import DefaultCheckbox from "../../components/common/DefaultCheckbox";
import CheckBox from "@react-native-community/checkbox";

export interface FilterItem {
	name: string;
	icon?: string;
	index?: number;
	isLast?: boolean;
	setActive: Function;
	isActive: boolean;
}

let AutoFilter = ({
	icon,
	name,
	index,
	isLast,
	setActive,
	isActive,
	title,
	service,
	...rest
}: FilterItem) => {
	return (
		<TouchableWithoutFeedback
			key={index}
			onPress={() =>
				service ? setActive(rest.id, !isActive) : setActive(rest.id)
			}
		>
			<View style={[styles.autoFilterContainer]}>
				{icon && <Image source={{ uri: icon }} style={styles.icon} />}
				<View style={styles.fill}>
					<Text
						style={{
							...styles.autoFilterText,
							fontWeight: icon ? "bold" : "100"
						}}
					>
						{name}
						{title}
					</Text>
				</View>
				{service ? (
					Platform.select({
						ios: (
							<Switch
								value={isActive}
								onValueChange={() =>
									setActive(rest.id, !isActive)
								}
							/>
						),
						android: (
							<CheckBox
								value={isActive}
								onValueChange={() =>
									setActive(rest.id, !isActive)
								}
							/>
						)
					})
				) : (
					<DefaultCheckbox
						isActive={isActive}
						setActive={() => {
							setActive(rest.id);
						}}
						{...rest}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};
const styles = StyleSheet.create({
	autoFilterContainer: {
		flexDirection: "row",
		marginHorizontal: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		borderColor: colors.extraGray,
		alignItems: "center"
	},
	autoFilterText: {
		color: colors.accent,
		fontSize: 16
	},
	fill: {
		flex: 1
	},
	icon: {
		width: 36,
		height: 20,
		marginRight: 15
	}
});

export default AutoFilter;
