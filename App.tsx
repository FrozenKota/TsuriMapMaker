import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from  'react-native';

import StorageControl from './components/StorageControl';
import MapEditor from './components/MapEditor';
import Images from './Asset/asset';
import { Image } from 'react-native-svg';

const { width, height} = Dimensions.get('window');


const App = () => {
    const [ storageControlIsOpen, setStorageControlIsOpen ] = useState(false);
    const [ storageControlOption, setStorageControlOption ] = useState("");
    const [ mapEditorIsOpen, setMapEditorIsOpen ] = useState(true);

    // let data: any = {xy00:1, xy01:2, xy10:3, xy11:4};   //登録済みデータ
    // let newdata = {x:1, y:1, value:9};                  //更新したい新規データ
    
    // console.log(data);  // {xy00:1, xy01:2, xy10:3, xy11:4}
    // data['xy'+String(newdata.x)+String(newdata.y)] = newdata.value; // プロパティ更新
    // console.log(data);  // {xy00:1, xy01:2, xy10:3, xy11:9};

    // newdata = {x:2, y:2, value: 1};
    // data['xy'+String(newdata.x)+String(newdata.y)] = newdata.value; // プロパティ追加
    // console.log(data);  // {xy00:1, xy01:2, xy10:3, xy11:9, xy22:1};


    const [ imgObj, setImgObj ] = useState<{
        key: string,
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


    const strageControlHandler = (props: any) => {
        const {option} = props;
        setStorageControlOption(option)
        setStorageControlIsOpen(true);
    }
    const createNewFileHandler = (props: any) => {
        const {option} = props;
        setStorageControlOption(option);
        setStorageControlIsOpen(true);
    }

    const strageControlCloseHandler = () => {
        setStorageControlIsOpen(false);
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
        <View style={styles.mainContainer}>
            <View style={styles.titleLayout}>
                <Text style={styles.titleName}>タイトル表示エリア</Text>
            </View>
            <View style={styles.selectButtonLayout}>
                <TouchableOpacity onPress={() => {createNewFileHandler({option: "new"})}}><View style={styles.selectButton}><Text style={styles.selectButtonText}> N E W </Text></View></TouchableOpacity>
                <TouchableOpacity onPress={() => {strageControlHandler({option: "edit"})}}><View style={styles.selectButton}><Text style={styles.selectButtonText}> E D I T </Text></View></TouchableOpacity>
                <TouchableOpacity onPress={() => {strageControlHandler({option: "gallery"})}}><View style={styles.selectButton}><Text style={styles.selectButtonText}> G A L L E R Y </Text></View></TouchableOpacity>
            </View>
                <View style={styles.footerLayout}>
            </View>

            {storageControlIsOpen && (
                <StorageControl closeHandler={strageControlCloseHandler} option={storageControlOption} imgObj={imgObj}/>
            )}

            {mapEditorIsOpen && (
                <MapEditor imgObj={imgObj} 
                    addData={(imgData: any) => addNewImgData(imgData)} 
                    deleteData={(imgData: any) => deleteImgData(imgData)}
                />
            )}
        </View>
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