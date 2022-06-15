import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const MapAreaComponents = (props:any) => {
    console.log("MapAreaComponents");
    return (
      <View style={styles.mapLayout}>
        { props.mapIsOpen && (
          <MapView
            style={{...StyleSheet.absoluteFillObject}}
            mapType={props.mapType}
            initialRegion={props.initialRegion}
            onRegionChangeComplete={props.onRegionChange}
          >
          </MapView>
        )}
      </View>
    )
}

export default MapAreaComponents;

const styles = StyleSheet.create({
    mapLayout: {
      width: '100%',
      height: '70%',
    }
})