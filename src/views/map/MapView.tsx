import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Image,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import customMapStyle from '../../configs/mapConfig.json';
import CustomCard from './CustomCard';
import Header from '../../components/Header';
import {strings} from '../../locales/strings';
import FoundCard from './FoundCard';
import markerIcon from '../../assets/images/marker.png';
import selectedMarker from '../../assets/images/selectedMarker.png';
import ReviewCard from './ReviewCard';
import SafeAreaView from 'react-native-safe-area-view';

interface Region {
  latitude: Number;
  longitude: Number;
  latitudeDelta: Number;
  longitudeDelta: Number;
}

const CustomMap = ({navigation}) => {
  let map;
  const [cardVisible, setCardVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [markers, setmarkers] = useState([
    {
      coordinate: {
        latitude: 41.28959022,
        longitude: 69.1392858,
      },
      title: 'AVTOritet Branch-1',
    },
    {
      coordinate: {
        latitude: 41.26251321,
        longitude: 69.159289,
      },
      title: 'AVTOritet branch-2',
    },
    {
      coordinate: {
        latitude: 41.28651431,
        longitude: 69.199281,
      },
      title: 'AVTOritet branch-3',
    },
  ]);
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
  };
  let onSubmit = () => {
    LayoutAnimation.configureNext({
      duration: 100,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        delay: 100,
        property: LayoutAnimation.Properties.scaleXY,
      },
    });
    setTimeout(() => {
      if (map) {
        map.animateToRegion({
          latitude: 41.2825125,
          longitude: 69.1392828,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
      setCardVisible(!cardVisible);
    }, 800);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 41.2825125,
          longitude: 69.1392828,
          latitudeDelta: 0.8,
          longitudeDelta: 0.5,
        }}
        ref={ref => (map = ref)}
        // customMapStyle={customMapStyle}
        onMapReady={onMapReady}>
        {markers &&
          markers.map((e, i) => {
            return (
              <Marker
                key={i}
                coordinate={e.coordinate}
                title={e.title}
                onPress={() => {
                  map.animateToRegion({
                    ...e.coordinate,
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
      {activeMarker !== -1 && !subscribed && (
        <FoundCard onPress={() => setSubscribed(true)} />
      )}
      {subscribed && (
        <ReviewCard
          navigation={navigation}
          onSubmit={() => setSubscribed(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomMap;
