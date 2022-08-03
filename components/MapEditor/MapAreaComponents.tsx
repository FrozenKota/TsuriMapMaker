import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const MapAreaComponents = (props: {initialRegion: any, onRegionChange:any, mapType: any, mapIsOpen: any, scrollIsEnabled: boolean, zoomIsEnabled: boolean}) => {
    console.log("MapAreaComponents");

    const {mapType, initialRegion, onRegionChange, scrollIsEnabled, zoomIsEnabled} = props;

    return (
      <View style={styles.mapLayout}>
        { props.mapIsOpen && (
          <MapView
            style={{...StyleSheet.absoluteFillObject}}
            mapType={mapType}
            initialRegion={initialRegion}
            onRegionChangeComplete={onRegionChange}
            scrollEnabled={scrollIsEnabled}
            zoomEnabled={zoomIsEnabled}
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