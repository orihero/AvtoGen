import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../constants";

const AutoFilterContainer = ({
	children,
	proceed = index => {},
	childStates,
	parentIndex
}) => {
	const [active, setActive] = useState(parseInt(childStates[parentIndex]));
	let onCheck = (index, isService) => {
		if (!isService) {
			proceed(index);
		}
		setActive(index);
	};
	return React.Children.map(children, (child, index) => {
		return React.cloneElement(child, {
			isActive: active === index,
			setActive: (val, isService) => onCheck(index, isService, val)
		});
	});
};

const styles = StyleSheet.create({
	container: { backgroundColor: colors.white }
});

export default AutoFilterContainer;
