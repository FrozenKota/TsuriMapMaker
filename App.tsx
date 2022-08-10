import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, StatusBar, View, Text, TouchableOpacity, BackHandler ,Alert} from  'react-native';

import MapEditor from './components/MapEditor/MapEditor';
import StorageControl from './components/StorageControl';
import Images from './Asset/asset';
import {storage} from './Storage';
import { loadOptions } from '@babel/core';
import { exit, exitCode } from 'process';


const { width, height} = Dimensions.get('window');
const STATUSBAR_HEIGHT = (StatusBar.currentHeight? StatusBar.currentHeight : 0);
const HEIGHT = height - STATUSBAR_HEIGHT;

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
            latitude: 38.165510778804716, 
            longitude: 0.05000013082483434,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05 * (width / height),
        },
        imgData: {
            xy00:{PosX: 0, PosY: 0, imgName: 'Asset0_1'},
            xy01:{PosX: 0, PosY: 0, imgName: 'Asset0_2'}
        },
    })
    const [ eventManager, setEventManager ] = useState({fileName:"", option:""});

    const initRegion = {
        latitude: 38.165510778804716, 
        longitude: 137.6747134141624,
        latitudeDelta: 19.31312361327316,
        longitudeDelta: 0.05 * (width / height),
    };

    const initLocation = () => {
        console.log("initNewData();");

        const tmpObj = imgObj;

        tmpObj.imgData = {};
        tmpObj['region'] = {
            latitude: 38.165510778804716, 
            longitude: 137.6747134141624,
            latitudeDelta: 19.31312361327316,
            longitudeDelta: 0.05 * (width / height),
        };

        console.log("setImgObj.");
        setImgObj(tmpObj);
    }

    // S1, S2, S3
    const storageControlHandler = (props: any) => {
        const {option} = props;
        setStorageControlOption(option)
        setStorageControlIsOpen(true);
    }

    const closeStorageControlHandler = () => {
        console.log("closeStorageControlHandler (App.tsx)");
        setStorageControlIsOpen(false);
    }

    const closeMapEditorHandler = () => {
        setMapEditorIsOpen(false);
    }

    const createDataHandler = async(e: {newFileName: string, option: string}) => {
        console.log("createDataHandler(App.tsx)")

        const {newFileName, option} = e;
        const tmpObj: any = imgObj;
        let exit_flag = false;
        let readDataBuffer: any;
        let keyListBuffer: any;

        console.log("新規ファイル作成シーケンス開始. ファイル名＝");
        console.log(newFileName);

        // セーブデータが未入力の場合、拒否
        if(newFileName === "" || option !== 'new'){ // ファイル名空欄の場合は処理なし。
            Alert.alert("ファイル名を入力してください");
            console.log("ファイル名を入力してください")
            setMapEditorIsOpen(false);
            return;
        }

        // 既存データとの重複確認 - - - - - - - - - - - - - - - - - - - - - 
        console.log("既存ファイルとのファイル名重複なきこと確認");
        await storage
            .load({key: newFileName})
            .then(data => {
                Alert.alert("既に使われているファイル名です");
                console.log("既に使われているファイル名です");
                exit_flag = true;
            })
            .catch((e)=>{
                console.log(e);
                console.log("使用可能なファイル名です");
            })

        if(exit_flag) return;

        // 作成するセーブデータを初期化 - - - - - - - - - - - - - - - - - - - 
        console.log("使用可能なファイル名です。新規作成処理を継続。");
        // ファイル名とシーケンス情報を設定
        tmpObj.fileName = newFileName;
        tmpObj.initStatus.location = true;  // 位置設定シーケンスを有効
        tmpObj.initStatus.divNum = true;    // 分割数設定シーケンスを有効
        tmpObj.imgData = {};
        tmpObj.region = initRegion;
        tmpObj.divNumX = 10,
        tmpObj.divNumY = 10,

        console.log("setImgObj.");
        setImgObj(tmpObj);                  // ワークオブジェクト(imgObj)に設定

        // セーブデータを作成 - - - - - - - - - - - - - - - - - - - - - - - - -
        await storage.save({key: newFileName, data: tmpObj});
        
        // 編集モードを立ち上げ - - - - - - - - - - - - - - - - - - - - - - - - 
        setMapEditorIsOpen(true);   // 地図編集画面起動

        // keyList にファイル名を追加（keyList ない場合は作成） - - - - - - - - - -
        console.log("keyList への key追加処理を実施");

        await storage.load({key: 'keyList'})
            .then(data => {
                keyListBuffer = data;
            })
            .catch((e)=>{
                console.log(e);
                keyListBuffer = undefined;
            })
        
        if(keyListBuffer === undefined){
            console.log("keyListがありません。新規に作成します。");
            console.log("newFileName is "+newFileName);
            keyListBuffer = { 'keyList':{[newFileName]:{'size': 1129, 'modDate': "2022/7/18"}}}; 
        }else{
            console.log("keyListが存在します。keyを追加し保存します");

            console.log("loaded keyList is ...");
            console.log(keyListBuffer);
            keyListBuffer.keyList[newFileName]= {'fileSize': 123456, 'modDate':'2022/7/18'};
            console.log("created keyList")
            console.log(keyListBuffer);
        }
        await storage.save({key: 'keyList',data: keyListBuffer})
    }

    const editDataHandler = async(e: any) => {
        /*********************************
         * 1)セーブデータの読み込み
         * 2)MapEditorの起動
        *********************************/
        console.log("editDataHandler(App.tsx)");

        const {fileName} = e;
        let tmpObj: any;

        console.log("セーブデータ読み込みシーケンスを開始");
        console.log("fileName is %s", fileName);

        await storage.load({key: fileName})
            .then(data => {
                tmpObj = data;
            }).then(()=>{
                setImgObj(tmpObj);
            }).finally(()=>{
                setMapEditorIsOpen(true);
                console.log(tmpObj);
            })
    };

    const deleteDataHandler = async(e: any) => {
        console.log("deleteDataHandler(App.tsx)");
        console.log("this will be deleted ... file name : " + e);
        
        try{
            await storage.remove({key: e});
        }catch(e){
            console.log(e);
        }
    }

    const saveDataHandler = async() => {

        // fileName を key にファイルを保存
        console.log("セーブデータ書き込みシーケンスを開始");
        console.log("fileName is %s", imgObj.fileName);
        console.log("セーブするimgObj = ");
        console.log(imgObj);

        try{
            const res = await storage.save({key: imgObj.fileName, data: imgObj});
        }catch(e){
            console.log(e);
        }finally{
            //setMapEditorIsOpen(false);
        }
    }

    const addNewImgData = (imgData: any) => {
        const {PosX, PosY, imgName} = imgData;

        const tmpObj: any = imgObj;
        tmpObj.imgData['xy'+String(PosX)+String(PosY)] = {PosX: PosX, PosY: PosY, imgName: imgName}
        console.log("setImgObj.");
        setImgObj(tmpObj);
    }

    const deleteImgData = (imgData: any) => {
        const {PosX, PosY} = imgData;

        const tmpImgObj: any = imgObj;
        delete tmpImgObj.imgData['xy'+String(PosX)+String(PosY)];
        console.log("setImgObj.");
        setImgObj(tmpImgObj);
    }

    const setRegionHandler = (region:any) => {
        console.log("setRegionHandler(App.tsx)");
        const tmpObj = imgObj;
        tmpObj['region'] = region;
        tmpObj.initStatus['location'] = false;  // 地図位置設定フラグを解除
        console.log("setImgObj.");
        setImgObj(tmpObj);
    }

    const setDivNumHandler = (divNumX: any) => {
        console.log("setDivNumHandler(App.tsx)")
        const tmpObj = imgObj;
        tmpObj['divNumX'] = divNumX;
        tmpObj['divNumY'] = Math.floor(height*0.7 / (width/divNumX));
        tmpObj.initStatus['divNum'] = false;    // 分割数設定フラグを解除
        console.log("setImgObj.");
        setImgObj(tmpObj);
    }
    
    // BackHandler
    useEffect(() => {
        const backAction = () => {
          Alert.alert("確認", "アプリを終了しても良いですか？", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    console.log(imgObj);

    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleLayout}>
                <Text style={styles.titleName}>ココドコマップメーカー(β)</Text>
            </View>

            <View style={styles.selectButtonLayout}>
                <MenuButton title={' はじめる '} handler={() => {storageControlHandler({option: "new"})}}/>
                <MenuButton title={' つづける '} handler={() => {storageControlHandler({option: "edit"})}} />
                {false && (<MenuButton title={' G A L L E R Y '} handler={() => {storageControlHandler({option: "gallery"})}} /> /*実装中*/ )}  
            </View>

            <View style={styles.footerLayout}>
                <Text style={{fontSize: width/30, color: 'white'}}> Twitter: @kota_ly</Text>
                <Text style={{fontSize: width/30, color: 'white'}}> ReleaseDate: 2022/8/20</Text>
                <Text style={{fontSize: width/30, color: 'white'}}> Rev.1.0.0</Text>
                <Text style={{fontSize: width/30, color: 'white'}}></Text>
            </View>

            {storageControlIsOpen && (
                <StorageControl 
                    closeStorageControlHandler={closeStorageControlHandler} 
                    option={storageControlOption}
                    imgObj={imgObj}
                    createData={(e: any) => {createDataHandler(e)}}
                    editData={(e: any) => {editDataHandler(e)}}
                    deleteData={(e: any) => {deleteDataHandler(e)}}
                />
            )}

            {mapEditorIsOpen && (
                <MapEditor 
                    imgObj={imgObj} 
                    addData={(imgData: any) => addNewImgData(imgData)} 
                    deleteData={(imgData: any) => deleteImgData(imgData)}
                    saveData = {saveDataHandler}
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
        height: HEIGHT*0.20,
        width: width,
        backgroundColor: "#4477FF",
        opacity: 1,
        justifyContent: 'center',
    },
    titleName:{
        textAlign: 'center',
        color: 'white',
        fontSize: width / 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        alignContent: 'center',
    },
    selectButtonLayout:{
        height: HEIGHT*0.70,
        width: width,
        flexDirection: 'column',
        backgroundColor: '#000099',
        justifyContent: 'space-evenly',
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
        height: HEIGHT*0.10,
        width: width,
        backgroundColor: '#000055',
        opacity: 1,
        justifyContent: 'flex-end',
    }
})