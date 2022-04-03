import React, { useState } from 'react';
import Matrix from './components/Matrix'
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
 // Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const POSITION_MAP_X = height * 0.15;

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const App = () => {
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
        </MapView>
      </View>
      <View style={styles.controlerLayout}>
        <View style={{...styles.controlButtons, backgroundColor: 'black'}}><Text style={{textAlign:'center',fontSize: 30, color:'white'}}> + </Text></View>
        <View style={{...styles.controlButtons ,backgroundColor: 'blue'}}><Text style={{textAlign:'center',fontSize: 30, color:'white'}}> - </Text></View>
        <View style={{...styles.controlButtons, backgroundColor: 'gray'}}><Text style={{textAlign:'center',fontSize: 30, color:'white'}}> ← </Text></View>
        <View style={{...styles.controlButtons, backgroundColor: 'gray'}}><Text style={{textAlign:'center',fontSize: 30, color:'white'}}> ↓ </Text></View>
        <View style={{...styles.controlButtons, backgroundColor: 'gray'}}><Text style={{textAlign:'center',fontSize: 30, color:'white'}}> ↑ </Text></View>
        <View style={{...styles.controlButtons, backgroundColor: 'gray'}}><Text style={{textAlign:'center',fontSize: 30, color:'white'}}> → </Text></View>
      </View>
      <View style={styles.overlayMatrix}>
        <Svg height="100%" width="100%" viewBox={"0 0 "+width+" 426"}>
          <Matrix x1="0" y1="0" x2={width} y2={426} divNumX="10" divNumY="10" />
        </Svg>
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
  // GoogleMap表示エリア設定
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
    justifyContent: 'center',
  },

  // オーバーレイ表示テスト
  overlayMatrix: {
    position: 'absolute',
    top: 85,
    left: 0,
    height: 426,
    width: width,
    opacity: 0.4,
    backgroundColor: 'white',
//    borderRadius: 20,
  }
});

export default App;
//export default SvgExample;