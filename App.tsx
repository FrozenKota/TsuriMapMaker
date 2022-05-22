import React, {useState, createContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from  'react-native';

import StorageControl from './components/StorageControl';
import MapEditor from './components/MapEditor';
import Images from './Asset/asset';
import { Image } from 'react-native-svg';

export const SequenceContext = createContext({});
const { width, height} = Dimensions.get('window');


const App = () => {
    const [ storageControlIsOpen, setStorageControlIsOpen ] = useState(false);
    const [ storageControlOption, setStorageControlOption ] = useState("");
    const [ mapEditorIsOpen, setMapEditorIsOpen ] = useState(false);

    const [ stateIs , setStateIs ] = useState("menu");
    const [ asCreateMode, setAsCreateMode ] = useState(false);
    const [ asEditMode, setAsEditMode ] = useState(false);
    const [ asViewMode, setAsViewMode ] = useState(false);

    const stateContext = {storageControlIsOpen, mapEditorIsOpen, asCreateMode, asEditMode, asViewMode, stateIs};
    const setStateContext = {setStorageControlIsOpen, setMapEditorIsOpen, setAsCreateMode, setAsEditMode, setAsViewMode, setStateIs};

    const [ imgObj, setImgObj ] = useState<{
        key: string,
        isInitialized: boolean,
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
        key: "sample",
        isInitialized: false,
        divNumX: 10,
        divNumY: 10,
        region: {
            latitude: 34.6963315, 
            longitude: 139.3749429,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05 * (width / height),
        },
        imgData: {
            xy00:{PosX: 0, PosY: 0, source:Images[5]}
        },
    })

    const [ eventManager, setEventManager ] = useState({fileName:"", option:""});


    // S1, S2, S3
    const storageControlHandler = (props: any) => {
        const {option} = props;
        setStorageControlOption(option)
        setStorageControlIsOpen(true);
    }

    const closeStorageControlHandler = () => {
        setStorageControlIsOpen(false);
    }

    const closeMapEditorHandler = () => {
        setMapEditorIsOpen(false);
    }

    const storageEventHandler = (e:any) => {
        console.log("<App> ");
        console.log(" storageEventHandler")
        console.log("  e=");
        console.log(e);
        const tmpObj: any = eventManager;
        tmpObj['fileName'] = e['fileName'];
        tmpObj['option'] = e['option'];

        setEventManager(tmpObj);
        console.log('  evengManager=')
        console.log(eventManager);

        if(eventManager.fileName !== "" && (eventManager.option === "new" || eventManager.option === "gallery")){
            setMapEditorIsOpen(true);
        }else{
            setMapEditorIsOpen(false);
        }
    }

    const addNewImgData = (imgData: any) => {
        const {PosX, PosY, source} = imgData;

        const tmpImgObj: any = imgObj;
        tmpImgObj.imgData['xy'+String(PosX)+String(PosY)] = {PosX: PosX, PosY: PosY, source: source};;
        setImgObj(tmpImgObj);
    }

    const deleteImgData = (imgData: any) => {
        const {PosX, PosY, source} = imgData;

        const tmpImgObj: any = imgObj;
        delete tmpImgObj.imgData['xy'+String(PosX)+String(PosY)];
        setImgObj(tmpImgObj);
    }

    return(
        <SequenceContext.Provider value={{stateIs, setStateIs}}>
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
                    <MapEditor imgObj={imgObj} 
                        addData={(imgData: any) => addNewImgData(imgData)} 
                        deleteData={(imgData: any) => deleteImgData(imgData)}
                        closeHandler={closeMapEditorHandler}
                        editType={eventManager.option}
                    />
                )}
            </View>
        </SequenceContext.Provider>
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