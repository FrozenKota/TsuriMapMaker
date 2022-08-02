import React, {useState, memo} from 'react';
import {Dimensions, StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';

const { width, height } = Dimensions.get('window');

const SideBar = memo(() => {
    return (
        <View style={styles.sideBarContainer}>
            <TouchableOpacity style={styles.closeButtonArea}>
                <Text >Save&Close</Text>
            </TouchableOpacity>

            <View style={styles.contentAreaLayout}>

            </View>
        </View>
    )
})

export default SideBar;

const styles = StyleSheet.create({
    sideBarContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column',
        height: '85%',
        width: '60%',
        top: '15%',
        backgroundColor: 'black',
        opacity: 0.8
    },
    closeButtonArea: {
        flex: 0.2,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    contentAreaLayout: {
        flex: 0.8,
        width: '95%',
        backgroundcolor: 'green',
    }
})