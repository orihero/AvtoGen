import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { commonStyles, colors } from "../../constants";
import RoundInput from "../../components/common/RoundInput";
import { strings } from "../../locales/strings";
import RoundButton from "../../components/common/RoundButton";
import requests from "../../api/requests";
import { connect } from "react-redux";
import { userLoggedIn } from "../../redux/actions";

const SelectLanguage = ({ navigation, userLoggedIn }) => {
	let user = navigation.getParam("user");
	let proceed = () => {
		if (user) {
			navigation.navigate("Account");
			return;
		}

		navigation.navigate("CustomMap");
	};
	let update = () => {
		requests.user
			.update({ name: data.name + " " + data.surname })
			.then(res => {
				userLoggedIn(res.data.data);
				navigation.navigate("CustomMap");
			})
			.catch(res => {
				console.warn(res.response);
			});
	};
	let initials = user.name.split(" ");
	console.log({ initials });

	const [data, setData] = useState({
		name: initials[0] || "",
		surname: initials[1] || ""
	});
	return (
		<View style={[styles.container]}>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<RoundInput
					onChangeText={e => setData({ ...data, name: e })}
					placeholder={strings.name}
					value={data.name}
				/>
				<RoundInput
					onChangeText={e => setData({ ...data, surname: e })}
					placeholder={strings.surname}
					value={data.surname}
				/>
			</View>
			<View style={styles.row}>
				<RoundButton
					full
					onPress={proceed}
					fill
					flex
					backgroundColor={colors.ultraLightGray}
					borderColor={colors.lightGray}
					text={strings.skip}
				/>
				<RoundButton
					flex
					onPress={update}
					full
					fill
					textColor={colors.white}
					backgroundColor={colors.accent}
					text={strings.next}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		backgroundColor: colors.ultraLightGray,
		flex: 1,
		paddingVertical: 30
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
	userLoggedIn
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectLanguage);
