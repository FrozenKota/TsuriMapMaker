import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Dimensions, Alert, Image} from 'react-native';
import MapView, {Circle} from 'react-native-maps';

import { numberTypeAnnotation } from '@babel/types';
import { posix } from 'path';

import Images from './Asset/asset';
import GridLine from './components/GridLine';
import AssetWindow from './components/Asset';
import ImageDataView from './components/DataView'
import StorageControl from './components/StorageControl'

const { width, height } = Dimensions.get('window');
const POSITION_MAP_X = height * 0.15;
const MAP_STYLE =  require('./mapstyle.json');

const ASPECT_RATIO = width / height;
const SPACE = 0.01;

const App = () => {
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
      latitude: 34.6963315,
      longitude: 139.3749429,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05 * ASPECT_RATIO,
    },
  })
  const [ glidNumber, setGlidNumber ] = useState(10);
  const [ vertical, setVertical] = useState(1);
  const [ horizontal, setHorizontal] = useState(1);
  const [ currentImageTag, setCurrentImageTag] = useState(-1);
  const [ imgObj, setImgObj ] = useState<{
    divNumX: number,
    divNumY: number,
    region: {
      latitude: number,
      longitude: number,
      latitudeDelta: number,
      longitudeDelta: number,
    },
    imgData:[
      {PosX: number, PosY: number, source: any},
    ]
  }>
  ({
    divNumX: 10,
    divNumY: 10,
    region: {
      latitude: 34.6963315, 
      longitude: 139.3749429,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05 * ASPECT_RATIO,
    },
    imgData:[
      {PosX: 0, PosY: 0, source: Images[0]},
    ]
  })
  // Components display statment
  const [ mapIsOpen, setMapIsOpen ] = useState(true);
  const [ gridLineIsOpen, setGridLineIsOpen ] = useState(true);
  const [ dataViewIsOpen, setDataViewIsOpen ] = useState(true);
  const [ assetIsOpen, setAssetIsOpen ] = useState(false);
  const [ storageControlIsOpen, setStorageControlIsOpen ] = useState(true);


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
  }

  const addNewImgData = () => {
    let temp_obj = imgObj;
    temp_obj.imgData.push({PosX: horizontal, PosY: vertical, source: Images[currentImageTag]});

    setImgObj(temp_obj);
  }

  const mapEventOnPress = (e: any) => {
    let tmpObj = {...mapState};
   // tmpObj.region.latitude = 100;
   // tmpObj.region.longitude = 100;
   // setMapState({region: tmpObj.region});
    console.log(e);
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
            <Text style={{color: "white"}}> Up</Text>
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
            <Text style={{color: "white"}}> Down</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.menuButtons, backgroundColor: 'green'}}><Text style={{textAlign: 'center', fontSize: 50}}>{glidNumber}</Text></View>
        <View style={{...styles.menuButtons, backgroundColor: 'blue' }}></View>
      </View>
      
      <View style={styles.mapLayout}>
        { mapIsOpen && (
          <MapView
            style={styles.map}
            mapType={"satellite"}
            initialRegion={mapState.region}
            onPress={e => mapEventOnPress(e.nativeEvent)}
          >
          </MapView>
        )}
      </View>

      <TouchableOpacity style={styles.assetButtonLayout} onPress={assetSelectHandler}>
        <Text style={{color: "white", fontSize: 20, textAlign: 'center'}}> Select Asset </Text>
      </TouchableOpacity>
      
      <View style={styles.controllerLayout}>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'black'}} onPress={addNewImgData} >
          <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('./Asset/Buttons/plus.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'blue'}} >
          <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('./Asset/Buttons/minus.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveLeft}>
          <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('./Asset/Buttons/left.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveDown}>
          <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('./Asset/Buttons/down.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveUp}>
          <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('./Asset/Buttons/up.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.controlButtons, backgroundColor: 'gray'}} onPress={moveRight}>
          <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('./Asset/Buttons/right.png')} />
        </TouchableOpacity>
      </View>

      { dataViewIsOpen && (
        <ImageDataView imgObj={imgObj}/>
      )}
      
      { gridLineIsOpen && (
        <GridLine x1="0" y1="0" x2={width} y2={height*0.7} divNumX={glidNumber} divNumY={glidNumber} vertical={vertical} horizontal={horizontal} imageTag={currentImageTag}/>
      )}

      { assetIsOpen && (
        <AssetWindow rowNum={6} closeAssetHandler={(imageTag:number) => closeAssetHandler(imageTag)}/>
      )}

      { storageControlIsOpen && (
        <StorageControl mode={"create"} imgObj={imgObj} />
      )}

      { false && (
        <View style={{position: 'absolute', top: 100, left: 50, width: width-100, height:100, backgroundColor: 'white', opacity: 0.7}}>
          <Text style={{color: "black"}}>{"😺{Debug Monitor)"}</Text>
          <Text style={{color: "black"}}>latitude  = {mapState.region.latitude}</Text>
          <Text style={{color: "black"}}>longitude = {mapState.region.longitude}</Text>
        </View>
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
    width: '100%',
    height: '15%',
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
    width: '100%',
    height: '70%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // コントロールボタン配置エリア
  controllerLayout: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
  },
  assetButtonLayout: {
    width: '100%',
    height: '5%',
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
});

export default App;
//export default SvgExample;