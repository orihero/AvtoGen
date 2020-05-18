import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Image,
	LayoutAnimation,
	PermissionsAndroid,
	Platform,
	StatusBar,
	StyleSheet,
	View
} from "react-native";
import firebase from "react-native-firebase";
import MapView, { Marker } from "react-native-maps";
import MapsWithDirection from "react-native-maps-directions";
import { connect } from "react-redux";
import requests from "../../api/requests";
import selectedMarker from "../../assets/images/selectedMarker.png";
import RoundButton from "../../components/common/RoundButton";
import Header from "../../components/Header";
import MapMessage from "../../components/MapMessage";
import { colors } from "../../constants";
import { strings } from "../../locales/strings";
import { orderLoaded } from "../../redux/actions";
import { openInMaps } from "../../utils/maps";
import { warnUser } from "../../utils/warn";
import CustomCard from "./CustomCard";
import FoundCard from "./FoundCard";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import LottieView from "lottie-react-native";
import animation from "../../assets/lottie/animation.json";
import {
	PulseIndicator,
	BallIndicator,
	WaveIndicator as Indicator,
	SkypeIndicator,
	UIActivityIndicator
} from "react-native-indicators";

interface Region {
	latitude: Number;
	longitude: Number;
	latitudeDelta: Number;
	longitudeDelta: Number;
}

let API_KEY = "AIzaSyCoMtd7r21tetH1XMUTP9iee4R6qSGbn4k";

let iconSize = Platform.select({ android: 20, ios: 30 });

