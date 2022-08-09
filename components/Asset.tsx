import React from 'react';
import Images from '../Asset/asset';
import { Dimensions, StatusBar, StyleSheet, View, TouchableOpacity, ScrollView, Image} from 'react-native';

const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = (StatusBar.currentHeight? StatusBar.currentHeight : 0);
const HEIGHT = height - STATUSBAR_HEIGHT;


const AssetWindow = (props :any) => {
    const data:any = [];

    const {closeAssetHandler, rowNum} = props;
    const IMG_KEYS: any = Object.keys(Images);

    for(let i = 0; i < IMG_KEYS.length; i+=6){
        data.push(
            <View key={i*7+0} style={{flex:1, flexDirection: 'row'}}>
                <TouchableOpacity  key={i*7+1} style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(IMG_KEYS[i])}>
                    <Image
                    style={{width: width/rowNum, height: width/rowNum}}
                    resizeMode='contain'
                    source={Images[IMG_KEYS[i] ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity key={i*7+2} style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(IMG_KEYS[i+1])}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[IMG_KEYS[i+1] ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity key={i*7+3} style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(IMG_KEYS[i+2])}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[IMG_KEYS[i+2] ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity key={i*7+4} style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(IMG_KEYS[i+3])}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[IMG_KEYS[i+3] ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity key={i*7+5} style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(IMG_KEYS[i+4])}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[IMG_KEYS[i+4] ]}
                    />
                </TouchableOpacity>
                <TouchableOpacity key={i*7+6} style={{width: width/rowNum, height: width/rowNum}} onPress={() => closeAssetHandler(IMG_KEYS[i+5])}>
                    <Image
                    style={{width: width/rowNum, height:width/rowNum}}
                    resizeMode='contain'
                    source={Images[IMG_KEYS[i+5] ]}
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
        top: height*0.15,
        height: height*0.7,
        width: width,
        opacity: 0.9,
        backgroundColor: 'black',  
    }
})

export default AssetWindow;