import React, { useState } from 'react';
import Images from '../Asset/asset';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const AssetWindow = (props :any) => {
    let data = [];
    const num = 123;

    const {closeAssetHandler, rowNum} = props;

    for(let i = 0; i < num; i+=rowNum){
        data.push(
            <View style={{flex:1, flexDirection: 'row'}}>
                <TouchableOpacity  style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(i)}>
                    <Image
                    style={{width: width/rowNum, height: width/rowNum}}
                    resizeMode='contain'
                    source={Images[i]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(i+1)}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[i+1]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(i+2)}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[i+2]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(i+3)}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[i+3]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(i+4)}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[i+4]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(i+5)}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[i+5]}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View style={styles.assetView}>
            <ScrollView>
                {data}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    assetView: {
        position: 'absolute',
        bottom: 98,
        height: 400,
        width: width,
        opacity: 1,
        backgroundColor: 'black',  
    }
})

export default AssetWindow;