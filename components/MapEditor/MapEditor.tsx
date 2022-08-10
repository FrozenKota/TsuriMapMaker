import React, { useState, memo, useCallback, useEffect} from 'react';
import { StyleSheet, Dimensions, StatusBar, View, Text, BackHandler, Alert} from 'react-native';

import GridLine from '../GridLine';
import AssetWindow from '../Asset';
import ImageDataView from '../DataView';
import MapAreaComponents from './MapAreaComponents'
import TopAreaComponents from './TopAreaComponents';
import SelectButton from './SelectButton';
import BottomAreaComponents from './BottomAreaComponents';
import SideBar from './SideBar';

const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const HEIGHT = height - (STATUSBAR_HEIGHT? STATUSBAR_HEIGHT : 0);

const MapEditor = memo((props: any) => {
  console.log("MapEditor.tsx")
  // props
  const {closeMapEditorHandler, 
      imgObj, addData, saveData, deleteData, setRegionHandler, setDivNumHandler} = props;

  // useState
  const [ glidNumber, setGlidNumber ] = useState(imgObj.divNumX);
  const [ vertical, setVertical] = useState(0);
  const [ horizontal, setHorizontal] = useState(0);
  const [ currentImageTag, setCurrentImageTag] = useState("");
  const [ regionTemp, setRegionTemp] = useState({region:{}});
  const [ locationIsSelected, setLocationIsSelected ] = useState(imgObj.initStatus.location);
  const [ divNumIsSelected, setDivNumIsSelected ] = useState(imgObj.initStatus.divNum);

  // Components display statment
  const [ mapIsOpen, setMapIsOpen ] = useState(true);
  const [ gridLineIsOpen, setGridLineIsOpen ] = useState(true);
  const [ dataViewIsOpen, setDataViewIsOpen ] = useState(false);
  const [ assetIsOpen, setAssetIsOpen ] = useState(false);
  const [ sideBarIsOpen, setSideBarIsOpen ] = useState(false);
  const [ zoomIsEnabled, setZoomIsEnabled ] = useState(true);
  const [ scrollIsEnabled, setScrollIsEnabled ] = useState(true);

  // Functions(Not component)
  const upDivNum = useCallback(() => {
    setGlidNumber(glidNumber + 1);
  },[glidNumber,imgObj.initStatus])
  const downDivNum = useCallback(() => {
    if(glidNumber > 2) setGlidNumber(glidNumber - 1)
  },[glidNumber])

  const moveLeft = useCallback(() => {
    if(horizontal > 0) setHorizontal( horizontal - 1 )
  },[horizontal])
  const moveRight = useCallback(() => {
    if(horizontal < imgObj.divNumX - 1) setHorizontal(horizontal + 1)
  },[horizontal])
  const moveUp = useCallback(() => {
    if(vertical > 0) setVertical( vertical - 1)
  },[vertical])
  const moveDown = useCallback(() => {
    if(vertical < imgObj.divNumY - 1) setVertical( vertical + 1 )
  },[vertical])

  // Handlers
  const assetSelectHandler = useCallback(() => {
    setAssetIsOpen(previous => !previous);
  },[])
  useEffect(() => {
    const backAction = () => {
      Alert.alert("確認", "セーブしてアプリを終了しますか？", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", 
          onPress: () => {
            saveData()
            BackHandler.exitApp()
          }
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const closeAssetHandler = (imgName: string) => {
        setAssetIsOpen(false);
        setCurrentImageTag(imgName);
  }
  const closeMapEditorHandler1 = () => {
    saveData();
    closeMapEditorHandler();  // 親コンポーネント App.tsx でMapEditor.tsx を非表示. 
  }
  const closeSideBarHandler = () => {
    setSideBarIsOpen(previous => !previous);
  }
  const toggleGridLineIsOpen = () => {
    setGridLineIsOpen(previous => !previous);
    setScrollIsEnabled(previous => !previous);
    setZoomIsEnabled(previous => !previous);
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
    <View style={{...styles.mainContainer, height: height} } >
      <TopAreaComponents fileName={imgObj.fileName} initStatus={imgObj.initStatus} countup={upDivNum} countdown={downDivNum} closeHandler={closeMapEditorHandler1} closeSideBar = {closeSideBarHandler} saveData={saveData} />
      <MapAreaComponents initialRegion={imgObj.region} mapType={"satellite"} mapIsOpen={mapIsOpen} onRegionChange={(e:any) => onRegionChange(e)} scrollIsEnabled={scrollIsEnabled} zoomIsEnabled={zoomIsEnabled} />
      <SelectButton assetSelectHandler={assetSelectHandler} initStatus={imgObj.initStatus} enableEditMode={enableEditMode} onRegionSelect={onRegionSelect} onDivNumSelect={onDivNumSelect} />
      <BottomAreaComponents addData={addData} deleteData={deleteData} moveLeft={moveLeft} moveDown={moveDown} moveUp={moveUp} moveRight={moveRight} horizontal={horizontal} vertical={vertical} currentImageTag={currentImageTag}/>

      { ((!imgObj.initStatus.location && imgObj.initStatus.divNum) ||
        (!imgObj.initStatus.location && !imgObj.initStatus.divNum) || dataViewIsOpen) && (
        <ImageDataView imgObj={imgObj}/>
      )}
      
      { (((!imgObj.initStatus.location && imgObj.initStatus.divNum) || 
        (!imgObj.initStatus.location && !imgObj.initStatus.divNum)) && gridLineIsOpen) && (
        <GridLine x1="0" y1="0" x2={width} y2={height*0.7} divNumX={glidNumber} vertical={vertical} horizontal={horizontal} imgTag={currentImageTag}/>
      )}

      { assetIsOpen && (
        <AssetWindow rowNum={6} closeAssetHandler={(imgName:any) => closeAssetHandler(imgName)}/>
      )}

      {sideBarIsOpen && (
        <SideBar 
          closeMapEditorHandler = {closeMapEditorHandler1} 
          toggleGridLineIsOpen={toggleGridLineIsOpen}
          gridLineIsOpen={gridLineIsOpen}
        />
      )}

      {true && (
        <View style={{position: 'absolute', width: width, backgroundColor: 'yellow'}}>

        </View>
      )}
    </View> // Container
  )
})

const styles = StyleSheet.create({
  // 親コンテナ
  mainContainer: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'black',
  }
});

export default MapEditor;