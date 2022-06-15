import React, { useState, memo, useCallback} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';

import Images from '../../Asset/asset';
import GridLine from '../GridLine';
import AssetWindow from '../Asset';
import ImageDataView from '../DataView';
import MapAreaComponents from './MapAreaComponents'
import TopAreaComponents from './TopAreaComponents';
import SelectButton from './SelectButton';
import BottomAreaComponents from './BottomAreaComponents';

const { width, height } = Dimensions.get('window');
//const MAP_STYLE =  require('./mapstyle.json');

const MapEditor = memo((props: any) => {
  console.log("MapEditor.tsx")
  const {closeMapEditorHandler, imgObj, addData, deleteData} = props;

  const [ glidNumber, setGlidNumber ] = useState(10);
  const [ vertical, setVertical] = useState(1);
  const [ horizontal, setHorizontal] = useState(1);
  const [ currentImageTag, setCurrentImageTag] = useState(-1);

  // Components display statment
  const [ mapIsOpen, setMapIsOpen ] = useState(true);
  const [ gridLineIsOpen, setGridLineIsOpen ] = useState(true);
  const [ dataViewIsOpen, setDataViewIsOpen ] = useState(true);
  const [ assetIsOpen, setAssetIsOpen ] = useState(false);

  // Functions(Not component)
  const countup = useCallback(() => {
    setGlidNumber(glidNumber + 1);
  },[glidNumber])
  const countdown = useCallback(() => {
    if(glidNumber > 1) setGlidNumber(glidNumber - 1)
    else setGlidNumber(1)
  },[glidNumber])
  const moveLeft = useCallback(() => {
    if(horizontal >= 1) setHorizontal( horizontal - 1 )
    else setHorizontal(0)
  },[horizontal])
  const moveRight = useCallback(() => {
    setHorizontal(horizontal + 1)
  },[horizontal])
  const moveUp = useCallback(() => {
    if(vertical > 1) setVertical( vertical - 1)
    else setVertical(0)
  },[vertical])
  const moveDown = useCallback(() => {
    setVertical( vertical + 1 )
  },[vertical])

  // Handlers
  const assetSelectHandler = useCallback(() => {
    setAssetIsOpen(true);
  },[])
  const closeAssetHandler = useCallback((imageTag: number) => {
        setAssetIsOpen(false);
        setCurrentImageTag(imageTag);
  },[])
  const onRegionChange = useCallback((e: any) => {
    console.log("----onRegionChange----");
    console.log(e);
    console.log("----------------------");
  },[])

  return (
    <View style={styles.mainContainer} >
      <TopAreaComponents initStatus={imgObj.initStatus} countup={countup} countdown={countdown} closeHandler={closeMapEditorHandler} />
      <MapAreaComponents initialRegion={imgObj.region} mapType={"satellite"} mapIsOpen={mapIsOpen} onRegionChange={(e:any) => onRegionChange(e)}/>
      <SelectButton assetSelectHandler={assetSelectHandler}/>
      <BottomAreaComponents addData={addData} deleteData={deleteData} moveLeft={moveLeft} moveDown={moveDown} moveUp={moveUp} moveRight={moveRight} horizontal={horizontal} vertical={vertical} currentImageTag={currentImageTag} />

      { dataViewIsOpen && (
        <ImageDataView imgObj={imgObj}/>
      )}
        
      { gridLineIsOpen && (
        <GridLine x1="0" y1="0" x2={width} y2={height*0.7} divNumX={glidNumber} divNumY={glidNumber} vertical={vertical} horizontal={horizontal} imageTag={currentImageTag}/>
      )}

      { assetIsOpen && (
        <AssetWindow rowNum={6} closeAssetHandler={(imageTag:number) => closeAssetHandler(imageTag)}/>
      )}

      { false && (
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
    </View> // Container
  )
})

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