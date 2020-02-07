import React, { useState, useEffect, useRef } from 'react';
import { Image, LayoutAnimation, Platform, StatusBar, StyleSheet, View, PermissionsAndroid } from 'react-native';
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
  const map = useRef(null);
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
  useEffect(() => {
    requests.main.companies().then(res => {
      setMarkers(res.data.data)
    })
    requestPermissions()
  }, [])
  const [activeMarker, setactiveMarker] = useState(-1);
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

  let drawRoute = () => {
    // setShowRoute(true);
    openInMaps(getCoord(markers[activeMarker]))
  }
  let subscribe = () => {

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
        setMarkers(res.data.data);
      })
      .finally(() => {
        if (map && markers && markers.length > 0) {
          map.current.fitToCoordinates(markers.map(e => (getCoord(e))));
        }
        setCardVisible(false)
      })
  };

  let renderRoute = () => {
    let focus = markers[activeMarker]
    let destination = {};
    destination.longitude = parseFloat(focus.location_lng)
    destination.latitude = parseFloat(focus.location_lat)
    return <MapsWithDirection strokeColor={colors.yellow} strokeWidth={5} apikey={API_KEY} origin={userLocation} destination={destination} />
  }
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
                onPress={() => {
                  map.current.animateToRegion({
                    ...{ latitude: parseFloat(e.location_lat), longitude: parseFloat(e.location_lng) },
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  });
                  setactiveMarker(i);
                  setCardVisible(false);
                }}>
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
          setactiveMarker(-1);
        }}
        isBack={activeMarker !== -1}
      />
      {cardVisible && <CustomCard onSubmit={onSubmit} />}
      {
        activeMarker !== -1 && !subscribed && (
          <FoundCard setShowRoute={drawRoute} current={markers.length > 0 && activeMarker !== -1 ? markers[activeMarker] : null} subscribe={subscribe} />
        )
      }
      {
        subscribed && (
          <ReviewCard
            navigation={navigation}
            onSubmit={() => setSubscribed(false)}
          />
        )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomMap;
