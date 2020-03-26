import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Linking
} from "react-native";
import { colors, Icons } from "../../constants";
import { strings } from "../../locales/strings";
import Avatar from "./Avatar";
import { DrawerItem } from "../../components/DrawerContent";
import MenuItem from "./MenuItem";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import requests from "../../api/requests";
import { userLoggedIn, userLoggedOut } from "../../redux/actions";

const Account = ({ navigation, user, userLoggedIn, userLoggedOut }) => {
	useEffect(() => {
		requests.user.show().then(res => {
			userLoggedIn(res.data.data);
		});
	}, []);

	let logout = () => {
		userLoggedOut();
		navigation.navigate("Login");
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<View style={styles.userInfo}>
						<Avatar image={user.avatar} />
						<Text style={styles.nameText}>{user.name}</Text>
					</View>
					<View style={styles.contact}>
						<View>
							<Icons
								name={"phone"}
								size={18}
								color={colors.darkGray}
								style={{
									paddingHorizontal: 8,
									marginBottom: 2.2
								}}
							/>
							<Text
								style={{
									color: colors.darkGray,
									fontSize: 16,
									fontWeight: "bold",
									marginHorizontal: 8
								}}
							>
								ID
							</Text>
						</View>
						<View>
							<Text
								style={{
									color: colors.darkGray,
									fontSize: 16
								}}
							>
								+{user.phone}
							</Text>
							<Text
								style={{ color: colors.darkGray, fontSize: 16 }}
							>
								{user.user_id}
							</Text>
						</View>
					</View>
				</View>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<MenuItem
						text={strings.myOrders}
						iconName="list"
						onPress={() => navigation.navigate("History")}
					/>
					<MenuItem
						text={strings.call}
						iconName={"headphone"}
						onPress={() => Linking.openURL("tel://+998998970597")}
					/>
					<MenuItem
						text={strings.settings}
						iconName={"gear"}
						onPress={() => navigation.navigate("Settings")}
					/>
				</View>
			</View>
			<View style={styles.footer}>
				<DrawerItem
					text={strings.exit}
					onPress={logout}
					iconName={"logout"}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flex: 1,
		paddingHorizontal: 30
	},
	contact: {
		flexDirection: "row",
		justifyContent: "center"
	},
	userInfo: { justifyContent: "center", alignItems: "center" },
	footer: {},
	content: {
		flex: 1,
		justifyContent: "space-around"
	},
	nameText: {
		fontSize: 20,
		color: colors.darkGray
	}
});

const mapStateToProps = ({ user }) => ({
	user
});

const mapDispatchToProps = {
	userLoggedIn,
	userLoggedOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
