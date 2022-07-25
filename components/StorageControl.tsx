import React, {useState, memo, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Touchable, TouchableHighlight} from 'react-native';
import { storage } from '../Storage';
import ITextInput from './ITextInput';
import ConfirmModal from './ConfirmModal'

const { width, height } = Dimensions.get('window');

const StorageControl = memo((props: any) => {
    const {closeHandler, option, createData, editData, deleteData } = props;

    const [ keyList, setKeyList ] = useState({keyList:{}});
    const [ confirmModalIsOpen, setConfirmModalIsOpen ] = useState(false);
    const [ deleteFileName, setDeleteFileName ] = useState("");

    let title = "";         // トップに表示するタイトルを格納する
    let tmpData:any = [];  

    // react-native-storage を async/await記述で同期処理にする
    const asyncCreateData = async(props: {'key': string, 'data': object}) => {
        try{
            await storage.save({key: props.key, data: props.data})
        }catch(e){
            console.log(e);
        }
    }

    const closeConfirmHandler = () => {
        setConfirmModalIsOpen(false);
    }

    // 新規ファイル名を受け取り、データの作成をする
    const setFileNameHandler = (name: string) => {
        console.log("setFileNameHandler (StorageControl.tsx)");
        // <StorageControl> の状態を返す
        createData({newFileName: name, option: 'new'});
        //ITextInput をクローズ
        closeHandler();
    }

    const deleteDataHandler = useCallback((e: any) => {
        console.log("deleteDataHandler(), (StorageControl.tsx)");
        console.log("file name is "+ e);

        setDeleteFileName(e);
        
        setConfirmModalIsOpen(true);
    },[])

    const loadKeyList = useCallback(async() => {
        console.log("loadKeyList() ... (StorageControl.tsx)");
        try{
            const res = await storage.load({key: 'keyList'});
            console.log("loadedKey is ....");
            console.log(res);
            setKeyList(res);
        }catch(e){
            console.log(e);
        }
    },[])

    const deleteKey = () => {
        console.log("deleteKey() (StorageControl.tsx)");
        console.log("deleteFileName(state) is " + deleteFileName);

        const tmpKeyList: any = keyList;
    
        console.log("tmpKeyList is ");
        console.log(keyList);

        delete tmpKeyList.keyList[deleteFileName];

        asyncCreateData({key: 'keyList', data: tmpKeyList});
    }
    
    // DataBlock will display file information
    const DataBlock = (props: any) => {
        const {fileName, fileSize, modDate} = props;

        return (
            <View style={styles.dataBlockContainer}>
                <View style={styles.fileNameLayout} >
                    <Text style={styles.fileNameText}>  {fileName}</Text>
                    <TouchableOpacity style={styles.deleteDataButton} onPress={() => deleteDataHandler(fileName)}>
                        <Text style={styles.deleteButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dataDetailsBlock}>
                    <Text style={styles.fileMoreInfo}> file size:  {fileSize} / modified date:  {modDate}</Text>
                </View>
            </View>
        )
    }

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

        let keys = Object.keys(keyList.keyList);
        keys = [...keys].reverse();
        //let keys = Object.keys({neko:10, inu:12, tako:33});

        keys.map((value: any, index: number) => {
            tmpData.push(
                <TouchableOpacity key={index} onPress={() => {editData({fileName: keys[index], option: "edit"})}}>
                    <DataBlock fileName={keys[index]} fileSize={114514} modDate={'2022/2/22'} />
                </TouchableOpacity>
            )
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

                {confirmModalIsOpen && (
                    <ConfirmModal 
                        fileName = {deleteFileName}
                        okHandler = {
                            () => {
                                deleteData(deleteFileName);
                                deleteKey();
                            }
                        }
                        closeHandler = {closeConfirmHandler}
                    />
                )}
            </View>
        )
    }
})

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
    fileNameText: {
        width: '90%',
        backgroundColor: 'white',
        fontSize: width / 15,
        color: 'black',
    },
    fileNameLayout: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white', 
    },
    deleteButtonText: {
        fontSize: height / 25,
        color: 'white',
    },
    deleteDataButton: {
        backgroundColor: 'darkred',
        width: '10%',
        alignItems: 'center',
    },
    fileMoreInfo: {
        fontSize: width / 30,
        color: 'white',
    },
    dataDetailsBlock: {
        flex: 0.2,
        flexDirection: 'row',
        width: width,
        backgroundColor: 'black',
        marginTop: 5,
    },
    dataBlockContainer:{
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