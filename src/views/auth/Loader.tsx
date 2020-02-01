import React, { useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../../constants';
import logo from '../../assets/images/logo-light.png'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import requests from '../../api/requests';
import { userLoaded } from '../../redux/actions'

const Loader = ({ navigation }) => {
    let bootstrap = async () => {
        let userData = await AsyncStorage.getItem('@user');
        console.warn(userData);
        if (!userData || !userData.token) {
            navigation.navigate('PromptStack')
            return
        }
        let { settings } = userData;
        if (!settings) {
            navigation.navigate('PromptStack')
            return
        }
        
    }
    useEffect(() => {
        bootstrap();
    }, [])
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.accent
    },
    logo: {
        width: 200,
        height: 200 / 1.19,
    },
})

const mapStateToProps = ({ }) => ({

})

const mapDispatchToProps = {
    userLoaded
}


export default connect(mapStateToProps, mapDispatchToProps)(Loader)
