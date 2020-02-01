import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-light.png';
import { colors } from '../../constants';
import { strings } from '../../locales/strings';
import { userLoaded } from '../../redux/actions';

const Loader = ({ navigation, userLoaded }) => {
    let bootstrap = async () => {
        let data = await AsyncStorage.getItem('@user');
        if (!data) {
            navigation.navigate('PromptStack')
            return
        }
        let userData = JSON.parse(data);
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
        strings.setLanguage(settings.language);
        userLoaded(userData);
        navigation.navigate('Main')
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
