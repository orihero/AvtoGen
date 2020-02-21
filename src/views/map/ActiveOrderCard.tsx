import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import UserInfo from '../../components/common/UserInfo'
import { colors } from '../../constants';

const ActiveOrderCard = ({ order }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <UserInfo user={order.company} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
    },
    wrapper: {
        margin: 15,
        borderRadius: 15,
        backgroundColor: colors.white,
        padding: 15
    }
})


export default ActiveOrderCard
