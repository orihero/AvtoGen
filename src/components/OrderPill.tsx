import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";

import { colors } from "../constants/index";
import Property, { PropertyProps } from "../components/common/Property";
import UserInfo from "../components/common/UserInfo";
import { OrderStatus } from "../views/order";
import { strings } from "../locales/strings";
import RoundButton from "./common/RoundButton";
import { withNavigation } from "react-navigation";
import { NavigationProps } from "../utils/defaultPropTypes";

export interface UserProps {
	name: string;
	phone: string;
	image: string;
}
export interface OrderProps {
	user: UserProps;
	properties: PropertyProps[];
	status?: OrderStatus;
	// item?: OrderItem;
}

export const properties = [
	{
		title: "Дата посещения",
		rightText: "16:35",
		description: "03.12.2019",
	},
	{
		title: "Тип автомобиля",
		icon: "light",
		description: "Легковой",
	},
	{
		title: "Тип услуги",
		description: "Бесконтактная мойка кузова автомобиля, коврики пороги",
	},
	{ title: "Цена уcлуги", price: "40 000 сум" },
];

let { width, height } = Dimensions.get("window");

const OrderPill = ({
	item,
	collapsed,
	navigation,
}: OrderProps & NavigationProps) => {
	let [cardOn, setCardOn] = useState(false);
	useEffect(() => {
		setCardOn(collapsed);
	}, [collapsed]);

	let onStart = () => {
		navigation.navigate("Details", { item });
	};
	return (
		<View
			style={[
				styles.container,
				{
					height: cardOn ? 100 : null,
				},
			]}
		>
			<UserInfo
				user={item.user}
				toggleCard={setCardOn}
				cardVisibility={cardOn}
			/>
			<ScrollView
				style={styles.properties}
				showsVerticalScrollIndicator={false}
			>
				<Property
					title={properties[0].title}
					description={
						typeof item.time === "string" && item.time.split(" ")[0]
					}
					rightText={
						typeof item.time === "string" && item.time.split(" ")[1]
					}
				/>
				<Property
					title={properties[1].title}
					icon={
						!!item && item.car_type && item.car_type.icon
							? item.car_type.icon
							: properties[1].icon
					}
					description={
						item.car_type
							? item.car_type.title
							: properties[1].description
					}
				/>
				{/* <Property
                title={properties[2].title}
                description={properties[2].description}
                /> */}
				<Property
					title={strings.typeOfService}
					description={
						item.booking_services &&
						item.booking_services.reduce((prev, current) => {
							return prev + current.service.title + "\n\n";
						}, "")
					}
				/>
				<View style={styles.row}>
					<Property
						title={properties[3].title}
						price={
							!!item && item.total_cost
								? item.total_cost
								: properties[3].price
						}
					/>
					{item.status === "arrived" && (
						<RoundButton
							fill
							full
							text={strings.start}
							onPress={onStart}
							backgroundColor={colors.yellow}
						/>
					)}
					{item.status === "processing" && (
						<RoundButton
							fill
							full
							text={strings.finish}
							onPress={onStart}
							backgroundColor={colors.yellow}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		borderColor: colors.ultraLightGray,
		borderWidth: 2,
		borderRadius: 15,
		paddingHorizontal: 30,
		paddingVertical: 15,
		marginVertical: 7.5,
		// height: 111,
	},
	indicator: {
		width: 40,
		height: 4,
		borderRadius: 5,
		backgroundColor: colors.ultrLightBlue,
		marginTop: 10,
	},
	properties: {},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default withNavigation(OrderPill);
