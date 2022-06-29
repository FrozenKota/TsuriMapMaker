/****************************************************
 * Description:
 * - Save data control window component
 * - 
 * 
 * Function:
 * - Diplay the save data window        : <StorageControl />
 * - List the save datas from strage    : 
 * - Load the Object data.              :
 *   (select a data -> editor mode)
 * - Save the Object data.              :
 *   (input a name of data -> create data -> editor mode)
 * - Delete the Object data.            :
 *   (select a data -> confirm )
 * 
 * Input
*****************************************************/

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ITextInput from './ITextInput';

const { width } = Dimensions.get('window');

const StorageControl = (props: any) => {
    const {closeHandler, option, storageEvent } = props;
    let title = "";
    const dummydata = [];

    const setFileNameHandler = (name: string) => {
        console.log("setFileNameHandler(StorageControl.tsx)");
        // <StorageControl> の状態を返す
        storageEvent({newFileName: name, option: 'new'});

        //ITextInput をクローズ
        closeHandler();
    }

    if(option == "new"){
        title = "ファイル名を入力"
    }else if(option == "edit"){
        title = "編集するファイルを選択"
    }else if(option == "gallery"){
        title = "閲覧したいファイルを選択"
    }

    // デモ用　ダミー空データ
    for (let i = 0; i < 20; i ++){
        dummydata.push(
            <TouchableOpacity key={i} onPress={() => {closeHandler}}>
                <DataBlock fileName={"セーブデータ"+String(i)} fileSize={'1129710 kbyte'} modDate={'2022/2/22'} />
            </TouchableOpacity>
        )
    }
    
    if(option === "new"){
        return(
            <ITextInput closeHandler={(name: string) => setFileNameHandler(name)}/>
        )
    } else {
        return(
            <View style={styles.mainContainer}>
                <View style={styles.titleAreaLayout}>
        
                    <View style={styles.titleStyle}>
                      <Text style={styles.h1}>{title}</Text>
                    </View>
        
                    <TouchableOpacity onPress={closeHandler} style={styles.closeButton}>
                        <Text style={{color: 'white'}}>Close</Text>
                    </TouchableOpacity>
        
                </View>
                <View style={styles.dataAreaLayout}>
                    <ScrollView>
                        {dummydata}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

// DataBlock will display file information
const DataBlock = (props: any) => {
    const {fileName, fileSize, modDate} = props;

    return (
        <View style={styles.dataBlockLayout}>
            <Text style={styles.fileName}>  {fileName}</Text>
            <View style={styles.dataDetailsBlock}>
                <Text style={styles.fileMoreInfo}> file size:  {fileSize} / modified date:  {modDate}</Text>
            </View>
        </View>
    )
}

export default StorageControl;

// Write save data
export const createData = async(props: any) => {
    const {key, obj} = props;
    console.log("createData(StorageControl.tsx)");
    console.log(props);
    try {
        const jsonValue = JSON.stringify(obj);
        await AsyncStorage.setItem(String(key), jsonValue);
    } catch (e) {
        // saving error
        console.log("新規 作成失敗");
    }
}

// Read save data
export const readData = async(name: string) => {
    try {
        // AsyncStorage.getItem()が終わるまで待機し、dataBuffer に代入
        const dataBuffer = await AsyncStorage.getItem(String(name));
        return dataBuffer != null ? JSON.parse(dataBuffer) : null;
    } catch (e) {
        // error reading value
        console.log("error");
    }
}

const styles = StyleSheet.create({
    h1: {
        fontSize: width / 16,
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        flex: 0.2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '1%',
        marginHorizontal: '1%',
    },
    titleStyle: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleAreaLayout: {
        flex: 0.1,
        flexDirection: 'row',
        width: width,
        backgroundColor: '#191970',
    },
    dataAreaLayout: {
        flex: 0.9,
    },
    fileName: {
        fontSize: width / 15,
        color: 'black',
    },
    fileMoreInfo: {
        fontSize: width / 30,
        color: 'white',
    },
    dataDetailsBlock: {
        width: width,
        backgroundColor: 'black',
        marginTop: 5,
    },
    dataBlockLayout:{
        flex: 1,
        flexDirection: 'column',
        width: width,
        backgroundColor: 'white',
        opacity: 0.8,
        marginTop: 20,
        borderRadius: 10,
    },
    mainLayout: {
        flex: 0.9,
        flexDirection: 'column',
    },
    mainContainer: {
        position: 'absolute',
        width: width,
        height: '100%',
        backgroundColor: 'black',
        opacity: 1,
    }
});