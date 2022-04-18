/****************************************************
  Description:
   This component displays images based on object data which contains image meta datas.
    
  Input:
    - Bias position of origin from top-left : x1, y1
    - Opacity : opacity
    - Image data as Object : imgObj 
    |-  Asset name : assetName
    |-  Image ID : imgID
    |-  Divide number : divX, div_Y
    |-  Image position : imgPosX, imgPosY
  
  Output:
    <>
      <View style={{
        top: y1 + imgPosY * divY,
        left:  imgPosX * divX,
        
      }}>
        <Image />
      </View>
    </>
  
*****************************************************/

import React from 'react';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import Images from '../Asset/asset';

const { width, height } = Dimensions.get('window');


const ImgDataView = (props: any) => {
    const OFFSET_TOP = props.x1;
    const OFFSET_LEFT = props.x2;

    const DIV_NUM_X = props.divNumX;
    const DIV_NUM_Y = props.divNumY;

    let items = [];
    
    
    items.push(
        <Image
        x={X1+props.horizontal*DIV_X}
        y={Y1+props.vertical*DIV_Y}
        width = {DIV_X}
        height= {DIV_Y}
        href={Images[props.imageTag]}
        />
    )

    items.push(
    )

    return (
        <View style={styles.overlayMatrix}>

        </View>
        );
}

const styles = StyleSheet.create({
    overlayMatrix: {
        position: 'absolute',
        top: 98,
        left: 0,
        height: 492,
        width: width,
        opacity: 1.0,
      }
})

export default Matrix;