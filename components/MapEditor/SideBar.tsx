import React, {useState, memo} from 'react';
import {Dimensions, StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';

const { width, height } = Dimensions.get('window');

const SideBar = memo(() => {
    return (
      <View style={styles.sideBarContainer}>
        <TouchableOpacity style={styles.closeButtonArea}>
        </TouchableOpacity>
        <ScrollView>
        </ScrollView>
      </View>
    )
})

export default SideBar;

const styles = StyleSheet.create({
    sideBarContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        height: '85%',
        width: '60%',
        top: '15%',
        backgroundColor: 'black',
        opacity: 0.8
    },
    closeButtonArea: {
        flex: 0.2
    },
    contentArea: {
        flex: 0.8
    }
})