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
    <View style={styles.mainContainer} >
      <View style={styles.menuContainer}>
      </View>
      <View style={styles.mapContainer}>
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
      <View style={styles.controlerContainer}>
        <Text> Test </Text>
      </View>
    </View> // Container
  )
}


const styles = StyleSheet.create({
  // 親コンテナ
  mainContainer: {
    flex: 1,
  },
  // メニュー（戻る、保存など）
  menuContainer: {
    flex: 1,
    flexGrow: 0.15,
    backgroundColor: 'green',
  },
  menuLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuButtons: {
    fontSize: 18,
  },
  //　GoogleMap表示エリア設定
  mapContainer: {
    flex: 1,
    flexGrow: 0.7,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // コントロールボタン配置エリア
  controlerContainer: {
    flex: 1,
    flexGrow: 0.15,
    backgroundColor: 'red',
  },
  controlerLayout:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  controlButtons: {
    flex: 1,
  }
});
export default Overlays;