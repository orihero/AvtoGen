import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-light.png';
import { colors } from '../../constants';
import { strings } from '../../locales/strings';
import { userLoaded, orderLoaded } from '../../redux/actions';
import NotificationService from '../../utils/NotificationService';
import requests from '../../api/requests';

const Loader = ({ navigation, userLoaded, orderLoaded }) => {
    let bootstrap = async () => {
        let data = await AsyncStorage.getItem('@user');
        if (!data) {
            navigation.navigate('PromptStack')
            return
        }
        let userData = JSON.parse(data);
        if (!userData || !userData.token) {
            navigation.navigate('PromptStack')
            return
        }
        let { settings } = userData;
        if (!settings) {
            navigation.navigate('PromptStack')
            return
        }
        strings.setLanguage(settings.language);
        userLoaded(userData);
        if (!userData.name) {
            navigation.navigate('FillInfo')
        } else {
            //notification
            NotificationService.init();
            let tempToken = await NotificationService.getFcmToken()
            if (tempToken) {
                try {
                    let res = await requests.profile.setToken({ fcm_token: tempToken })
                } catch (error) {
                    console.warn(error.response);
                    navigation.navigate('PromptStack')
                    return
                }
            }
            //* Check if the user has the active booking
            try {
                let res = await requests.main.books('accepted');
                // console.warn("CURRENT ORDER", res.data, res.data.data.length > 0);
                if (res.data.data.length > 0) {
                    orderLoaded({ name: 'current', data: res.data.data[0] })
                }
            } catch (error) {
                console.warn(error.response);
            }
            navigation.navigate('Main')
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
    userLoaded,
    orderLoaded
}


export default connect(mapStateToProps, mapDispatchToProps)(Loader)
