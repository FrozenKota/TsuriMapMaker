import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import MapView from 'react-native-maps';

import Images from '../Asset/asset';
import GridLine from './GridLine';
import AssetWindow from './Asset';
import ImageDataView from './DataView'

const { width, height } = Dimensions.get('window');
//const MAP_STYLE =  require('./mapstyle.json');

const ASPECT_RATIO = width / height;

const MapEditor = (props: any) => {
  const {closeHandler, imgObj, addData, deleteData} = props;

  const [ glidNumber, setGlidNumber ] = useState(10);
  const [ vertical, setVertical] = useState(1);
  const [ horizontal, setHorizontal] = useState(1);
  const [ currentImageTag, setCurrentImageTag] = useState(-1);

  // Components display statment
  const [ mapIsOpen, setMapIsOpen ] = useState(true);
  const [ gridLineIsOpen, setGridLineIsOpen ] = useState(false);
  const [ dataViewIsOpen, setDataViewIsOpen ] = useState(false);
  const [ assetIsOpen, setAssetIsOpen ] = useState(false);

  // Functions(Not component)
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

  // Handlers
  const assetSelectHandler = () => {
    setAssetIsOpen(true);
  }
  const closeAssetHandler = (imageTag: number) => {
        setAssetIsOpen(false);
        setCurrentImageTag(imageTag);
  }
  const onRegionChange = (e: any) => {
    console.log(e);
  }

  // Main Components
  const TopAreaComponents = () => {

    const InitLocationMenu = () => {
      return(
        <View style={styles.menuLayout}>
          <View style={{...styles.initMenu, backgroundColor: 'black'}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: width/20}}>地図を動かして好きな編集領域を表示</Text>
            <Text style={{color: 'lightblue', textAlign: 'center', fontSize: width/20}}>OKボタンで決定です</Text>
          </View>
        </View> 
      )
    }
    const InitDivNumMenu = () => {
      return(
        <View style={styles.menuLayout}>
          <View style={{...styles.menuButtons, backgroundColor: 'green'}}>
            <Text style={{textAlign: 'center', fontSize: 50}}>Init DivNum Menu</Text>
          </View>
        </View>
      )
    }
    const EditMapMode = () => {
      return(
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
            <Text style={{color: "white"}}> Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
              flex:1,
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignItems: 'center',
            }}
                onPress={closeHandler}
            >
              <Text style={{color: "white"}}> Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if(imgObj.initStatus.location){
      console.log("#init Location Mode")
      return(
        <><InitLocationMenu /></>
      )
    }else if(imgObj.initStatus.divNum){
      console.log("#init DivNum Mode")
      return(
        <><InitDivNumMenu /></>
      )
    }else{
      console.log("#edit Map Mode")
      return (
        <><EditMapMode /></>
      )
    }
  }
  const MapAreaComponents = () => {
    return (
      <View style={styles.mapLayout}>
        { mapIsOpen && (
          <MapView
            style={styles.map}
            mapType={"satellite"}
            initialRegion={imgObj.region}
            onRegionChangeComplete={(e:any) => onRegionChange(e)}
          >
          </MapView>
        )}
      </View>
    )
  }
  const SelectButton = () => {
    return (
      <TouchableOpacity style={styles.okButtonForInitLocation} onPress={assetSelectHandler}>
          <Text style={{color: "darkblue", fontSize: 20}}> 決定 </Text>
      </TouchableOpacity>
    )
  }
  const BottomAreaComponents = () => {
    return (
      <View style={styles.controllerLayout}>
      <TouchableOpacity style={styles.controlButtons} onPress={() => addData({PosX: horizontal, PosY: vertical, source: Images[currentImageTag]})} >
        <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('../Asset/Buttons/plus.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={() => deleteData({PosX: horizontal, PosY: vertical, source: Images[currentImageTag]})}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('../Asset/Buttons/minus.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={moveLeft}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('../Asset/Buttons/left.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={moveDown}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('../Asset/Buttons/down.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={moveUp}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('../Asset/Buttons/up.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={moveRight}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: height*0.1}} source={require('../Asset/Buttons/right.png')} />
      </TouchableOpacity>
    </View>
    )
  }

  // Overlay Components
  const OverlayComponents = () => {
    return (
      <>
        { dataViewIsOpen && (
          <ImageDataView imgObj={imgObj}/>
        )}
        
        { gridLineIsOpen && (
          <GridLine x1="0" y1="0" x2={width} y2={height*0.7} divNumX={glidNumber} divNumY={glidNumber} vertical={vertical} horizontal={horizontal} imageTag={currentImageTag}/>
        )}

        { assetIsOpen && (
          <AssetWindow rowNum={6} closeAssetHandler={(imageTag:number) => closeAssetHandler(imageTag)}/>
        )}

        { true && (
          <View style={{position: 'absolute', width: '100%', height: 100, top: 120, backgroundColor: 'black', opacity: 0.6,}}>
            <Text style={{color: 'white',fontSize: width/20,}}>
              latitude = {imgObj.region.latitude}     
            </Text>
            <Text style={{color: 'white',fontSize: width/20,}}>
              longitude = {imgObj.region.longitude}     
            </Text>
            <Text style={{color: 'white',fontSize: width/20,}}>
              latitudeDelta = {imgObj.region.latitudeDelta}     
            </Text>
            <Text style={{color: 'white',fontSize: width/20,}}>
              longitudeDelta = {imgObj.region.longitudeDelta}     
            </Text>
          </View>
        )}
      </>
    )
  }

  return (
    <View style={styles.mainContainer} >
      <TopAreaComponents />
      <MapAreaComponents />
      <SelectButton />
      <BottomAreaComponents />

      <OverlayComponents />
    </View> // Container
  )
}

const styles = StyleSheet.create({
  // 親コンテナ
  mainContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
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
    height: '100%',
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  initMenu: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
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
    backgroundColor: 'green',
  },
  okButtonForInitLocation: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  controlButtons: {
    flex:1,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapEditor;
//export default SvgExample;