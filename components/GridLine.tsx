import React from 'react';
import { View, StyleSheet } from 'react-native';
import Images from '../Asset/asset';
import Svg, {
    // Circle,
    // Ellipse,
    // G,
    // Text,
    // TSpan,
    // TextPath,
    // Path,
    // Polygon,
    // Polyline,
    Line,
    Rect,
    // Use,
    Image,
    // Symbol,
    // Defs,
    // LinearGradient,
    // RadialGradient,
    // Stop,
    // ClipPath,
    // Pattern,
    // Mask,
  } from 'react-native-svg';

//  const { width, height } = Dimensions.get('window');

const GridLine = (props: any) => {

    const {x1, x2, y1, y2, divNumX, horizontal, vertical, imageTag} = props;
    
    const X1 = x1;
    const X2 = x2;
    const Y1 = y1;
    const Y2 = y2;

    const DIV_NUM_X = divNumX;

    const WIDTH = X2 - X1;
    const HEIGHT = Y2 - Y1;
    const DIV_X = WIDTH / DIV_NUM_X;
    const DIV_Y = DIV_X;            // DIV_X = DIV_Y

    const items = [];

    for( let i = 0; i <= DIV_NUM_X; i ++){
        items.push(
            <Line key={"0"+String(i)} x1={X1+i*DIV_X} y1={Y1} x2={X1+i*DIV_X} y2={Math.floor(HEIGHT / DIV_X)*DIV_X} stroke="black" strokeWidth="1" />
        )
    }
    for( let i = 0; i <= Math.floor(HEIGHT / DIV_X); i ++){
        items.push(
            <Line key={"1"+String(i)} x1={X1} y1={Y1+i*DIV_Y} x2={X2} y2={Y1+i*DIV_Y} stroke="black" strokeWidth="1" />
        )
    }
    
    items.push(
        <Image key={"img"}
        x={X1+horizontal*DIV_X}
        y={Y1+vertical*DIV_Y}
        width = {DIV_X}
        height= {DIV_Y}
        href={Images[imageTag]}
        />
    )

    items.push(
        <Rect key={"rect"} x={X1+horizontal*DIV_X} y={Y1+vertical*DIV_Y} width={DIV_X} height={DIV_Y} stroke="yellow" strokeWidth="2" />
    )

    return (
        <View style={styles.overlayMatrix}>
            <Svg height="100%" width="100%" >
                {items}
            </Svg>
        </View>
        );
}

const styles = StyleSheet.create({
    overlayMatrix: {
        position: 'absolute',
        top: '15%',
        left: 0,
        height: '70%',
        width: '100%',
      }
})

export default GridLine;