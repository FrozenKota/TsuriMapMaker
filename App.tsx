import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import MapView, {
  Circle,
  Polygon,
  Polyline,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const POSITION_MAP_X = height * 0.15;

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
      <View style={styles.menuLayout}>
        <View style={{...styles.menuButtons, backgroundColor: 'red'  }}></View>
        <View style={{...styles.menuButtons, backgroundColor: 'green'}}></View>
        <View style={{...styles.menuButtons, backgroundColor: 'blue' }}></View>
      </View>
      <View style={styles.mapLayout}>
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
      <View style={styles.controlerLayout}>
        <View style={{...styles.controlButtons, backgroundColor: 'red'}}></View>
        <View style={{...styles.controlButtons ,backgroundColor: 'green'}}></View>
        <View style={{...styles.controlButtons, backgroundColor: 'blue'}}></View>
        <View style={{...styles.controlButtons, backgroundColor: 'gray'}}></View>
        <View style={{...styles.controlButtons, backgroundColor: 'purple'}}></View>
        <View style={{...styles.controlButtons, backgroundColor: 'yellow'}}></View>
      </View>
      <View style={styles.overlayTest}>
          <Text style={{fontSize: 20}}> オーバーレイ表示テスト. position = absolute </Text>
          <Text style={{fontSize: 30}}>開始位置が少しずれてるのはなんでなん</Text>
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
  menuLayout: {
    flex: 1,
    flexGrow: 0.15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  menuButtons: {
    flex: 1,
    borderRadius: 18,
  },
  //　GoogleMap表示エリア設定
  mapLayout: {
    flex: 1,
    flexGrow: 0.75,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // コントロールボタン配置エリア
  controlerLayout: {
    flex: 1,
    flexGrow: 0.10,
    flexDirection: 'row',
  },
  controlButtons: {
    flex: 1,
    borderRadius: 15,
  },
  overlayTest: {
    position: 'absolute',
    top: height * 0.15,
    left: (width - 200) / 2,
    height: height * 0.75,
    width: 200,
    opacity: 0.6,
    backgroundColor: 'pink',
    borderRadius: 20,
  }
});
export default Overlays;