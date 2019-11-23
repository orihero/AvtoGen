import React, {useState, createRef} from 'react';
import {View, Text, StyleSheet, LayoutAnimation} from 'react-native';
import MapView from 'react-native-maps';
import customMapStyle from '../../configs/mapConfig.json';
import CustomCard from './CustomCard';

interface Region {
  latitude: Number;
  longitude: Number;
  latitudeDelta: Number;
  longitudeDelta: Number;
}

const CustomMap = () => {
  let map;
  const [cardVisible, setCardVisible] = useState(false);
  let onMapReady = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        500,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleXY,
      ),
    );
    LayoutAnimation.configureNext({
      duration: 600,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        delay: 500,
        property: LayoutAnimation.Properties.scaleXY,
      },
    });
    setCardVisible(true);
  };
  let onSubmit = () => {
    // if (map) {
    //   map.animateToRegion({
    //     latitude: 40.78825,
    //     longitude: -80.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   });
    // }
    
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={ref => (map = ref)}
        customMapStyle={customMapStyle}
        onMapReady={onMapReady}
      />
      <CustomCard onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomMap;
