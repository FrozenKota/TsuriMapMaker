/****************************************************
  Description:
   This component displays images based on object data which contains image meta datas.
    
  Input:
    - Bias position of origin from top-left : biasX, biaxY
    - Opacity : opacity
    - Image data as Object : imgObj 
    |-  Asset name : assetName
    |-  Image ID : imgID
    |-  Divide number : divNumX, divNumY
    |-  Image position : imgPosX, imgPosY
*****************************************************/

import React from 'react';
import {View, Dimensions, StyleSheet, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const ImgDataView = (props: any) => {

    const {imgObj} = props;

    let divX = width  / imgObj.divNumX;
    const keys = Object.keys(imgObj.imgData);

    const items = keys.map((value: any, index: number)=>
      <View style={{
        position: 'absolute',
        top: imgObj.imgData[keys[index]].PosY * divX,
        left: imgObj.imgData[keys[index]].PosX * divX,
        width: width / imgObj.divNumX, 
        height: (height*0.7) / imgObj.divNumY,
        opacity: 1.0,
      }}>
        <Image 
          style={{
            resizeMode: 'stretch',
            width: width / imgObj.divNumX,
            height: width / imgObj.divNumX,
          }}
          source={imgObj.imgData[keys[index]].source}
        />
      </View>
    );

    return (
      <View style={styles.iOverlay}>
        {items}
      </View>
    );
}

const styles = StyleSheet.create({
  iOverlay: {
      position: 'absolute',
      top: '15%',
      left: 0,
      height: '70%',
      width: width,
    }
})

export default ImgDataView;