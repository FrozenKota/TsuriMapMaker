import React, { useState } from 'react';
import Images from '../Asset/asset';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const AssetWindow = ({closeAssetHandler}: any) => {
    let data = [];
    const num = 123;
    const ROW_IMAGE_NUM= 6;

    for(let i = 0; i <= num; i+=ROW_IMAGE_NUM){
        data.push(
            <View style={{flex:1, flexDirection: 'row'}}>
                <TouchableOpacity style={{width: width/ROW_IMAGE_NUM, height: width/ROW_IMAGE_NUM}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/ROW_IMAGE_NUM, height: width/ROW_IMAGE_NUM}}
                    resizeMode='contain'
                    source={Images[i]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/ROW_IMAGE_NUM, height: width/ROW_IMAGE_NUM}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/ROW_IMAGE_NUM, height:width/ROW_IMAGE_NUM}}
                    resizeMode='contain'
                    source={Images[i+1]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/ROW_IMAGE_NUM, height: width/ROW_IMAGE_NUM}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/ROW_IMAGE_NUM, height:width/ROW_IMAGE_NUM}}
                    resizeMode='contain'
                    source={Images[i+3]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/ROW_IMAGE_NUM, height: width/ROW_IMAGE_NUM}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/ROW_IMAGE_NUM, height:width/ROW_IMAGE_NUM}}
                    resizeMode='contain'
                    source={Images[i+4]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/ROW_IMAGE_NUM, height: width/ROW_IMAGE_NUM}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/ROW_IMAGE_NUM, height:width/ROW_IMAGE_NUM}}
                    resizeMode='contain'
                    source={Images[i+5]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/ROW_IMAGE_NUM, height: width/ROW_IMAGE_NUM}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/ROW_IMAGE_NUM, height:width/ROW_IMAGE_NUM}}
                    resizeMode='contain'
                    source={Images[i+6]}
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