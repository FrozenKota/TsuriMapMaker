import React, { useState, memo, useCallback} from 'react';
import { StyleSheet, View, Text, Dimensions} from 'react-native';

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
  // props
  const {closeMapEditorHandler, 
      imgObj, addData, saveData, deleteData, setRegionHandler, setDivNumHandler} = props;

  // useState
  const [ glidNumber, setGlidNumber ] = useState(imgObj.divNumX);
  const [ vertical, setVertical] = useState(1);
  const [ horizontal, setHorizontal] = useState(1);
  const [ currentImageTag, setCurrentImageTag] = useState(-1);
  const [ regionTemp, setRegionTemp] = useState({region:{}});
  const [ locationIsSelected, setLocationIsSelected ] = useState(imgObj.initStatus.location);
  const [ divNumIsSelected, setDivNumIsSelected ] = useState(imgObj.initStatus.divNum);

  // Components display statment
  const [ mapIsOpen, setMapIsOpen ] = useState(true);
  const [ gridLineIsOpen, setGridLineIsOpen ] = useState(false);
  const [ dataViewIsOpen, setDataViewIsOpen ] = useState(false);
  const [ assetIsOpen, setAssetIsOpen ] = useState(false);

  // Functions(Not component)
  const upDivNum = useCallback(() => {
    setGlidNumber(glidNumber + 1);
  },[glidNumber,imgObj.initStatus])
  const downDivNum = useCallback(() => {
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
  
  const closeAssetHandler = (imageTag: number) => {
        setAssetIsOpen(false);
        setCurrentImageTag(imageTag);
  }

  const closeMapEditorHandler1 = () => {
    saveData();
    closeMapEditorHandler();  // 親コンポーネント App.tsx でMapEditor.tsx を非表示. 
  }

  const onRegionChange = useCallback((region: any) => {
    console.log("onRegionChange");
    const tmp = regionTemp;
    tmp['region'] = {...region};
    setRegionTemp(tmp);
    console.log(regionTemp);
  },[regionTemp])

  const onRegionSelect = useCallback(() => {
    console.log("onRegionSelect")
    setRegionHandler(regionTemp['region']);
    console.log(regionTemp['region']);

    setLocationIsSelected(false);
  },[locationIsSelected])

  const onDivNumSelect = useCallback(() => {
    console.log("onDivNumSelect")
    setDivNumHandler(glidNumber);
    console.log(glidNumber );
    enableEditMode()
    setDivNumIsSelected(!setDivNumIsSelected);
  },[divNumIsSelected, glidNumber])

  const enableEditMode = () => {
      setDataViewIsOpen(true);
      setGridLineIsOpen(true);
  }

  return (
    <View style={styles.mainContainer} >
      <TopAreaComponents fileName={imgObj.fileName} initStatus={imgObj.initStatus} countup={upDivNum} countdown={downDivNum} closeHandler={closeMapEditorHandler1} saveData={saveData} />
      <MapAreaComponents initStatus={imgObj.initStatus} initialRegion={imgObj.region} mapType={"satellite"} mapIsOpen={mapIsOpen} onRegionChange={(e:any) => onRegionChange(e)} />
      <SelectButton assetSelectHandler={assetSelectHandler} initStatus={imgObj.initStatus} enableEditMode={enableEditMode} onRegionSelect={onRegionSelect} onDivNumSelect={onDivNumSelect} />
      <BottomAreaComponents addData={addData} deleteData={deleteData} moveLeft={moveLeft} moveDown={moveDown} moveUp={moveUp} moveRight={moveRight} horizontal={horizontal} vertical={vertical} currentImageTag={currentImageTag}/>

      { ((!imgObj.initStatus.location && imgObj.initStatus.divNum) ||
        (!imgObj.initStatus.location && !imgObj.initStatus.divNum) || dataViewIsOpen) && (
        <ImageDataView imgObj={imgObj}/>
      )}
      
      { ((!imgObj.initStatus.location && imgObj.initStatus.divNum) || 
        (!imgObj.initStatus.location && !imgObj.initStatus.divNum) || gridLineIsOpen) && (
        <GridLine x1="0" y1="0" x2={width} y2={height*0.7} divNumX={glidNumber} vertical={vertical} horizontal={horizontal} imageTag={currentImageTag}/>
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