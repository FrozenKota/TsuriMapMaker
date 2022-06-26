import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from  'react-native';

import StorageControl from './components/StorageControl';
import MapEditor from './components/MapEditor/MapEditor';
import Images from './Asset/asset';

const { width, height} = Dimensions.get('window');

const App = () => {
    console.log("App.tsx");
    const [ storageControlIsOpen, setStorageControlIsOpen ] = useState(false);
    const [ storageControlOption, setStorageControlOption ] = useState("");
    const [ mapEditorIsOpen, setMapEditorIsOpen ] = useState(false);

    const [ imgObj, setImgObj ] = useState<{
        fileName: string,
        initStatus: {
            location: boolean,
            divNum: boolean,
        },
        divNumX: number,
        divNumY: number,
        region: {
            latitude: number,
            longitude: number,
            latitudeDelta: number,
            longitudeDelta: number,
        },
        imgData:any
      }>
      ({
        fileName: "",
        initStatus: {
            location: true,
            divNum: true,
        },
        divNumX: 10,
        divNumY: 10,
        region: {
            latitude: 34.6963315, 
            longitude: 139.3749429,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05 * (width / height),
        },
        imgData: {
            xy00:{PosX: 0, PosY: 0, source:Images[3]}
        },
    })

    const [ eventManager, setEventManager ] = useState({fileName:"", option:""});


    // S1, S2, S3
    const storageControlHandler = useCallback((props: any) => {
        const {option} = props;
        setStorageControlOption(option)
        setStorageControlIsOpen(true);
    },[])

    const closeStorageControlHandler = useCallback(() => {
        setStorageControlIsOpen(false);
    },[])

    const closeMapEditorHandler = useCallback(() => {
        setMapEditorIsOpen(false);
    },[])

    const storageEventHandler = useCallback((e:any) => {
        console.log("storageEventHandler(App.tsx)")
        let tmpObj: any = imgObj;
        const {fileName, option} = e;
        
        if(fileName !== "" && option === 'new'){
            tmpObj.fileName = fileName;
            // 地図位置、分割数設定シーケンスを有効化
            tmpObj.initStatus.initLocation = true;
            tmpObj.initStatus.initDivNum = true;
            console.log(imgObj);
            setImgObj(tmpObj);

            console.log("fileName is " + fileName);
            
            setMapEditorIsOpen(true);
        }else{
            setMapEditorIsOpen(false);
        }
    },[])

    const addNewImgData = useCallback((imgData: any) => {
        const {PosX, PosY, source} = imgData;

        const tmpImgObj: any = imgObj;
        tmpImgObj.imgData['xy'+String(PosX)+String(PosY)] = {PosX: PosX, PosY: PosY, source: source}
        setImgObj(tmpImgObj);
    },[])

    const deleteImgData = useCallback((imgData: any) => {
        const {PosX, PosY} = imgData;

        const tmpImgObj: any = imgObj;
        delete tmpImgObj.imgData['xy'+String(PosX)+String(PosY)];
        setImgObj(tmpImgObj);
    },[])

    const setRegionHandler = useCallback((region:any) => {
        console.log("setRegionHandler(App.tsx)");
        const tmpObj = imgObj;
        tmpObj['region'] = region;
        tmpObj.initStatus['location'] = false;  // 地図位置設定フラグを解除
        setImgObj(tmpObj);
    },[])

    const setDivNumHandler = useCallback((divNumX: any) => {
        console.log("setDivNumHandler(App.tsx)")
        const tmpObj = imgObj;
        tmpObj['divNumX'] = divNumX;
        tmpObj['divNumY'] = divNumX;
        setImgObj(tmpObj);
        tmpObj.initStatus['divNum'] = false;    // 分割数設定フラグを解除
    },[])

    const setFileNameHandler = useCallback((fileName: any) => {
        const tmpObj = imgObj;
        tmpObj['fileName'] = fileName;
        setImgObj(tmpObj);
    },[])

    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleLayout}>
                <Text style={styles.titleName}>タイトル表示エリア</Text>
            </View>

            <View style={styles.selectButtonLayout}>
                <MenuButton title={' N E W '} handler={() => {storageControlHandler({option: "new"})}}/>
                <MenuButton title={' E D I T '} handler={() => {storageControlHandler({option: "edit"})}} />
                <MenuButton title={' G A L L E R Y '} handler={() => {storageControlHandler({option: "gallery"})}} />
            </View>

            <View style={styles.footerLayout}>
            </View>

            {storageControlIsOpen && (
                <StorageControl 
                    closeHandler={closeStorageControlHandler} 
                    option={storageControlOption}
                    imgObj={imgObj}
                    storageEvent={(e: any) => {storageEventHandler(e)}}
                />
            )}

            {mapEditorIsOpen && (
                <MapEditor 
                    imgObj={imgObj} 
                    addData={(imgData: any) => addNewImgData(imgData)} 
                    deleteData={(imgData: any) => deleteImgData(imgData)}
                    setRegionHandler={(region: any) => setRegionHandler(region)}
                    setDivNumHandler={(divNum: any) => setDivNumHandler(divNum)}
                    closeMapEditorHandler={closeMapEditorHandler}
                    editType={eventManager.option}
                />
            )}
        </View>
    )
}

const MenuButton = (props: any) => {
    const {title, handler} = props;

    return (
        <TouchableOpacity onPress={() => {handler({option: "new"})}}>
            <View style={styles.selectButton}><Text style={styles.selectButtonText}>{title}</Text></View>
        </TouchableOpacity>
    )
}


export default App;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'yellow',
    },
    titleLayout:{
        flex: 1,
        height: '10%',
        width: width,
        backgroundColor: "#87cefa",
        opacity: 1,
        justifyContent: 'center',
    },
    titleName:{
        textAlign: 'center',
        color: 'white',
        fontSize: width / 12,
        alignContent: 'center',
    },
    selectButtonLayout:{
        height: '60%',
        width: width,
        flexDirection: 'column',
        backgroundColor: '#000099',
        justifyContent: 'space-around',
    },
    selectButton:{
        height: (height*0.7)/8,
        width: width*0.6,
        left: width*0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
        backgroundColor: '#000055',
        
    },
    selectButtonText: {
        color: 'white',
        fontSize: width/15,
        fontFamily: 'sans-serif-light',
    },
    footerLayout: {
        flex: 1,
        height: '30%',
        width: width,
        backgroundColor: '#000055',
        opacity: 1,
        justifyContent: 'center',
    }
})