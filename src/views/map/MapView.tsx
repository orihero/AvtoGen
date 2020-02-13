import React, { useState, useEffect, useRef } from 'react';
import { Image, LayoutAnimation, Platform, StatusBar, StyleSheet, View, PermissionsAndroid, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import markerIcon from '../../assets/images/marker.png';
import selectedMarker from '../../assets/images/selectedMarker.png';
import Header from '../../components/Header';
import { strings } from '../../locales/strings';
import CustomCard from './CustomCard';
import FoundCard from './FoundCard';
import ReviewCard from './ReviewCard';
import requests from '../../api/requests';
import Geolocation from '@react-native-community/geolocation';
import MapsWithDirection from 'react-native-maps-directions';
import { colors } from '../../constants';
import { openInMaps } from '../../utils/maps';
import MapMessage from '../../components/MapMessage';

interface Region {
    latitude: Number;
    longitude: Number;
    latitudeDelta: Number;
    longitudeDelta: Number;
}

let API_KEY = 'AIzaSyA9lIVEXUvvgivZuVMEasMU_ejHYsdYmHg'

const CustomMap = ({ navigation }) => {
    const [cardVisible, setCardVisible] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [showRoute, setShowRoute] = useState(false)
    const [data, setData] = useState({ '0': -1, '1': {} });
    const [message, setMessage] = useState(null)
    const [activeMarker, setactiveMarker] = useState(-1);

    const map = useRef(null);
    let animation = new Animated.Value(0)

    useEffect(() => {
        requests.main.companies().then(res => {
            setMarkers(res.data.data)
        })
        requestPermissions()
    }, [])

    useEffect(() => {
        if (subscribed)
            animate();
    }, [subscribed])

    let onMapReady = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                500,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.scaleXY,
            ),
        );
        setCardVisible(true);
        Geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
            setUserLocation({ longitude, latitude })
        }, err => console.warn('REJECTED: ', err))
    };

    let requestPermissions = () => {
        if (Platform.OS !== 'android') {
            return;
        }
        PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
            .then(res => {
            }).catch(res => {
                console.warn('REJECTED: ', res);
            })
    }

    let drawRoute = () => {
        // setShowRoute(true);
        openInMaps(getCoord(markers[activeMarker]))
    }
    let animate = () => {
        animation.setValue(0)
        Animated.timing(animation, { toValue: 1, duration: 800 }).start(() => { animate() });
    }


    let subscribe = () => {
        let current = markers[activeMarker];
        // let services = Object.keys(data['1']);
        let postData = { payment_type: 'cash', booking_type: 'app', services: data['1'], car_type_id: data['0'], company_id: current.id };
        console.warn(postData);
        requests.main.book(postData)
            .then((res) => {
                console.warn(res);
            })
            .catch(({ response }) => console.warn(response))
            .finally(() => {

            })
        setMessage(strings.waiting)
        setSubscribed(true);
    }

    let renderRoute = () => {
        let focus = markers[activeMarker]
        let destination = {};
        destination.longitude = parseFloat(focus.location_lng)
        destination.latitude = parseFloat(focus.location_lat)
        return <MapsWithDirection strokeColor={colors.yellow} strokeWidth={5} apikey={API_KEY} origin={userLocation} destination={destination} />
    }

    let getCoord = (e) => {
        return { latitude: parseFloat(e.location_lat), longitude: parseFloat(e.location_lng) }
    }
    let onSubmit = (data) => {
        LayoutAnimation.configureNext({
            duration: 100,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                delay: 100,
                property: LayoutAnimation.Properties.scaleXY,
            },
        });
        requests.main.searchCompanies({ car_type_id: data["0"], services: data["1"] })
            .then(res => {
                console.warn(res.data.data);
                setMarkers(res.data.data);
            })
            .catch(({ response }) => {
                console.warn(response)
            })
            .finally(() => {
                if (map && markers && markers.length > 0) {
                    map.current.fitToCoordinates(markers.map(e => (getCoord(e))));
                }
                setCardVisible(false)
            })
    };

    let width = animation.interpolate({ inputRange: [0, 1], outputRange: [0, 50] });
    let opacity = animation.interpolate({ inputRange: [0, .5, 1], outputRange: [1, 1, 0], extrapolate: 'clamp' });

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
                    longitudeDelta: 0.5,
                }}
                ref={ref => (map.current = ref)}
                // customMapStyle={customMapStyle}
                onMapReady={onMapReady}>
                {userLocation && showRoute ? renderRoute() : null}
                {markers &&
                    markers.map((e, i) => {
                        return (
                            <Marker
                                key={i}
                                coordinate={{ latitude: parseFloat(e.location_lat), longitude: parseFloat(e.location_lng) }}
                                title={e.title}
                                style={{ overflow: 'visible', justifyContent: 'center', width: 60, height: 60, alignItems: 'center' }}
                                onPress={() => {
                                    map.current.animateToRegion({
                                        ...{ latitude: parseFloat(e.location_lat), longitude: parseFloat(e.location_lng) },
                                        latitudeDelta: 0.1,
                                        longitudeDelta: 0.1,
                                    });
                                    setactiveMarker(i);
                                    setCardVisible(false);
                                }}>
                                {activeMarker === i && subscribed && <Animated.View
                                    style={[styles.animationBase, { width, height: width, opacity, position: 'absolute', alignSelf: 'center', }]} />}
                                <Image
                                    source={activeMarker === i ? selectedMarker : markerIcon}
                                    style={{
                                        width: 20,
                                        height: activeMarker === i ? 20 / 0.83 : 20 / 0.75,
                                    }}
                                />
                            </Marker>
                        );
                    })}
            </MapView>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

            <Header
                text={cardVisible ? strings.main : strings.found}
                menuPress={() => {
                    navigation.navigate('Account');
                }}
                backPress={() => {
                    setCardVisible(true);
                    setSubscribed(false)
                    setactiveMarker(-1);
                    setMessage(null)
                }}
                isBack={activeMarker !== -1}
            />
            {
                cardVisible &&
                <CustomCard data={data} setData={setData} onSubmit={onSubmit} />
            }
            {
                activeMarker !== -1 && !subscribed && (
                    <FoundCard data={data} setShowRoute={drawRoute} current={markers.length > 0 && activeMarker !== -1 ? markers[activeMarker] : null} subscribe={subscribe} />
                )
            }
            {/* {
                subscribed && (
                    <ReviewCard
                        navigation={navigation}
                        onSubmit={() => setSubscribed(false)}
                    />
                )
            } */}

            {message && <MapMessage text={message} />}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    animationBase: {
        borderRadius: 100,
        borderColor: colors.accent,
        borderWidth: 2
    },
});

export default CustomMap;
