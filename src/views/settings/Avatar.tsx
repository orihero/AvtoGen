import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableWithoutFeedback
} from "react-native";
import { Icons } from "../../constants/index";
import { colors } from "../../constants/colors";

const Avatar = ({ image, onEdit }) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: image }} />
			<TouchableWithoutFeedback onPress={onEdit}>
				<View style={styles.pen}>
					<Icons name={"pen"} color={colors.accent} size={18} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { justifyContent: "center", alignItems: "center" },
	image: { width: 140, height: 140, borderRadius: 100 },
	pen: {
		backgroundColor: colors.extraGray,
		borderRadius: 40,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		transform: [{ translateX: 40 }, { translateY: -40 }],
		marginBottom: -30
	}
});

export default Avatar;
