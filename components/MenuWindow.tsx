import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedbackBase, Touchable } from  'react-native';

import StorageControl from './StorageControl';

const { width, height} = Dimensions.get('window');


const MenuWindow = () => {
    const [ storageControlIsOpen, setStorageControlIsOpen ] = useState(false);
    const [ menuModeIs, setMenuModeIs ] = useState("new");

    const strageControlHandler = () => {
        setMenuModeIs("new");
        setStorageControlIsOpen(true);
    }
    const strageControlCloseHandler = () => {
        setStorageControlIsOpen(false);
    }

    return(
        <View style={styles.mainLayout}>
            <View style={styles.titleLayout}>
                <Text style={styles.titleName}>釣りマップメーカー(仮)</Text>
            </View>
            <View style={styles.selectButtonLayout}>
                <TouchableOpacity onPress={() => strageControlHandler}><View style={styles.selectButton}><Text style={styles.selectButtonText}> N E W </Text></View></TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log("edit")}}><View style={styles.selectButton}><Text style={styles.selectButtonText}> E D I T </Text></View></TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log("gallery")}}><View style={styles.selectButton}><Text style={styles.selectButtonText}> G A L L E R Y </Text></View></TouchableOpacity>
            </View>
                <View style={styles.footerLayout}>
            </View>

            {storageControlIsOpen && (
                <StorageControl />
            )}
        </View>
    )
}

export default MenuWindow;

const styles = StyleSheet.create({
    mainLayout:{
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        height: height,
        width: width,
        backgroundColor: 'white',
    },
    titleLayout:{
        flex: 1,
        height: '10%',
        width: width,
        backgroundColor: "#0000EE",
        opacity: 1,
        justifyContent: 'center',
    },
    titleName:{
        textAlign: 'center',
        color: '#EEEEEE',
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
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
        backgroundColor: '#000044',
        opacity: 1,
        justifyContent: 'center',
    }
})