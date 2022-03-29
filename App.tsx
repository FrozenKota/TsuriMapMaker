import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import MapView, {
  Circle,
  Polygon,
  Polyline,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const Overlays = () => {
  const [ mapState, setMapState ] = useState<{
    region: {
      latitude: number,
      longitude: number,
      latitudeDelta: number,
      longitudeDelta: number,
    },
    circle: {
      center: {
        latitude: number,
        longitude: number,
      },
      radius: number,
    },
    polygon: [
      {
        latitude: number,
        longitude: number,
      },
      {
        latitude: number,
        longitude: number,
      },
      {
        latitude: number,
        longitude: number,
      },
    ],
    polyline: [
      {
        latitude: number,
        longitude: number,
      },
      {
        latitude: number,
        longitude: number,
      },
      {
        latitude: number,
        longitude: number,
      },
      {
        latitude: number,
        longitude: number,
      },
    ],
  }>
  ({
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    circle: {
      center: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      radius: 700,
    },
    polygon: [
      {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE + SPACE,
      },
    ],
    polyline: [
      {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE - SPACE,
      },
      {
        latitude: LATITUDE - 2 * SPACE,
        longitude: LONGITUDE + 2 * SPACE,
      },
      {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      {
        latitude: LATITUDE - 2 * SPACE,
        longitude: LONGITUDE - SPACE,
      }
    ]
  })

  return (
    
    <View style={{flex:1}} >
      <View 
        style={{
          backgroundColor: "green",
          height: '15%',
          width: width,
          }}>
        <Text style={styles.menu}
        > Menu(Cancel, Save, Exit)</Text>
        <Text style={styles.menu}>
          睡眠不足
        </Text>
      </View>

      <View 
        style={{
          height: '70%',
          width: '100%',
        }}>
        <MapView
          style={styles.map}
          initialRegion={mapState.region}
          
        >
        <Circle
          center={mapState.circle.center}
          radius={mapState.circle.radius}
          fillColor="rgba(255, 255, 255, 1)"
          strokeColor="rgba(0,0,0,0.5)"
          zIndex={2}
          strokeWidth={2}
        />
        <Polygon
          coordinates={mapState.polygon}
          fillColor="rgba(0, 200, 0, 0.5)"
          strokeColor="rgba(0,0,0,0.5)"
          strokeWidth={2}
        />
        <Polyline
          coordinates={mapState.polyline}
          strokeColor="rgba(0,0,200,0.5)"
          strokeWidth={3}
          lineDashPattern={[5, 2, 3, 2]}
        />
      </MapView>
    </View>
    <View style={{
          backgroundColor: '#1FFFFF',
          height: '15%',
          width: '100%',
          }}>
        <Text style={styles.menu}> Control Buttons  {height}</Text>
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  menu: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapcontroler: {
    color: 'red'
  }
});

export default Overlays;