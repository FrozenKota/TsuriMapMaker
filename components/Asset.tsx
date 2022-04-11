import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

const AssetWindow = ({closeAssetHandler}: any) => {
    let data = [];
    const num = 20;

    for(let i = 0; i < num; i++){
        data.push(
            <Text> Touch Me!!! </Text>
        );

        data.push(
            <TouchableOpacity style={{width: i*i, height:i*i}} onPress={closeAssetHandler}>
                <Image
                style={{width: i*i, height:i*i}}
                resizeMode='contain'
                source={require('../Asset/dog.png')}
                />
            </TouchableOpacity>

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
        opacity: 0.6,
        backgroundColor: 'black',  
    }
})

export default AssetWindow;