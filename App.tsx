import React, { useState } from 'react';
import Matrix from './components/Matrix';
import AssetWindow from './components/Asset';
import { StyleSheet, View, Text, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
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
import { numberTypeAnnotation } from '@babel/types';

const { width, height } = Dimensions.get('window');
const POSITION_MAP_X = height * 0.15;

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const App = () => {
  const [ assetIsOpen, setAssetIsOpen ] = useState(false);
  const [ mapState, setMapState ] = useState<{
    region: {
      latitude: number,
      longitude: number,
      latitudeDelta: number,
      longitudeDelta: number,
    },
  }>
  ({
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  })
  const [ glidNumber, setGlidNumber ] = useState(10);
  const [ vertical, setVertical] = useState(1);
  const [ horizontal, setHorizontal] = useState(1);
  const [ currentImageTag, setCurrentImageTag] = useState(-1);

  const countup = () => {
    setGlidNumber(glidNumber + 1);
  }
  const countdown = () => {
    if(glidNumber > 1) setGlidNumber(glidNumber - 1)
    else setGlidNumber(1)
  }
  const moveLeft = () => {
    if(horizontal >= 1) setHorizontal( horizontal - 1 )
    else setHorizontal(0)
  }
  const moveRight = () => {
    setHorizontal(horizontal + 1)
  }
  const moveUp = () => {
    if(vertical > 1) setVertical( vertical - 1)
    else setVertical(0)
  }
  const moveDown = () => {
    setVertical( vertical + 1 )
  }
  
  const assetSelectHandler = () => {
    setAssetIsOpen(true);
  }

  const closeAssetHandler = (imageTag: number) => {
        setAssetIsOpen(false);
        setCurrentImageTag(imageTag);
  //      Alert.alert("Image「"+String(imageTag+"」is Selected"))
  }


  return (
    <View style={styles.mainContainer} >
      <View style={styles.menuLayout}>
        <View style={{...styles.menuButtons, backgroundColor: 'brown'}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={countup}
          >
            <Text> Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            flex:1,
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}
              onPress={countdown}
          >
            <Text> Down</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.menuButtons, backgroundColor: 'green'}}><Text style={{textAlign: 'center', fontSize: 50}}>{glidNumber}</Text></View>
        <View style={{...styles.menuButtons, backgroundColor: 'blue' }}></View>
      </View>
      <View style={styles.mapLayout}>
        <MapView
          style={styles.map}
          initialRegion={mapState.region}
        >
        </MapView>
      </View>

      <TouchableOpacity style={styles.assetButtonLayout} onPress={assetSelectHandler}>
        <Text style={{fontSize: 20, textAlign: 'center'}}> Select Asset </Text>
      </TouchableOpacity>
      
      <View style={styles.controllerLayout}>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'black'}} ><Text style={{fontSize: 50}}> + </Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'blue'}} ><Text style={{fontSize: 50}}> - </Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveLeft}><Text style={{fontSize: 30}}> ← </Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveDown}><Text style={{fontSize: 30}}> ↓ </Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveUp}><Text style={{fontSize: 30}}> ↑ </Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveRight}><Text style={{fontSize: 30}}> → </Text></TouchableOpacity>
      </View>
      
      <Matrix x1="0" y1="0" x2={width} y2={490} divNumX={glidNumber} divNumY={glidNumber} vertical={vertical} horizontal={horizontal} imageTag={currentImageTag}/>

        { assetIsOpen && (
          <AssetWindow rowNum={6} closeAssetHandler={(imageTag:number) => closeAssetHandler(imageTag)}/>
        )}
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
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
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
  controllerLayout: {
    flex: 1,
    flexGrow: 0.1,
    flexDirection: 'row',
  },
  assetButtonLayout: {
    flex: 1,
    flexGrow: 0.05,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'green',
  },
  controlButtons: {
    flex:1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // オーバーレイ表示テスト
  overlayMatrix: {
    position: 'absolute',
    top: 97,
    left: 0,
    height: 493,
    width: width,
    opacity: 0.6,
    backgroundColor: 'black',
  }
});

export default App;
//export default SvgExample;