const CustomMap = ({ navigation, currentOrder, orderLoaded }) => {
	const [cardVisible, setCardVisible] = useState(false);
	let subscribed = currentOrder && currentOrder.status === "new";
	const [markers, setMarkers] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const [showRoute, setShowRoute] = useState(false);
	const [data, setData] = useState({ "0": -1, "1": {}, "2": "" });
	const [message, setMessage] = useState(null);
	const [activeMarker, setactiveMarker] = useState(-1);
	const [loading, setLoading] = useState(false);
	const map = useRef(null);
	const [animation, setAnimation] = useState(new Animated.Value(0));
	useEffect(() => {
		if (currentOrder && currentOrder.status === "done") {
			return;
		}
		requests.main.companies().then(res => {
			setMarkers(res.data.data);
			if (currentOrder) {
				animation.stopAnimation();
				let index = res.data.data.findIndex(
					e => e.id === currentOrder.company.id
				);
				setactiveMarker(index);
				animate();
			}
		});
		requestPermissions();
	}, []);
	useEffect(() => {
		if (currentOrder && currentOrder.status === "done") {
			return;
		}
		if (!!currentOrder) {
			//* Clear all possible animations!
			// setSubscribed(false);
			//* Show accepted message
			setMessage(strings.orderAccepted);
			//* Show the route between agent and user
			setShowRoute(true);
			//* Hide the default search card
			setCardVisible(false);
		}
	}, [currentOrder]);

	let createLocalNotification = minutes => {
		let notification = new firebase.notifications.Notification()
			.setNotificationId(minutes)
			.setTitle(strings.appName)
			.setBody(strings.youAreSubscribed)
			.setData({})
			.android.setChannelId("insider");
		const date = new Date();
		date.setMinutes(date.getMinutes() + minutes);
		firebase.notifications().scheduleNotification(notification, {
			fireDate: date.getTime()
		});
	};

	useEffect(() => {
		if (currentOrder && currentOrder.status === "done") {
			return;
		}
		if (subscribed) {
			let index = markers.findIndex(
				e => e.id === currentOrder.company.id
			);
			setactiveMarker(index);
			setMessage(strings.waiting);
			animate();
		}
	}, [subscribed]);

	let onMapReady = () => {
		if (currentOrder && currentOrder.status === "done") {
			return;
		}
		Geolocation.getCurrentPosition(
			({ coords: { longitude, latitude } }) => {
				setUserLocation({
					longitude,
					latitude
				});
			},
			err => console.warn("REJECTED: ", err)
		);
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				500,
				LayoutAnimation.Types.easeInEaseOut,
				LayoutAnimation.Properties.scaleXY
			)
		);
		if (!currentOrder) {
			setCardVisible(true);
		}
	};

	let requestPermissions = () => {
		if (Platform.OS !== "android") {
			return;
		}

		RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
			interval: 1000,
			fastInterval: 500
		})
			.then(data => {
				Geolocation.getCurrentPosition(
					({ coords: { longitude, latitude } }) => {
						setUserLocation({
							longitude,
							latitude
						});
					},
					err => console.warn("REJECTED: ", err)
				);
				// The user has accepted to enable the location services
				// data can be :
				//  - "already-enabled" if the location services has been already enabled
				//  - "enabled" if user has clicked on OK button in the popup
			})
			.catch(err => {
				// The user has not accepted to enable the location services or something went wrong during the process
				// "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
				// codes :
				//  - ERR00 : The user has clicked on Cancel button in the popup
				//  - ERR01 : If the Settings change are unavailable
				//  - ERR02 : If the popup has failed to open
			});

		PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION")
			.then(res => {})
			.catch(res => {
				console.log("REJECTED: ", res);
			});
	};

	let lottie = React.createRef();

	let drawRoute = () => {
		// setShowRoute(true);
		openInMaps(getCoord(markers[activeMarker]));
	};
	let animate = () => {
		animation.setValue(0);
		Animated.timing(animation, { toValue: 1, duration: 800 }).start(() => {
			animate();
		});
	};

	let rate = async (rating, comment) => {
		try {
			console.log({ rating, comment });

			let res = await requests.main.comment({
				evaluation: rating,
				booking_id: currentOrder.id,
				comment
			});
			console.log(res.data);
			orderLoaded({ name: "current", data: null });
		} catch (error) {}
	};

	let cancel = async () => {
		setMessage(null);
		setShowRoute(false);
		try {
			let response = await requests.main.cancel(currentOrder.id);
			requests.main.companies().then(res => {
				setMarkers(res.data.data);
			});
			setMessage(null);
			setactiveMarker(-1);
			orderLoaded({ name: "current", data: null });
		} catch (error) {
			console.warn(error);
		}
	};

	let subscribe = () => {
		if (typeof data[0] !== "number" || typeof data[1] !== "object") {
			setCardVisible(true);
			setactiveMarker(-1);
			warnUser(strings.selectAuto);
			return;
		}
		let current = markers[activeMarker];
		// let services = Object.keys(data['1']);
		let postData = {
			payment_type: "cash",
			booking_type: "app",
			services: data["1"],
			car_type_id: data["0"],
			company_id: current.id,
			time: data["2"]
		};
		requests.main
			.book(postData)
			.then(res => {
				orderLoaded({ name: "current", data: res.data.data });
			})
			.catch(({ response }) => console.warn(response))
			.finally(() => {});
		setMessage(strings.waiting);
	};

	let arrived = async () => {
		try {
			let response = await requests.main.setBookingState(
				currentOrder.id,
				"arrived"
			);
			console.warn(response);
			orderLoaded({ name: "current", data: response.data.data });
		} catch (error) {
			console.warn(error);
		}
	};

	let renderFoundCard = () => {
		if (subscribed) {
			return (
				<View
					style={{
						position: "absolute",
						bottom: 10,
						alignItems: "center",
						right: 0,
						left: 0
					}}
				>
					<RoundButton
						borderColor={colors.yellow}
						backgroundColor={colors.yellow}
						fill
						full
						text={strings.cancel}
						onPress={cancel}
					/>
				</View>
			);
		}
		let shouldRender =
			(activeMarker !== -1 && !subscribed && !currentOrder) ||
			currentOrder;
		if (shouldRender)
			return (
				<FoundCard
					arrived={arrived}
					cancel={cancel}
					renderButtons={
						!currentOrder || currentOrder.status !== "arrived"
					}
					buttonsEnabled={!currentOrder}
					data={data}
					setShowRoute={drawRoute}
					current={
						markers.length > 0 && activeMarker !== -1
							? markers[activeMarker]
							: currentOrder
					}
					subscribe={subscribe}
					rate={rate}
				/>
			);
		return null;
	};

	let renderRoute = () => {
		let focus = markers[activeMarker] || {
			longitude: parseFloat(currentOrder.company.location_lng),
			latitude: parseFloat(currentOrder.company.location_lat)
		};
		let destination = {};
		destination.longitude = parseFloat(focus.location_lng);
		destination.latitude = parseFloat(focus.location_lat);
		return (
			<MapsWithDirection
				strokeColor={colors.accent}
				strokeWidth={5}
				apikey={API_KEY}
				origin={userLocation}
				destination={destination}
				onError={e => console.warn(e)}
				mode={"DRIVING"}
			/>
		);
	};

	let getCoord = e => {
		return {
			latitude: parseFloat(e.location_lat) || 1,
			longitude: parseFloat(e.location_lng) || 1
		};
	};
	let onSubmit = data => {
		//! Validation
		if (!data["0"]) {
			warnUser(strings.selectAuto);
			return;
		}
		if (Object.keys(data["1"]).length <= 0) {
			warnUser(strings.selectService);
			return;
		}
		if (!data["2"]) {
			warnUser(strings.selectTime);
			return;
		}
		setLoading(true);
		LayoutAnimation.configureNext({
			duration: 100,
			create: {
				type: LayoutAnimation.Types.easeInEaseOut,
				delay: 100,
				property: LayoutAnimation.Properties.scaleXY
			}
		});
		requests.main
			.searchCompanies({ car_type_id: data["0"], services: data["1"] })
			.then(res => {
				if (!res.data.data || res.data.data.length <= 0) {
					return;
				}
				setMarkers(res.data.data);
			})
			.catch(({ response }) => {
				console.warn(response);
			})
			.finally(() => {
				if (
					map &&
					markers &&
					markers.length > 0 &&
					userLocation &&
					!!userLocation.longitude &&
					!!userLocation.latitude
				) {
					map.current.animateToRegion({
						...userLocation,
						latitudeDelta: 0.1,
						longitudeDelta: 0.1
					});
				}
				setCardVisible(false);
				setLoading(false);
			});
	};

	let width = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 80]
	});
	let opacity = animation.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [1, 1, 0],
		extrapolate: "clamp"
	});

	let allFieldsFilled = () => {
		if (data[0] === -1) {
			return false;
		}
		if (Object.keys(data[1]).length <= 0) {
			return false;
		}
		if (data[2] === "") {
			return false;
		}
		return true;
	};

	let renderDefaultMarker = (e, i) => {
		if (Platform.OS === "ios")
			return (
				<Marker
					onPress={() => {
						map.current.animateToRegion({
							...{
								latitude: parseFloat(e.location_lat) || 1,
								longitude: parseFloat(e.location_lng) || 1
							},
							latitudeDelta: 0.1,
							longitudeDelta: 0.1
						});
						if (allFieldsFilled()) {
							setactiveMarker(i);
						}
					}}
					title={e.title}
					coordinate={{
						latitude: parseFloat(e.location_lat) || 1,
						longitude: parseFloat(e.location_lng) || 1
					}}
				>
					<Image
						source={
							activeMarker === i ? selectedMarker : selectedMarker
						}
						style={{
							width: iconSize,
							height:
								activeMarker === i
									? iconSize / 0.83
									: iconSize / 0.75
						}}
					/>
				</Marker>
			);
		return (
			<Marker
				onPress={() => {
					map.current.animateToRegion({
						...{
							latitude: parseFloat(e.location_lat) || 1,
							longitude: parseFloat(e.location_lng) || 1
						},
						latitudeDelta: 0.1,
						longitudeDelta: 0.1
					});
					if (allFieldsFilled()) {
						setactiveMarker(i);
						setCardVisible(false);
					}
				}}
				title={e.title}
				image={activeMarker === i ? selectedMarker : selectedMarker}
				coordinate={{
					latitude: parseFloat(e.location_lat) || 1,
					longitude: parseFloat(e.location_lng) || 1
				}}
			/>
		);
	};

	useEffect(() => {
		if (currentOrder && lottie && lottie.current) {
			lottie.current.play();
		}
	}, [activeMarker]);

	return (
		<View style={styles.container}>
			<MapView
				showsUserLocation
				showsMyLocationButton
				showsScale
				style={styles.container}
				initialRegion={{
					latitude: 41.2825125,
					longitude: 69.1392828,
					latitudeDelta: 0.8,
					longitudeDelta: 0.5
				}}
				ref={ref => (map.current = ref)}
				onMapReady={onMapReady}
			>
				{userLocation && showRoute ? renderRoute() : null}
				{markers &&
					markers.map((e, i) => {
						if (currentOrder && currentOrder.company.id !== e.id) {
							return null;
						}
						if (!subscribed) {
							return renderDefaultMarker(e, i);
						}
						return (
							<Marker
								key={i}
								coordinate={{
									latitude: parseFloat(e.location_lat) || 1,
									longitude: parseFloat(e.location_lng) || 1
								}}
								title={e.title}
								style={{
									overflow: "visible",
									justifyContent: "center",
									width: 120,
									height: 120,
									alignItems: "center"
								}}
								onPress={() => {
									map.current.animateToRegion({
										...{
											latitude:
												parseFloat(e.location_lat) || 1,
											longitude:
												parseFloat(e.location_lng) || 1
										},
										latitudeDelta: 0.1,
										longitudeDelta: 0.1
									});
									if (allFieldsFilled()) {
										setactiveMarker(i);
									}
								}}
							>
								<Indicator size={120} color={colors.yellow} />
								<Image
									source={
										activeMarker === i
											? selectedMarker
											: selectedMarker
									}
									style={{
										width: iconSize,
										height:
											activeMarker === i
												? iconSize / 0.83
												: iconSize / 0.75,
										position: "absolute"
									}}
								/>
							</Marker>
						);
					})}
			</MapView>
			{Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
			<Header
				text={
					cardVisible
						? strings.searchCarWash
						: currentOrder && !subscribed
						? strings.orderAccepted
						: `${strings.found} ${markers.length} ${strings.nearby}`
				}
				menuPress={() => {
					navigation.navigate("Account");
				}}
				backPress={() => {
					setCardVisible(true);
					setactiveMarker(-1);
					setMessage(null);
				}}
				isBack={activeMarker !== -1}
			/>
			{(cardVisible || markers.length <= 0) && !currentOrder && (
				<CustomCard
					data={data}
					loading={loading}
					setData={setData}
					onSubmit={onSubmit}
				/>
			)}
			{renderFoundCard()}
			{message && <MapMessage text={message} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	animationBase: {
		borderRadius: 100,
		borderColor: colors.accent,
		borderWidth: 2
	}
});

const mapStateToProps = ({ order: { current: currentOrder } }) => ({
	currentOrder
});

const mapDispatchToProps = {
	orderLoaded
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomMap);
