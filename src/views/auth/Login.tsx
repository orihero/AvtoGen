import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View, Linking } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import requests from "../../api/requests";
import logo from "../../assets/images/logo.png";
import Text from "../../components/common/CustomText";
import { colors } from "../../constants";
import { strings } from "../../locales/strings";
import { userLoggedIn } from "../../redux/actions";
import RoundButton from "../../components/common/RoundButton";
import NotificationService from "../../utils/NotificationService";

let buttons = [
	Array.from({ length: 3 }, (v, k) => k + 1),
	Array.from({ length: 3 }, (v, k) => k + 1),
	Array.from({ length: 3 }, (v, k) => k + 1)
];

let { width } = Dimensions.get("window");

const Login = ({ navigation, userLoggedIn }) => {
	const [value, setvalue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [counter, setCounter] = useState(60);
	const [error, setError] = useState("");
	const [data, setData] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	let count = 0;

	let onPhoneFocus = () => {
		setvalue("+998");
	};

	let getCode = () => {
		if (value.length < 9) {
			setError(strings.fillAllFields);
			return;
		}
		requests.auth
			.login({ phone: value.substr(1, value.length) })
			.then(res => {
				setData(res.data.data);
			})
			.catch(res => {
				if (!res.response) {
					console.log(res);
					setError(strings.connectionError);
					return;
				}
				let { response } = res;
				if (response.data) {
					setError(
						response.data.message
							? response.data.message
							: strings.somethingWentWrong
					);
					return;
				}
				setError(strings.somethingWentWrong);
			});
		setConfirmed(!confirmed);
	};

	let confirmCode = async () => {
		if (code.length < 5) {
			setError(strings.fillAllFields);
			return;
		}
		setLoading(true);
		try {
			let res = await requests.auth.verifyCode(data.user_id, {
				code
			});
			userLoggedIn(res.data.data);
			NotificationService.init();
			let tempToken = await NotificationService.getFcmToken();
			if (tempToken) {
				try {
					let r = await requests.profile.setToken({
						fcm_token: tempToken
					});
				} catch (error) {
					console.log(error);
				}
			}
			navigation.navigate("SelectLanguage");
		} catch (res) {
			console.log(res);

			if (!res.response) {
				setError(strings.connectionError);
				return;
			}
			let { response } = res;
			if (response.data) {
				setError(
					response.data.message
						? response.data.message
						: strings.somethingWentWrong
				);
				return;
			}
			setError(strings.somethingWentWrong);
		} finally {
			setLoading(false);
		}
		// requests.auth
		// 	.verifyCode(data.user_id, { code })
		// 	.then(res => {
		// 		userLoggedIn(res.data.data);
		// 		NotificationService.init();
		// 		let tempToken = await NotificationService.getFcmToken();
		// 		if (tempToken) {
		// 			try {
		// 				let res = await requests.profile.setToken({
		// 					fcm_token: tempToken
		// 				});
		// 			} catch (error) {
		// 				console.warn(error.response);
		// 				navigation.navigate("PromptStack");
		// 				return;
		// 			}
		// 		}
		// 		navigation.navigate("SelectLanguage");
		// 	})
		// 	.catch(res => {
		// 		console.warn(res.response);
		// 		if (!res.response) {
		// 			console.warn(res.response);
		// 			setError(strings.connectionError);
		// 			return;
		// 		}
		// 		let { response } = res;
		// 		if (response.data) {
		// 			setError(
		// 				response.data.message
		// 					? response.data.message
		// 					: strings.somethingWentWrong
		// 			);
		// 			return;
		// 		}
		// 		setError(strings.somethingWentWrong);
		// 	})
		// 	.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (error !== "") {
			setError("");
		}
	}, [value, code]);
	useEffect(() => {
		if (confirmed) {
			const timer = window.setInterval(() => {
				setCounter(counter - 1); // <-- Change this line!
				if (counter <= 0) {
					setCounter(0);
					setConfirmed(false);
					window.clearInterval(timer);
					return;
				}
			}, 1000);
			return () => {
				window.clearInterval(timer);
			};
		} else {
			setCounter(60);
		}
	});

	let validInputs = value.length >= 13 || confirmed;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.centeredFlex}>
				<Image source={logo} style={styles.logo} />
			</View>
			<View style={[styles.centeredFlex, { width }]}>
				<TextInput
					style={styles.phoneInput}
					placeholder={
						!confirmed
							? strings.enterPhoneNumber
							: strings.confirmCode
					}
					maxLength={13}
					onFocus={onPhoneFocus}
					value={!confirmed ? value : code}
					keyboardType={"phone-pad"}
					onChangeText={e => {
						if (confirmed) {
							setCode(e);
							return;
						}
						if (value === "+998" && e.length < value.length) {
							return;
						}
						setvalue(e);
					}}
				/>
				{confirmed ? (
					<Text style={styles.text}>
						{strings.canClaimCodeIn}
						{` ${counter}`}
					</Text>
				) : null}
				{error ? <Text style={styles.dangerText}>{error}</Text> : null}
			</View>
			<View style={styles.flexSpaced}>
				<View
					style={{
						flexDirection: "row",
						padding: 30,
						flexShrink: 1,
						flexWrap: "wrap"
					}}
				>
					<Text style={styles.agreementText}>
						{strings.acceptAgreement}{" "}
						<Text
							style={{
								color: colors.black,
								textAlign: "center",
								fontWeight: "bold"
							}}
							onPress={() =>
								Linking.openURL("https://avtogen.uz")
							}
						>
							{strings.pravicyAgreemnt}
						</Text>
					</Text>
				</View>
				<RoundButton
					backgroundColor={
						validInputs ? colors.accent : colors.extraGray
					}
					fill
					text={strings.continue}
					textColor={validInputs ? colors.white : colors.accent}
					full
					loading={loading}
					big
					onPress={!confirmed ? getCode : confirmCode}
					disabled={!validInputs}
				/>
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
	userLoggedIn
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
	agreementText: {
		textAlign: "center"
	},
	centeredFlex: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	logo: {
		width: 150,
		height: 150 / 1.24
	},
	flexSpaced: {
		justifyContent: "space-between",
		flex: 1,
		alignItems: "center"
	},
	phoneInput: {
		borderBottomWidth: 1,
		width: width - 130,
		fontSize: 18,
		textAlign: "center"
	},
	appName: {
		color: colors.white,
		fontSize: 40
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		backgroundColor: colors.white
	},
	inputWrapper: {
		borderWidth: 1,
		borderColor: colors.white,
		borderRadius: 250,
		padding: 15,
		margin: 15,
		marginBottom: 0,
		width: Dimensions.get("window").width - 60,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10
	},
	buttonsContainer: {
		// flex: 1,
		// justifyContent: 'space-between',
	},
	squareButtonContainer: {
		borderRadius: 8,
		width: 72,
		height: 72,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		margin: 8
	},
	infoWrapper: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 5
	},
	row: {
		flexDirection: "row",
		marginHorizontal: 5,
		justifyContent: "flex-end"
	},
	buttonText: {
		fontSize: 22,
		color: colors.accent,
		fontWeight: "bold"
	},
	text: {
		color: colors.accent,
		textAlign: "center",
		margin: 5,
		marginHorizontal: -30,
		fontWeight: "100"
	},
	dangerText: {
		color: colors.red,
		textAlign: "center",
		margin: 5
	}
});

