import React, {useState, memo, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { storage } from '../Storage';
import ITextInput from './ITextInput';

const { width } = Dimensions.get('window');

const StorageControl = memo((props: any) => {
    const {closeHandler, option, createData, editData } = props;

    const [ keyListIsLoaded , setKeyListIsLoaded ] = useState(false);
    const [ keyList, setKeyList ] = useState([]);

    let title = "";         // トップに表示するタイトルを格納する
    let tmpData:any = [];   // 時期にいらなくなる

    // 新規ファイル名を受け取り、データの作成をする
    const setFileNameHandler = (name: string) => {
        console.log("setFileNameHandler (StorageControl.tsx)");
        // <StorageControl> の状態を返す
        createData({newFileName: name, option: 'new'});
        //ITextInput をクローズ
        closeHandler();
    }

    const loadKeyList = useCallback(async() => {
        try{
            //setKeyListIsLoaded(false);
            const res = await storage.load({key: 'keyList'});
            setKeyList(res.keyList);
        }catch(e){
            console.log(e);
        }finally{
            //setKeyListIsLoaded(true);
        }
    },[])

    // タイトルメッセージの代入
    if(option == "new"){
        title = "ファイル名を入力"
    }else if(option == "edit"){
        title = "編集するファイルを選択"
    }else if(option == "gallery"){
        title = "閲覧したいファイルを選択"
    }

    if(option === "new"){
        return(
            <ITextInput closeHandler={(name: string) => setFileNameHandler(name)}/>
        )
    }else{
        loadKeyList();
        keyList.map((value: any, index: number) => {
            tmpData.push(
                <TouchableOpacity key={index} onPress={() => {editData({fileName: keyList[index], option: "edit"})}}>
                    <DataBlock fileName={keyList[index]} fileSize={'1129710 kbyte'} modDate={'2022/2/22'} />
                </TouchableOpacity>
            )
            tmpData = [...tmpData].reverse();
        })
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
                        {tmpData}
                    </ScrollView>
                </View>
            </View>
        )
    }
})

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