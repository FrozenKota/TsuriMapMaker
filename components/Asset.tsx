import React, { useState } from 'react';
import Images from '../Asset/asset';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const AssetWindow = ({closeAssetHandler}: any) => {
    let data = [];
    const num = 123;
    const IMAGE_SIZE = 4;

    for(let i = 0; i <= num; i+=4){
        data.push(
            <View style={{flex:1, flexDirection: 'row'}}>
                <TouchableOpacity style={{width: width/IMAGE_SIZE, height: width/IMAGE_SIZE}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/IMAGE_SIZE, height: width/IMAGE_SIZE}}
                    resizeMode='contain'
                    source={Images[i]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/IMAGE_SIZE, height: width/IMAGE_SIZE}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/IMAGE_SIZE, height:width/IMAGE_SIZE}}
                    resizeMode='contain'
                    source={Images[i+1]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/IMAGE_SIZE, height: width/IMAGE_SIZE}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/IMAGE_SIZE, height:width/IMAGE_SIZE}}
                    resizeMode='contain'
                    source={Images[i+3]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: width/IMAGE_SIZE, height: width/IMAGE_SIZE}} onPress={closeAssetHandler}>
                    <Image
                    style={{width: width/IMAGE_SIZE, height:width/IMAGE_SIZE}}
                    resizeMode='contain'
                    source={Images[i+4]}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View style={styles.assetView}>
            <ScrollView style={{}}>
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