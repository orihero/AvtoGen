import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	LayoutAnimation,
	Animated,
	Dimensions,
	TextInput,
	Image
} from "react-native";
import { colors } from "../../constants/colors";
import { Icons } from "../../constants/icons";
import RoundButton from "../../components/common/RoundButton";
import { strings } from "../../locales/strings";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Text from "../../components/common/CustomText";
import Rating from "../../components/Rating";
const FoundCard = ({
	subscribe,
	current: parent,
	setShowRoute,
	data,
	buttonsEnabled,
	cancel,
	arrived,
	renderButtons
}) => {
	let current = parent.company ? parent.company : parent;
	let isExpanded = false;
	if (!current) {
		return null;
	}
	const [expanded, setExpanded] = useState(false);
	const [subscribed, setSubscribed] = useState(false);
	let height = new Animated.Value(0);
	let onGestureEvent = Animated.event([
		{
			nativeEvent: {
				translationY: height
			}
		}
	]);
	let onHandlerStateChange = ({ nativeEvent }) => {
		if (nativeEvent.oldState === State.ACTIVE) {
			if (nativeEvent.translationY > 0) {
				Animated.spring(height, { toValue: 300 }).start(() => {
					isExpanded = false;
					height.setOffset(0);
					height.setValue(0);
				});
			} else {
				Animated.spring(height, { toValue: -300 }).start(() => {
					isExpanded = true;
					height.setOffset(-300);
					height.setValue(0);
				});
			}
		}
	};

	let renderContent = () => {
		if (parent.status === "done") {
			return (
				<>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.contentContainer}>
							<View style={styles.iconWrapper}>
								<Icons
									name="check"
									size={40}
									color={colors.white}
									style={{ transform: [{ translateY: 3 }] }}
								/>
							</View>
							<Text style={styles.lightText}>
								{strings.carWash}
							</Text>
							<Text style={styles.nameText}>
								AVTOritet Car-Wash
							</Text>
							<Text style={styles.thanksText}>
								{strings.thanks}
							</Text>
							<Rating
								activeCount={rating}
								setActiveCount={setRating}
								count={5}
							/>
							<Text style={[styles.lightText, { fontSize: 18 }]}>
								{strings.rate}
							</Text>
						</View>
						<View style={styles.commentWrapper}>
							<TextInput
								multiline
								numberOfLines={2}
								placeholder={strings.leaveComment}
							/>
						</View>
					</ScrollView>
					<RoundButton
						fill
						full
						text={strings.rate}
						backgroundColor={colors.yellow}
						onPress={subscribe}
					/>
				</>
			);
		}
		if (!subscribed && current.services) {
			let total = 0;
			let services = current.services.reduce((prev, service) => {
				if (
					data["1"][service.id] &&
					data["0"] === service.car_type_id
				) {
					total += service.price;
					return [...prev, service];
				} else return prev;
			}, []);
			return (
				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					style={{ height: contentHeight, maxHeight: 300 }}
				>
					<View style={styles.content}>
						<View style={styles.borderTop}>
							<Text style={styles.bold}>
								{strings.selectedServices} :
							</Text>
							<View>
								{services.map(e => {
									return (
										<View>
											<Text style={styles.lightText}>
												{e.title}
											</Text>
											<Text
												style={{
													textAlign: "right"
												}}
											>
												{strings.price}: {e.price}{" "}
											</Text>
										</View>
									);
								})}
								<Text
									style={{
										...styles.bold,
										textAlign: "right"
									}}
								>
									{strings.total}: {total}
								</Text>
							</View>
						</View>
						<View style={[styles.borderTop, styles.timeWrapper]}>
							<TouchableWithoutFeedback
								onPress={() => {
									LayoutAnimation.configureNext(
										LayoutAnimation.Presets.easeInEaseOut
									);
									setExpanded(!expanded);
								}}
							>
								<View style={styles.timeHeader}>
									<View style={styles.twoBorder}>
										<Text
											style={[
												styles.timeText,
												styles.bold
											]}
										>
											Суббота
										</Text>
										<Text
											style={[
												styles.timeText,
												styles.bold
											]}
										>
											10:00–22:00
										</Text>
									</View>
									<Icons
										name="down-chevron"
										style={{
											transform: [
												{
													rotate: expanded
														? "180deg"
														: "0deg"
												}
											]
										}}
									/>
								</View>
							</TouchableWithoutFeedback>
							{expanded && (
								<View>
									<View style={styles.twoBorder}>
										<Text style={styles.timeText}>
											Среда
										</Text>
										<Text style={styles.timeText}>
											10:00–22:00
										</Text>
									</View>
									<View style={styles.twoBorder}>
										<Text style={styles.timeText}>
											Четверг
										</Text>
										<Text style={styles.timeText}>
											10:00–22:00
										</Text>
									</View>
									<View style={styles.twoBorder}>
										<Text style={styles.timeText}>
											Пятница
										</Text>
										<Text style={styles.timeText}>
											10:00–22:00
										</Text>
									</View>
									<View style={styles.twoBorder}>
										<Text style={styles.timeText}>
											Суббота
										</Text>
										<Text style={styles.timeText}>
											10:00–22:00
										</Text>
									</View>
									<View style={styles.twoBorder}>
										<Text style={styles.timeText}>
											Воскресенье
										</Text>
										<Text style={styles.timeText}>
											10:00–22:00
										</Text>
									</View>
								</View>
							)}
						</View>
						<View style={styles.borderTop}>
							<Text style={styles.mainText}>Рейтинг 4.5</Text>
						</View>
						{current.features.map((e, i) => {
							return (
								<View style={[styles.row, styles.borderTop]}>
									<Image
										style={styles.featureIcon}
										source={{ uri: e.icon }}
									/>
									<Text style={styles.mainText}>
										{e.title}
									</Text>
								</View>
							);
						})}
					</View>
				</Animated.ScrollView>
			);
		}
	};

	let contentHeight = Animated.subtract(0, height).interpolate({
		inputRange: [0, 550],
		outputRange: [0, 550],
		extrapolate: "clamp"
	});
	let translateY = contentHeight.interpolate({
		inputRange: [0, 80],
		outputRange: [500, -20],
		extrapolate: "clamp"
	});
	return (
		<View>
			<Animated.View>
				<View style={styles.container}>
					<PanGestureHandler
						onGestureEvent={onGestureEvent}
						onHandlerStateChange={onHandlerStateChange}
					>
						<View>
							<View
								style={{
									alignItems: "center"
								}}
							>
								<View style={styles.indicator} />
							</View>
							{!subscribed && (
								<TouchableWithoutFeedback
									onPress={() => {
										if (isExpanded) {
											Animated.spring(height, {
												toValue: 0
											}).start(() => {
												isExpanded = false;
												height.setOffset(0);
												height.setValue(0);
											});
										} else {
											Animated.spring(height, {
												toValue: -300
											}).start(() => {
												isExpanded = true;
												height.setOffset(-300);
												height.setValue(0);
											});
										}
									}}
								>
									<View style={styles.top}>
										<View style={styles.iconWrapper}>
											<Icons name="wash" size={40} />
										</View>
										<View style={styles.titleWrapper}>
											<Text style={styles.title}>
												{current.title}
											</Text>
											<Text style={styles.location}>
												{current.company_address}
											</Text>
											{/* <Text style={styles.title}>{}</Text> */}
										</View>
										<View style={styles.distanceWrapper}>
											<Text style={styles.distance}>
												{/* 1.7 Km */}
											</Text>
										</View>
									</View>
								</TouchableWithoutFeedback>
							)}
						</View>
					</PanGestureHandler>
					{renderContent()}
				</View>
				{renderButtons && (
					<Animated.View
						style={[styles.row, { transform: [{ translateY }] }]}
					>
						<View style={{ flex: 1 }}>
							<RoundButton
								borderColor={colors.black}
								backgroundColor={colors.white}
								fill
								full
								text={strings.route}
								onPress={() => setShowRoute(true)}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<RoundButton
								onPress={!buttonsEnabled ? cancel : subscribe}
								fill
								full
								backgroundColor={colors.yellow}
								text={
									!buttonsEnabled
										? strings.cancel
										: strings.subscribe
								}
							/>
						</View>
					</Animated.View>
				)}
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	featureIcon: {
		width: 20,
		height: 20,
		marginHorizontal: 10
	},
	row: { flexDirection: "row" },
	container: {
		backgroundColor: colors.white,
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		padding: 15,
		paddingHorizontal: 30,
		borderRadius: 30,
		maxHeight: 550
	},
	indicator: {
		width: 40,
		height: 4,
		borderRadius: 5,
		backgroundColor: colors.extraGray,
		margin: 10,
		marginTop: 5
	},
	top: {
		flexDirection: "row",
		paddingBottom: 10
	},
	iconWrapper: {},
	titleWrapper: {
		flex: 1,
		paddingHorizontal: 10,
		justifyContent: "center"
	},
	title: {
		fontSize: 17,
		fontWeight: "bold"
	},
	location: {
		fontSize: 12,
		color: colors.lightGray
	},
	distanceWrapper: {},
	distance: {
		fontSize: 17,
		fontWeight: "bold"
	},
	content: {
		paddingVertical: 15,
		marginBottom: 50
	},
	borderTop: {
		paddingVertical: 12,
		borderTopWidth: 1,
		borderColor: colors.ultraLightGray
	},
	timeHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	mainText: {
		fontSize: 16
	},
	twoBorder: {
		paddingVertical: 7,
		width: 250,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	timeText: {},
	bold: {
		fontWeight: "bold"
	},
	bottom: {
		flexDirection: "row",
		paddingBottom: 10,
		paddingHorizontal: 5
	},
	contentContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	nameText: {
		color: colors.accent,
		fontWeight: "bold",
		fontSize: 22
	},
	reviewIconWrapper: {
		backgroundColor: colors.lightBlue,
		borderRadius: 40,
		width: 64,
		height: 64,
		justifyContent: "center",
		alignItems: "center",
		margin: 30
	},
	lightText: {
		color: colors.lightGray
	},
	thanksText: {
		fontSize: 18,
		color: colors.accent,
		marginVertical: 40
	},
	commentWrapper: {
		borderRadius: 20,
		backgroundColor: colors.white,
		borderColor: colors.extraGray,
		borderWidth: 1,
		padding: 20,
		marginVertical: 30
	}
});

export default FoundCard;
