import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, UIManager, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';
import AppRouter from './src/routes/AppRouter';
import { configureAxios } from './src/api/requests';
import NotificationService, { NotificationActionTypes } from './src/utils/NotificationService'

const App = () => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);
    let store = configureStore();
    configureAxios(store)
    NotificationService.setState(store);
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
