/****************************************************
 * Description:
 * - Save data control window component
 * 
 * Function:
 * - Diplay the save data window        : <StorageControl />
 * - List the save datas from strage    : 
 * - Load the Object data.              :
 * - Save the Object data.              :
 * - Delete the Object data.            :
 * 
 * 
 * Input
*****************************************************/

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Touchable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const StorageControl = (props: any) => {
    // Load save data

    // Write save data

    // Make components (Data Blocks) to display

    return(
    <View style={styles.mainContainer}>
        <View style={{justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white'}}>
            <Text style={styles.h1}>Select Save Data</Text>
        </View>

        <ScrollView>
            <TouchableOpacity>
                <DataBlock fileName={"セーブデータ１"} fileSize={'114514 kbyte'} modDate={'2022/04/1'} />
            </TouchableOpacity>
        </ScrollView>
    </View>
    )
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


const styles = StyleSheet.create({
    h1: {
        fontSize: width / 10,
        color: 'green',
        fontWeight: 'bold',
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
        flex: 1,
        flexDirection: 'column',
    },
    mainContainer: {
        position: 'absolute',
        width: width,
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.8,
    }
});