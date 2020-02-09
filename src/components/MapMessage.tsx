import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../constants'

const MapMessage = ({ text }) => {
    return (
        <View style={styles.messageContainer}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        borderRadius: 15,
        padding: 10,
        top: 100,
        alignSelf: 'center'
    },
    text: {
        color: colors.darkGray
    }
})


export default MapMessage
