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
import {View, Dimensions, StatusBar, StyleSheet, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = (StatusBar.currentHeight? StatusBar.currentHeight : 0);
const HEIGHT = height - STATUSBAR_HEIGHT;

const ImgDataView = (props: any) => {
  const {imgObj} = props;
  const items: any = [];

  console.log("ImgDataView.tsx");
  //console.log(imgObj);

  const divX = width / imgObj.divNumX;
  const divY = divX;
  const keys = Object.keys(imgObj.imgData);

  keys.map((value: any, index: number)=>{
    items.push(
      <View key={"view"+index} style={{
        position: 'absolute',
        top: imgObj.imgData[keys[index]].PosY * divX,
        left: imgObj.imgData[keys[index]].PosX * divY,
        width: width / imgObj.divNumX, 
        height: (HEIGHT*0.7) / imgObj.divNumX,
        opacity: 1.0,
      }}>
      <Image key={"img"+index}
        style={{
          resizeMode: 'stretch',
          width: divX,
          height: divY,
        }}
        source={imgObj.imgData[keys[index]].source}
      />
      </View>
    )
  })

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
      height: HEIGHT*0.7,
      width: '100%',
  },
})

export default ImgDataView;