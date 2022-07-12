import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert} from  'react-native';

import MapEditor from './components/MapEditor/MapEditor';
import StorageControl from './components/StorageControl';
import Images from './Asset/asset';
import { storage } from './Storage';


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

    const initNewData = useCallback(() => {
        console.log("initNewData();");
        let tmpObj = imgObj;
        tmpObj.initStatus['location'] = true;
        tmpObj.initStatus['divNum'] = true;
        tmpObj.imgData = {};
        tmpObj['region'] = {
            latitude: 34.6963315, 
            longitude: 139.3749429,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05 * (width / height),
        };
        setImgObj(tmpObj);
    },[imgObj])

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

    const editDataHandler = async(e: any) => {
        /*********************************
         * 1)セーブデータの読み込み
         * 2)MapEditorの起動
        *********************************/
        console.log("editDataHandler(App.tsx)");

        const {fileName, option} = e;
        
        //debug
        console.log("imgObj before load func");
        console.log(imgObj);

        console.log("セーブデータ読み込みシーケンスを開始");
        console.log("fileName is %s", fileName);
        //initNewData();
        try{
            const res = await storage.load({key: fileName});
            console.log(res);
            setImgObj(res);
        }catch(e){
            console.log(e);
        }finally{
            setMapEditorIsOpen(true);
        }
    }

    const createDataHandler = useCallback((e: any) => {
        /*********************************
         * 1)新規セーブデータの作成
         * 2)空の imgObj をセーブデータに追加
         * 3)ファイル名リスト にファイル名を追記
         * 4)MapEditorの起動
        *********************************/
        console.log("storageEventHandler(App.tsx)")

        const {newFileName, option} = e;
        let tmpObj: any = imgObj;
        let readDataBuffer: any;
        let keyListBuffer: any;

        console.log("新規ファイル作成シーケンス開始. ファイル名＝");
        console.log(newFileName);

        // セーブデータ新規作成処理
        if(newFileName !== "" && option === 'new'){
            // ファイル名重複確認. 
            console.log("ファイル名の重複確認を実施");
            storage
            .load({key: newFileName})           //  データ読み込み
            .then(data => {                     //  バッファにデータを一時保存
                console.log("loaded data is ...");
                console.log(data);
                readDataBuffer = data;
            }).catch(err => {                   //  エラー処理. エラーの場合、バッファに null を代入
                console.log(err.message)
                switch (err.name){
                    case 'NotFoundError':
                        console.log("NotFoundError has occured");
                        readDataBuffer = null;
                        console.log(readDataBuffer);
                        break;
                    case 'ExpiredError':
                        console.log("ExpiredError has occured");
                        readDataBuffer = null;
                        console.log(readDataBuffer)
                        break;
                    default:
                        break;
                }
            }).then(()=>{                       //  エラーや、ファイル名重複がなかった場合の処理
                if(readDataBuffer === null){    //  入力したファイル名が未使用(key未使用)なら作成
                    // debug: newFileName は正常な文字列でここまで到達
                    console.log("使用可能なファイル名です。セーブデータを新規作成。");
                    
                    // ファイル名とシーケンス情報を設定
                    tmpObj.fileName = newFileName;
                    tmpObj.initStatus['location'] = true;  // 位置設定シーケンスを有効
                    tmpObj.initStatus['divNum'] = true;    // 分割数設定シーケンスを有効
                    setImgObj(tmpObj);                  // ワークオブジェクト(imgObj)に設定

                    // データ(tmpObj or imgObj)をストレージに保存
                    storage.save({
                        key: newFileName,
                        data: tmpObj
                    });
                    initNewData();
                    setMapEditorIsOpen(true);   // 地図編集画面起動
                }else{                          //  入力したファイル名が使用済み(keyが存在)なら失敗
                    console.log("失敗. 使われているファイル名です");
                    Alert.alert("失敗. 使われているファイル名です");
                    console.log(readDataBuffer);
                }   
            }).then(()=>{
                //  ファイル名(key名)リストに追加
                if(readDataBuffer === null){
                    console.log("keyList への key追加処理を実施");
                    storage
                    .load({key: 'keyList'})
                    .then(data => {
                        console.log("keyList の有無を確認");
                        console.log("loaded keyList is ...");
                        console.log(data);
                        keyListBuffer = data;
                    }).catch(err => {                   //  エラー処理. エラーの場合、バッファに null を代入
                        switch (err.name){
                            case 'NotFoundError':
                                console.log("NotFoundError has occured");
                                keyListBuffer = null;
                                console.log(keyListBuffer);
                                break;
                            case 'ExpiredError':
                                console.log("ExpiredError has occured");
                                keyListBuffer = null;
                                console.log(keyListBuffer);
                                break;
                        }
                    }).then(() => {
                        if(keyListBuffer === null){
                            console.log("keyListがありません。新規に作成します。");
                            console.log("newFileName is "+newFileName);
                            keyListBuffer = {'keyList': [newFileName]}; 
                            storage.save({
                                key: 'keyList',
                                data: keyListBuffer,
                            })
                        }else{
                            console.log("keyListが存在します。keyを追加し保存します");
                            storage
                            .load({key: 'keyList'})
                            .then(data=> {
                                console.log("loaded keyList is ...");
                                console.log(data);
                                keyListBuffer = data;
                                keyListBuffer['keyList']= [...keyListBuffer.keyList, newFileName];
                                console.log("created keyList")
                                console.log(keyListBuffer);

                                storage.save({
                                    key: 'keyList',
                                    data: keyListBuffer
                                })
                                console.log("added key is ....");
                                console.log(keyListBuffer);
                            })
                        }
                    })
                }else{
                    // ファイルの新規作成は発生しませんでした。
                }
            })
            
        }else{
            setMapEditorIsOpen(false);
        }
    },[])

    const saveDataHandler = useCallback(async() => {

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
        tmpObj.initStatus['divNum'] = false;    // 分割数設定フラグを解除
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
                    createData={(e: any) => {createDataHandler(e)}}
                    editData={(e: any) => {editDataHandler(e)}}
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