/*
<View style={styles.infoWrapper}>
				<Text style={styles.appName}>AvtoGen</Text>
				<Text style={styles.text}>
					{confirmed ? strings.confirmCode : strings.enterPhoneNumber}
				</Text>
				<Text style={styles.dangerText}>{error}</Text>
				<View
					style={[
						styles.inputWrapper,
						!confirmed && { justifyContent: "center" }
					]}
				>
					<FancyInput
						value={confirmed ? code : value}
						exceedController={setvalue}
						pattern={
							confirmed
								? "_ _ _ _ _"
								: "+998 (_ _) _ _ _  _ _  _ _"
						}
					/>
					{confirmed && (
						<Text
							style={{ color: colors.white }}
						>{`${counter} ${strings.second}`}</Text>
					)}
				</View>
			</View>
			<View style={styles.buttonsContainer}>
				<View>
					{buttons.map((e, i) => {
						return (
							<View style={styles.row}>
								{e.map((el, index) => {
									count++;
									return (
										<TouchableWithoutFeedback
											onPress={() =>
												confirmed
													? setCode(
															code +
																(
																	i * 3 +
																	index +
																	1
																).toString()
													  )
													: setvalue(
															value +
																(
																	i * 3 +
																	index +
																	1
																).toString()
													  )
											}
										>
											<View
												style={
													styles.squareButtonContainer
												}
											>
												<Text style={styles.buttonText}>
													{count}
												</Text>
											</View>
										</TouchableWithoutFeedback>
									);
								})}
							</View>
						);
					})}
					<View style={styles.row}>
						<TouchableWithoutFeedback
							onPress={() =>
								confirmed
									? setCode(code + "0")
									: setvalue(value + "0")
							}
						>
							<View style={styles.squareButtonContainer}>
								<Text style={styles.buttonText}>0</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							onPress={() =>
								confirmed
									? setCode(code.substr(0, code.length - 1))
									: setvalue(
											value.substr(0, value.length - 1)
									  )
							}
						>
							<View
								style={{
									justifyContent: "center",
									alignItems: "center",
									width: 72,
									height: 72,
									margin: 8
								}}
							>
								<Icons
									name="delete"
									size={40}
									color={colors.white}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
				<RoundButton
					text={confirmed ? strings.confirm : strings.continue}
					fill
					full
					loading={loading}
					backgroundColor={colors.white}
					onPress={() => {
						if (confirmed) {
							confirmCode();
						} else {
							getCode();
						}
					}}
				/>
			</View>
		 */
